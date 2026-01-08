"use client";

import { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";
import { FaUser, FaEnvelope } from "react-icons/fa";

export default function LostForm({ refreshItems }) {
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;

  if (!form.image.files.length) {
    alert("Image is required");
    return;
  }

  setLoading(true);

  const file = form.image.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = async () => {
    const base64Image = reader.result;

    const payload = {
      userName: form.userName.value,
      userEmail: form.userEmail.value,
      itemName: form.itemName.value,
      itemType: form.itemType.value,
      description: form.description.value,
      date: form.date.value,
      time:
        form.time.value ||
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      location: form.location.value,
      contact: form.contact.value,
      reward: form.reward.value || "None",
      imageUrl: base64Image,
    };

    try {
      const res = await fetch("/api/lost-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed");
        return;
      }

      // ✅ SUCCESS ALERT (ADDED)
      alert("✅ Lost item reported successfully!");

      form.reset();
      refreshItems();
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };
};

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="xl:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4"
    >
      <h2 className="text-lg font-semibold">Report Lost Item</h2>

      {/* USER INFO */}
      <Input name="userName" placeholder="Your Full Name" icon={<FaUser />} required />
      <Input name="userEmail" placeholder="Your Email" icon={<FaEnvelope />} type="email" required />

      {/* ITEM INFO */}
      <Input name="itemName" placeholder="Item Name" required />
      <Select
        name="itemType"
        options={["Electronics", "Documents", "Accessories", "Others"]}
        required
      />

      <Input name="location" placeholder="Last Seen Location" required />
      <Input name="contact" placeholder="Contact Number" required />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input name="date" type="date" required />
        <Input name="time" type="time" />
      </div>

      <Input name="reward" placeholder="Reward (Optional)" />
      <Textarea name="description" placeholder="Item description" required />

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
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
