"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [certificateId, setCertificateId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = certificateId.trim();
    if (!id) return;
    router.push(`/verify/${id}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-center text-purple-700">
          Certificate Verification
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Enter your Certificate ID to verify details.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Enter Certificate ID"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-600"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-purple-700 px-4 py-3 font-semibold text-white hover:bg-purple-800"
          >
            Verify Certificate
          </button>
        </form>
      </div>
    </main>
  );
}