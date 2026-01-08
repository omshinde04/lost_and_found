import { notFound } from "next/navigation";

async function getLostItem(lfId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/lost-items/${lfId}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function VerifyPage({ params }) {
  const item = await getLostItem(params.lfId);
  if (!item) return notFound();

  return (
    <section className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">

        <h1 className="text-2xl font-bold text-sky-400">
          Lost Item Verification
        </h1>

        {/* SAFE INFO */}
        <p><b>Item:</b> {item.itemName}</p>
        <p><b>Type:</b> {item.itemType}</p>
        <p><b>Location:</b> {item.location}</p>
        <p><b>Date:</b> {item.date}</p>

        {/* CONFIRM BUTTON */}
        <button
          className="w-full mt-4 py-3 bg-sky-500 text-black rounded-xl font-semibold"
        >
          I am the Finder – Show Contact
        </button>

        {/* (Later you reveal contact on click) */}
      </div>
    </section>
  );
}
