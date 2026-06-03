import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserSession } from "@/lib/auth";

export default async function DashboardPage() {
  const auth = await getCurrentUserSession();

  if (!auth) {
    redirect("/signin");
  }

  const { user, session } = auth;

  return (
    <div className="min-h-screen p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-4 text-gray-600">
          Welcome, {user.name}
        </p>

        <div className="mt-6 rounded-lg border p-6">
          <h2 className="text-xl font-semibold">
            User Information
          </h2>

          <p className="mt-4">
            <strong>Name:</strong> {user.name}
          </p>

          <p className="mt-2">
            <strong>Email:</strong> {user.email}
          </p>

          <p className="mt-2">
            <strong>Session ID:</strong> {session.sessionId}
          </p>
        </div>

        {/* Profile Button */}
        <div className="mt-6">
          <Link
            href="/dashboard/profile"
            className="inline-block rounded-lg bg-black px-6 py-3 text-white font-medium hover:bg-gray-800 transition"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}