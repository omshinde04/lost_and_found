import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import LostItem from "@/models/LostItem";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      userName,
      userEmail,
      itemName,
      itemType,
      description,
      date,
      time,
      location,
      contact,
      reward,
      imageUrl,
    } = body;

    if (!itemName || !itemType || !location) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const lostItem = await LostItem.create({
      lfId: "LF-" + Date.now(),
      userName,
      userEmail,
      itemName,
      itemType,
      description,
      date,
      time,
      location,
      contact,
      reward,
      imageUrl,
      status: "Pending",
    });

    return NextResponse.json(
      { message: "Lost item created", lostItem },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lost Item Error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectDB();
    const items = await LostItem.find().sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch items" },
      { status: 500 }
    );
  }
}


