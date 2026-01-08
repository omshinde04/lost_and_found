export default function VerifyPage({ params }) {
  return (
    <div style={{ padding: 100, color: "white" }}>
      <h1>VERIFY PAGE WORKS</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
}
