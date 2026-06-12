import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

async function getCertificate(id: string) {
  const trimmed = id?.trim();
  if (!trimmed) return null;

  const ref = doc(db, "certificates", trimmed);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data();
}

export default async function VerifyPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const cert = await getCertificate(id);

  if (!cert) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="rounded-2xl bg-white p-8 shadow max-w-lg w-full text-center">
          <h1 className="text-2xl font-bold text-red-600">Not Found</h1>
          <p className="mt-3 text-gray-600">
            No certificate found for this ID.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-purple-700 px-5 py-3 text-white"
          >
            Go Back
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-center text-green-700">
          Certificate Verified
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-[160px_1fr]">
          <div className="flex justify-center">
            {cert.photoUrl ? (
              <img
                src={cert.photoUrl}
                alt="Student Photo"
                className="h-40 w-32 rounded border object-cover"
              />
            ) : (
              <div className="h-40 w-32 rounded border flex items-center justify-center text-xs text-gray-400">
                No photo
              </div>
            )}
          </div>

          <div className="space-y-2 text-gray-800">
            <p><b>Certificate ID:</b> {id}</p>
            <p><b>Student Name:</b> {cert.studentName}</p>
            <p><b>Father Name:</b> {cert.fatherName}</p>
            <p><b>Course Name:</b> {cert.courseName}</p>
            <p><b>From:</b> {cert.fromDate}</p>
            <p><b>To:</b> {cert.toDate}</p>
            <p><b>Grade:</b> {cert.grade}</p>
            <p><b>Status:</b> {cert.status}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={`/api/certificate/${id}`}
            target="_blank"
            className="rounded-lg bg-purple-700 px-5 py-3 text-white"
          >
            Download PDF
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-5 py-3 text-gray-700"
          >
            Verify Another
          </Link>
        </div>
      </div>
    </main>
  );
}