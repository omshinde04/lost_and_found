"use client";

import { useEffect, useState } from "react";

export default function VerifyPage({ params }) {
  const { lfId } = params;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!lfId) {
      setError("Invalid verification link");
      setLoading(false);
      return;
    }

    fetch(`/api/verify/${lfId}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setError(data.message);
        } else {
          setItem(data);
        }
      })
      .catch(() => setError("Failed to load verification"))
      .finally(() => setLoading(false));
  }, [lfId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading verification…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
        <h1 className="text-2xl font-bold text-sky-400">
          Lost Item Verification
        </h1>

        <p><b>Item:</b> {item.itemName}</p>
        <p><b>Type:</b> {item.itemType}</p>
        <p><b>Location:</b> {item.location}</p>
        <p><b>Date:</b> {item.date}</p>

        <div className="border-t border-white/10 pt-4 mt-4">
          <p className="text-green-400 font-semibold">Owner Contact</p>
          <p><b>Name:</b> {item.userName}</p>
          <p><b>Email:</b> {item.userEmail}</p>
          <p><b>Phone:</b> {item.contact}</p>
        </div>
      </div>
    </section>
  );
}
