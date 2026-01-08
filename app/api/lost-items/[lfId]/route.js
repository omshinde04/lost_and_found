import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import LostItem from "@/models/LostItem";

export async function GET(req, { params }) {
  try {
    const { lfId } = params;

    await connectDB();

    const item = await LostItem.findOne({ lfId });

    if (!item) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    // ⚠️ SAFE DATA ONLY (NO CONTACT YET)
    return NextResponse.json({
      lfId: item.lfId,
      itemName: item.itemName,
      itemType: item.itemType,
      location: item.location,
      date: item.date,
      status: item.status,
    });
  } catch (error) {
    console.error("Verify Error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
