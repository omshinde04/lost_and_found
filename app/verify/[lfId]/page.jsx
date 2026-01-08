"use client";

import { useEffect, useState } from "react";

export default function VerifyPage({ params }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const lfId = params?.lfId;

  useEffect(() => {
    if (!lfId) {
      setError("Missing ID");
      return;
    }

    fetch(`/api/verify/${lfId}`)
      .then(res => res.json())
      .then(json => {
        if (json.message) {
          setError(json.message);
        } else {
          setData(json);
        }
      })
      .catch(() => setError("Fetch failed"));
  }, [lfId]);

  if (error) {
    return (
      <div style={{ color: "red", padding: 40 }}>
        ERROR: {error}
      </div>
    );
  }

  if (!data) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>VERIFY PAGE WORKS</h1>
      <p>ID: {data.lfId}</p>
      <p>Item: {data.itemName}</p>
      <p>Name: {data.userName}</p>
      <p>Phone: {data.contact}</p>
    </div>
  );
}
