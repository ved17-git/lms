import { getSession } from "@/lib/session";
import { apiFetch } from "@/lib/api";
import { redirect } from "next/navigation";
import { LoanTable } from "@/components/loan-table";
import { DisburseButton } from "./actions";
import type { Loan } from "@/lib/types";
import { requireRole } from "@/lib/require-role";

export default async function DisbursementPage() {
  const session = await requireRole("admin", "disbursement");
  if (!session) redirect("/login");

  const res = await apiFetch<{ loans: Loan[] }>("/loans/dashboard/disbursement", { token: session.token });
  const loans = res.data?.loans ?? [];

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs text-zinc-500 tracking-widest uppercase mb-1">Module</p>
        <h1 className="text-2xl font-medium">Disbursement</h1>
      </div>
      <LoanTable loans={loans} action={(loan) => <DisburseButton loan={loan} />} />
    </div>
  );
}