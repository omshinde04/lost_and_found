import { notFound } from "next/navigation";

async function getLostItem(lfId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify/${lfId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function VerifyPage({ params }) {
  const { lfId } = params;

  if (!lfId) notFound();

  const item = await getLostItem(lfId);
  if (!item) notFound();

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-6">
      <div className="max-w-xl w-full bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
        <h1 className="text-2xl font-bold text-sky-400">
          Lost Item Verified
        </h1>

        <p><b>ID:</b> {item.lfId}</p>
        <p><b>Item:</b> {item.itemName}</p>
        <p><b>Type:</b> {item.itemType}</p>
        <p><b>Description:</b> {item.description}</p>
        <p><b>Location:</b> {item.location}</p>
        <p><b>Date:</b> {item.date}</p>

        <hr className="border-white/10 my-4" />

        <p className="text-green-400 font-semibold">Owner Contact</p>
        <p><b>Name:</b> {item.userName}</p>
        <p><b>Email:</b> {item.userEmail}</p>
        <p><b>Phone:</b> {item.contact}</p>
      </div>
    </section>
  );
}
