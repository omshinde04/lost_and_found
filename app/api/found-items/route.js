import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import FoundItem from "@/models/FoundItem";
import LostItem from "@/models/LostItem";

/* =========================
   🔧 Utility Functions
========================= */

const normalize = (str = "") =>
  str
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const getKeywords = (text = "") =>
  normalize(text).split(" ").filter(w => w.length >= 4);

const isValidDate = d => !isNaN(new Date(d).getTime());

const dateDiffInDays = (d1, d2) =>
  Math.abs(
    (new Date(d1).getTime() - new Date(d2).getTime()) /
      (1000 * 60 * 60 * 24)
  );

/* =========================
   📌 POST: Report Found Item
========================= */

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const {
      finderEmail,
      itemName,
      itemType,
      location,
      date,
      description,
    } = body;

    if (!finderEmail || !itemName || !itemType || !location) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const lostItems = await LostItem.find({
      itemType,
      status: "Pending",
    });

    let matchedLost = null;
    let bestScore = 0;

    for (const lost of lostItems) {
      let score = 0;

      if (normalize(lost.itemName) === normalize(itemName)) score += 40;

      const locMatch =
        normalize(lost.location).includes(normalize(location)) ||
        normalize(location).includes(normalize(lost.location));
      if (locMatch) score += 25;

      if (
        isValidDate(lost.date) &&
        isValidDate(date) &&
        dateDiffInDays(lost.date, date) <= 2
      ) score += 20;

      const common = getKeywords(lost.description).filter(w =>
        getKeywords(description).some(fw => fw.includes(w) || w.includes(fw))
      );
      score += Math.min(common.length * 5, 15);

      if (score >= 60 && score > bestScore) {
        bestScore = score;
        matchedLost = lost;
      }
    }

    const foundItem = await FoundItem.create({
      ...body,
      fdId: "FD-" + Date.now(),
      status: matchedLost ? "Matched" : "Pending",
      matchedLfId: matchedLost?.lfId || null,
      reportedAt: new Date(),
    });

    if (matchedLost) {
      matchedLost.status = "Matched";
      await matchedLost.save();

      return NextResponse.json(
        {
          message: "Strong match found",
          showQR: true,
          lfId: matchedLost.lfId,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "No strong match yet", showQR: false },
      { status: 201 }
    );

  } catch (error) {
    console.error("Found Item Error:", error);
    return NextResponse.json(
      { message: "Failed to process found item" },
      { status: 500 }
    );
  }
}

/* =========================
   📌 GET: Fetch Found Items (USER ONLY)
========================= */

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email required" },
        { status: 400 }
      );
    }

    const items = await FoundItem.find({ finderEmail: email })
      .sort({ createdAt: -1 });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch found items" },
      { status: 500 }
    );
  }
}
