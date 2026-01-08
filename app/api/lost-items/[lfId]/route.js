import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import LostItem from "@/models/LostItem";

/* =========================
   📌 GET LOST ITEM BY lfId
   (Used for QR Verification)
========================= */

export async function GET(req, { params }) {
  try {
    const { lfId } = params;

    if (!lfId) {
      return NextResponse.json(
        { message: "Lost item ID required" },
        { status: 400 }
      );
    }

    await connectDB();

    const lostItem = await LostItem.findOne({ lfId });

    if (!lostItem) {
      return NextResponse.json(
        { message: "Lost item not found" },
        { status: 404 }
      );
    }

    /* 🔐 RETURN ONLY SAFE FIELDS */
    return NextResponse.json(
      {
        lfId: lostItem.lfId,
        itemName: lostItem.itemName,
        itemType: lostItem.itemType,
        description: lostItem.description,
        location: lostItem.location,
        date: lostItem.date,
        imageUrl: lostItem.imageUrl,
        status: lostItem.status,

        /* ⚠️ CONTACT IS NOT SENT YET */
        contactHidden: true,
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
