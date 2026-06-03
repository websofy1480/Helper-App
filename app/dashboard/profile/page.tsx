import { getCurrentUserSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const auth = await getCurrentUserSession();

  if (!auth) {
    redirect("/signin");
  }

  const { user } = auth;

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">
        Profile Page
      </h1>

      <div className="mt-6 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">
          User Information
        </h2>

        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p className="mt-2">
          <strong>Email:</strong> {user.email}
        </p>

        <p className="mt-2">
          <strong>User ID:</strong> {user._id.toString()}
        </p>
      </div>
    </div>
  );
}