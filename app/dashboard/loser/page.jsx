"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import LostForm from "./components/LostForm";
import LostItemsGrid from "./components/LostItemsGrid";

export default function LoserDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLostItems = async () => {
    try {
      const res = await fetch("/api/lost-items");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch lost items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLostItems();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#020617] via-black to-[#020617] text-white px-4 sm:px-6 pt-24 pb-40">
      <div className="max-w-7xl mx-auto space-y-10">
        <Header />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-10">
          {/* FORM */}
          <LostForm refreshItems={fetchLostItems} />

          {/* LIST */}
          <LostItemsGrid items={items} loading={loading} />
        </div>
      </div>
    </section>
  );
}
