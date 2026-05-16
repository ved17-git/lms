import { getSession } from "@/lib/session";
import { apiFetch } from "@/lib/api";
import { redirect } from "next/navigation";
import { LoanTable } from "@/components/loan-table";
import { SanctionActions } from "./actions";
import type { Loan } from "@/lib/types";
import { requireRole } from "@/lib/require-role";

export default async function SanctionPage() {
    
const session = await requireRole("admin", "sanction");
  if (!session) redirect("/login");

  const res = await apiFetch<{ loans: Loan[] }>("/loans/dashboard/sanction", { token: session.token });
  const loans = res.data?.loans ?? [];

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs text-zinc-500 tracking-widest uppercase mb-1">Module</p>
        <h1 className="text-2xl font-medium">Sanction — Review Applications</h1>
      </div>
      <LoanTable loans={loans} action={(loan) => <SanctionActions loan={loan} />} />
    </div>
  );
}