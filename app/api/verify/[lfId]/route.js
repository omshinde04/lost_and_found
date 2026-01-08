import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import LostItem from "@/models/LostItem";

export async function GET(req) {
  try {
    // ✅ Parse lfId safely from URL
    const url = new URL(req.url);
    const pathname = url.pathname;
    const rawLfId = decodeURIComponent(pathname.split("/").pop());

    if (!rawLfId) {
      return NextResponse.json(
        { message: "Lost item ID required" },
        { status: 400 }
      );
    }

    const lfId = rawLfId.trim();

    await connectDB();

    // ✅ FINAL FIX: Case + whitespace safe match
    const lostItem = await LostItem.findOne({
      lfId: { $regex: new RegExp(`^${lfId}$`, "i") }
    });

    if (!lostItem) {
      return NextResponse.json(
        { message: "Lost item not found" },
        { status: 404 }
      );
    }

    // ✅ Success response
    return NextResponse.json(
      {
        lfId: lostItem.lfId,
        itemName: lostItem.itemName,
        itemType: lostItem.itemType,
        description: lostItem.description,
        location: lostItem.location,
        date: lostItem.date,
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
