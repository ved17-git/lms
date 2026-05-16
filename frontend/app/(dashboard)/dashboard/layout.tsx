import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Nav } from "@/components/nav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.role === "borrower") redirect("/apply");

  return (
    <div className="flex">
      <Nav user={session.user} />
      <main className="flex-1 min-h-screen p-8">{children}</main>
    </div>
  );
}