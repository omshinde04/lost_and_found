export default function VerifyLayout({ children }) {
  return (
    <html>
      <body style={{ background: "black", color: "white" }}>
        {children}
      </body>
    </html>
  );
}
