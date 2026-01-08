import {
  FaClipboardList,
  FaClock,
  FaHashtag,
  FaTag,
} from "react-icons/fa";

export default function FoundList({ items = [], loading }) {
  // ✅ HARD SAFETY
  if (!Array.isArray(items)) items = [];

  return (
    <div className="xl:col-span-3">
      <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
        <FaClipboardList className="text-sky-400" />
        Found Items
      </h2>

      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
          <p className="text-gray-400">Loading found items...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
          <p className="text-gray-300">No found items reported</p>
          <p className="text-gray-400 text-sm mt-2">
            Your found items will appear here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* IMAGE */}
              <img
                src={
                  item.imageUrl && item.imageUrl !== "TEMP_IMAGE_URL"
                    ? item.imageUrl
                    : "/placeholder.png"
                }
                alt="Found Item"
                className="w-full h-36 sm:h-44 object-cover"
              />

              <div className="p-4 space-y-3">
                <div className="flex justify-between gap-2">
                  <h3 className="font-semibold">{item.itemName}</h3>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <FaHashtag /> {item.fdId}
                  </span>
                </div>

                <p className="text-sm text-sky-400 flex items-center gap-1">
                  <FaTag /> {item.itemType}
                </p>

                <p className="text-sm text-gray-300 line-clamp-2">
                  {item.description}
                </p>

                <div className="text-xs text-gray-400 space-y-1">
                  <p><b>Email:</b> {item.finderEmail}</p>
                  <p><b>Location:</b> {item.location}</p>
                  <p><b>Date:</b> {item.date} {item.time}</p>
                  <p className="flex items-center gap-1">
                    <FaClock /> {item.reportedAt}
                  </p>
                </div>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-medium ${
                    item.status === "Matched"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
