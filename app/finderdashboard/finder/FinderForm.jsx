"use client";

import { useState } from "react";
import Input from "./components/Input";
import Select from "./components/Select";
import Textarea from "./components/Textarea";
import { FaUser, FaEnvelope, FaPlusCircle } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";

export default function FinderForm({ refreshItems }) {
  const [loading, setLoading] = useState(false);
  const [matchedLfId, setMatchedLfId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.image.files.length) {
      alert("Item image is required");
      return;
    }

    setLoading(true);

    /* =========================
       🔁 Convert Image → Base64
    ========================= */

    const file = form.image.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;

      const payload = {
        finderName: form.finderName.value,
        finderEmail: form.finderEmail.value,
        contact: form.contact.value,

        itemName: form.itemName.value,
        itemType: form.itemType.value,
        location: form.location.value,
        date: form.date.value,
        time: form.time.value,
        description: form.description.value,

        imageUrl: base64Image, // ✅ REAL IMAGE (IMPORTANT)
      };

      try {
        const res = await fetch("/api/found-items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Failed to submit");
          return;
        }

        // ✅ MATCH HANDLING
        if (data.showQR === true && data.lfId) {
          setMatchedLfId(data.lfId);
        } else {
          setMatchedLfId(null);
          alert("No strong match found yet.");
        }

        form.reset();
        refreshItems(); // ✅ REFRESH DASHBOARD LIST

      } catch (err) {
        alert("Server error");
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="xl:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4"
      >
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaPlusCircle className="text-sky-400" />
          Report Found Item
        </h2>

        {/* FINDER INFO */}
        <Input name="finderName" placeholder="Your Full Name" icon={<FaUser />} required />
        <Input name="finderEmail" placeholder="Your Email Address" type="email" icon={<FaEnvelope />} required />
        <Input name="contact" placeholder="Contact Number" required />

        {/* ITEM INFO */}
        <Input name="itemName" placeholder="Item Name" required />
        <Select
          name="itemType"
          options={["Electronics", "Documents", "Accessories", "Others"]}
          required
        />
        <Input name="location" placeholder="Found Location" required />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input name="date" type="date" required />
          <Input name="time" type="time" required />
        </div>

        <Textarea name="description" placeholder="Describe the found item clearly" required />

        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="file:bg-sky-500 file:text-black file:px-4 file:py-2 file:rounded-xl text-sm"
        />

        <button
          disabled={loading}
          className="w-full py-3 bg-sky-500 text-black rounded-xl font-semibold disabled:opacity-60"
        >
          {loading ? "Checking..." : "Submit Found Report"}
        </button>
      </form>
   {/* ✅ QR CODE (ONLY WHEN MATCH IS VERIFIED) */}
      {matchedLfId && (
        <div className="xl:col-span-3 flex justify-center items-start">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center space-y-4">
            <h3 className="text-green-400 font-semibold text-lg">
              Match Found 🎉
            </h3>
<QRCodeCanvas
  value={`/verify/${matchedLfId}`}
  size={160}
  bgColor="#0f172a"
  fgColor="#38bdf8"
/>




            <p className="text-sm text-gray-400">
              Scan this QR code to securely verify and view the lost item owner details
            </p>
          </div>
        </div>
      )}
    </>
  );
}
