"use client";

export default function Input({
  icon,
  type = "text",
  ...props
}) {
  return (
    <div className="
      flex items-center gap-3
      px-4 py-3
      bg-black/50
      rounded-xl
      border border-white/10
      focus-within:border-sky-500/60
      transition
    ">
      {icon && (
        <span className="text-gray-400 text-sm">
          {icon}
        </span>
      )}

      <input
        type={type}
        {...props}
        className="
          bg-transparent
          outline-none
          w-full
          text-sm
          text-white
          placeholder:text-gray-500

          /* IMPORTANT FIXES */
          cursor-text
          [&::-webkit-calendar-picker-indicator]:invert
        "
      />
    </div>
  );
}
