import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import LostItem from "@/models/LostItem";

/* =========================
   GET LOST ITEM BY lfId
========================= */
export async function GET(req) {
  try {
    // ✅ SAFELY EXTRACT lfId FROM URL (Vercel-safe)
    const url = new URL(req.url);
    const lfId = url.pathname.split("/").pop();

    if (!lfId) {
      return NextResponse.json(
        { message: "Lost item ID required" },
        { status: 400 }
      );
    }

    await connectDB();

    // ✅ trim() avoids hidden space issues
    const lostItem = await LostItem.findOne({ lfId: lfId.trim() });

    if (!lostItem) {
      return NextResponse.json(
        { message: "Lost item not found" },
        { status: 404 }
      );
    }

    // ✅ RETURN FULL DETAILS
    return NextResponse.json(
      {
        lfId: lostItem.lfId,
        itemName: lostItem.itemName,
        itemType: lostItem.itemType,
        description: lostItem.description,
        location: lostItem.location,
        date: lostItem.date,

        // 🔐 OWNER CONTACT
        userName: lostItem.userName,
        userEmail: lostItem.userEmail,
        contact: lostItem.contact,

        imageUrl: lostItem.imageUrl,
        status: lostItem.status,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify API Error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
