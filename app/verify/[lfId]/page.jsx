"use client";

export default function VerifyPage({ params }) {
  return (
    <div style={{ color: "white", padding: 40 }}>
      <h1>VERIFY PAGE WORKING</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
}
