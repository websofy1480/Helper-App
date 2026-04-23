"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function OAuth() {
  const { data: session, status } = useSession();  

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {!session ? (
        <>
          <button
            onClick={() => signIn("google")}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Login with Google
          </button>

          <button
            onClick={() => signIn("github")}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            Login with GitHub
          </button>
        </>
      ) : (
        <>
          <p>Welcome {session.user?.name}</p>
          <img
            src={session.user?.image || ""}
            alt="user"
            className="w-16 h-16 rounded-full"
          />

          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}