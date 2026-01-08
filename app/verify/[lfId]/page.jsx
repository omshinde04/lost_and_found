"use client";

import { useEffect, useState } from "react";

export default function VerifyPage({ params }) {
  const { lfId } = params;

  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lfId) {
      setError("Invalid verification link");
      setLoading(false);
      return;
    }

    const fetchItem = async () => {
      try {
        const url = `${window.location.origin}/api/verify/${lfId}`;
        console.log("VERIFY FETCH URL:", url);

        const res = await fetch(url);
        console.log("VERIFY STATUS:", res.status);

        if (!res.ok) {
          const text = await res.text();
          console.error("VERIFY ERROR BODY:", text);
          throw new Error("Verification failed");
        }

        const data = await res.json();
        setItem(data);
      } catch (err) {
        setError("Invalid verification link");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [lfId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading verification details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-sky-400">
          Lost Item Verification
        </h1>

        <p><b>Item:</b> {item.itemName}</p>
        <p><b>Type:</b> {item.itemType}</p>
        <p><b>Location:</b> {item.location}</p>
        <p><b>Date:</b> {item.date}</p>

        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="text-green-400 font-semibold">Owner Contact</p>
          <p><b>Name:</b> {item.userName}</p>
          <p><b>Email:</b> {item.userEmail}</p>
          <p><b>Phone:</b> {item.contact}</p>
        </div>
      </div>
    </section>
  );
}
