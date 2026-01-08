"use client";

import LostItemCard from "./LostItemCard";
import EmptyState from "./EmptyState";

export default function LostItemsGrid({ items, loading }) {
  if (loading) {
    return (
      <div className="xl:col-span-3 text-gray-400">
        Loading lost items...
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="xl:col-span-3">
      <h2 className="text-lg font-semibold mb-5">
        My Lost Items
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <LostItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
