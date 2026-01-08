"use client";

export default function Textarea({
  name,
  placeholder,
  required = false,
  rows = 4,
}) {
  return (
    <textarea
      name={name}
      rows={rows}
      required={required}
      placeholder={placeholder}
      className="
        w-full
        px-4 py-3
        bg-black/50
        rounded-xl
        border border-white/10
        outline-none
        text-sm
        text-white
        placeholder:text-gray-500
        resize-none
        focus:border-sky-500/60
        transition
      "
    />
  );
}
