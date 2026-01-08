import {
  FaTag,
  FaHashtag,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

export default function LostItemCard({ item }) {
  return (
    <div className="bg-[#0f172a] border border-white/10 rounded-2xl hover:border-sky-500/40 transition">

      {/* IMAGE */}
      <div className="overflow-hidden rounded-t-2xl">
       <img
  src={item.imageUrl}
  alt={item.itemName}
  className="w-full h-36 sm:h-40 md:h-44 object-cover"
/>

      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-4">

        <div className="flex justify-between items-start gap-3">
          <h3 className="font-semibold text-sm sm:text-base">
            {item.itemName}
          </h3>

          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <FaHashtag />
            {item.lfId}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-sky-400">
          <FaTag />
          <span>{item.itemType}</span>
        </div>

        <p className="text-sm text-gray-300 line-clamp-2">
          {item.description}
        </p>

        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <FaPhone /> {item.contact}
          </div>

          <div className="flex items-center gap-3 break-all">
            <FaEnvelope /> {item.userEmail}
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt /> {item.location}
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt /> {item.date}
          </div>

          <div className="flex items-center gap-3">
            <FaClock /> {item.time}
          </div>
        </div>

        <span className="inline-block px-3 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
          {item.status}
        </span>
      </div>
    </div>
  );
}
