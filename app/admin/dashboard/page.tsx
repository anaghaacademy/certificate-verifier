"use client";

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export default function DashboardPage() {
  const [certificateId, setCertificateId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [grade, setGrade] = useState("Excellent");
  const [status, setStatus] = useState("Verified");
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoUrl = "";

      if (photo) {
        const photoRef = ref(storage, `students/${certificateId}-${photo.name}`);
        await uploadBytes(photoRef, photo);
        photoUrl = await getDownloadURL(photoRef);
      }

      await setDoc(doc(db, "certificates", certificateId), {
        certificateId,
        studentName,
        fatherName,
        courseName,
        fromDate,
        toDate,
        grade,
        status,
        photoUrl,
        createdAt: new Date().toISOString(),
      });

      alert("Certificate saved successfully");
      setCertificateId("");
      setStudentName("");
      setFatherName("");
      setCourseName("");
      setFromDate("");
      setToDate("");
      setGrade("Excellent");
      setStatus("Verified");
      setPhoto(null);
    } catch (error: any) {
      alert(error.message || "Failed to save certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-center text-purple-700">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Add certificate details here.
        </p>

        <form onSubmit={handleSave} className="mt-8 space-y-4">
          <input
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Certificate ID"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            required
          />

          <input
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Student Name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            required
          />

          <input
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            placeholder="Father Name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            required
          />

          <input
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Course Name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            required
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              placeholder="From Date"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            />
            <input
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              placeholder="To Date"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            />
          </div>

          <input
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Grade"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            required
          />

          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Status"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-purple-700 px-4 py-3 font-semibold text-white hover:bg-purple-800 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Certificate"}
          </button>
        </form>
      </div>
    </main>
  );
}