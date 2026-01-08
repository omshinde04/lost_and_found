"use client";

import { useEffect, useState } from "react";
import FinderForm from "./FinderForm";
import FoundList from "./FoundList";

export default function FinderDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoundItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/found-items", {
        cache: "no-store",
      });
      const data = await res.json();

      // ✅ SAFETY: ensure array
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch found items", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoundItems();
  }, []);

  return (
    <section className="min-h-screen bg-linear-to-br from-[#020617] via-black to-[#020617] text-white pt-24 px-4 pb-28">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Finder Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Report found items and track your submissions
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <FinderForm refreshItems={fetchFoundItems} />
          <FoundList items={items} loading={loading} />
        </div>

      </div>
    </section>
  );
}
