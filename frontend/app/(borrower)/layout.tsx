import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { BorrowerHeader } from "@/components/borrower-header";

export default async function BorrowerLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.role !== "borrower") redirect("/dashboard/sales");

  return (
    <div className="min-h-screen">
      <BorrowerHeader user={session.user} />
      {children}
    </div>
  );
}