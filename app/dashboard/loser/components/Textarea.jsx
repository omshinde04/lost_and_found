export default function Textarea(props) {
  return (
    <textarea
      {...props}
      rows={3}
      className="w-full px-4 py-3 bg-black/50 rounded-xl border border-white/10 text-sm resize-none"
    />
  );
}
