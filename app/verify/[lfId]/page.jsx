import { notFound } from "next/navigation";

async function getLostItem(lfId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/verify/${lfId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function VerifyPage({ params }) {
  const { lfId } = params;

  if (!lfId) return notFound();

  const item = await getLostItem(lfId);
  if (!item) return notFound();

  return (
    <section className="min-h-screen pt-28 px-6 bg-[#020617] text-white">
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
