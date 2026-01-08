"use client";

export default function Select({ name, options, required = false }) {
  return (
    <select
      name={name}
      required={required}
      defaultValue=""
      className="
        w-full px-4 py-3
        bg-black/50
        rounded-xl
        border border-white/10
        outline-none
        text-sm
        text-gray-300
        focus:border-sky-500/60
      "
    >
      <option value="" disabled>
        Select item type
      </option>

      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
