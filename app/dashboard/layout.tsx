import { redirect } from "next/navigation";
import { getCurrentUserSession } from "@/lib/auth";
import SessionWatcher from "../components/SessionWatcher";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUserSession();

  if (!session) {
    redirect("/signin");
  }

  return (
    <>
      <SessionWatcher />
      {children}
    </>
  );
}