"use client";

export default function Input({
  name,
  type = "text",
  placeholder,
  required = false,
  icon = null,
}) {
  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </span>
      )}

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        step={type === "time" ? "60" : undefined}   // ✅ IMPORTANT
        className={`
          w-full
          px-4 py-3
          ${icon ? "pl-11" : ""}
          bg-black/50
          rounded-xl
          border border-white/10
          outline-none
          text-sm text-white
          focus:border-sky-500/60
          cursor-text
        `}
      />
    </div>
  );
}
