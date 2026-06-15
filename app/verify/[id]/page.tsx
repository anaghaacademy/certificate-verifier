export default function VerifyTestPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="rounded-2xl bg-white p-8 shadow max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-green-600">
          Test Verify Page
        </h1>
        <p className="mt-3 text-gray-600">
          ID from params: {params.id}
        </p>
      </div>
    </main>
  );
}