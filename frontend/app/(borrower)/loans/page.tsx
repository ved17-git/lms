import { getSession } from "@/lib/session";
import { apiFetch } from "@/lib/api";
import { StatusBadge } from "@/components/status-badge";
import { redirect } from "next/navigation";
import type { Loan } from "@/lib/types";
import Link from "next/link";

export default async function BorrowerDashboard() {
  const session = await getSession();
  if (!session) redirect("/login");

  const res = await apiFetch<{ loans: Loan[] }>("/loans/my", { token: session.token });
  const loans = res.data?.loans ?? [];

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-xs text-zinc-500 tracking-widest uppercase mb-1">Your Applications</p>
        <h1 className="text-2xl font-medium">Loan Status</h1>
      </div>

      {!loans.length ? (
        <div className="border border-zinc-800 rounded p-8 text-center">
          <p className="text-zinc-500 text-sm mb-4">No loan applications yet.</p>
          <Link href="/apply" className="text-amber-400 text-sm hover:text-amber-300">Apply now →</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {loans.map(loan => (
            <div key={loan._id} className="border border-zinc-800 rounded p-5 space-y-4">
              <div className="flex items-center justify-between">
                <StatusBadge status={loan.status} />
                <span className="text-xs text-zinc-500">{new Date(loan.createdAt).toLocaleDateString("en-IN")}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Principal</p>
                  <p className="text-sm">₹{loan.principalAmount.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Tenure</p>
                  <p className="text-sm">{loan.tenureDays} days</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Repayment</p>
                  <p className="text-sm">₹{loan.totalRepayment.toLocaleString("en-IN")}</p>
                </div>
              </div>
              {loan.status === "disbursed" && (
                <div className="border-t border-zinc-800 pt-3">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Paid: ₹{loan.totalPaid.toLocaleString("en-IN")}</span>
                    <span>Outstanding: ₹{(loan.totalRepayment - loan.totalPaid).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded mt-2">
                    <div
                      className="h-1 bg-amber-500 rounded transition-all"
                      style={{ width: `${Math.min(100, (loan.totalPaid / loan.totalRepayment) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {loan.rejectionReason && (
                <p className="text-xs text-red-400 border border-red-500/20 bg-red-500/5 px-3 py-2 rounded">
                  Rejected: {loan.rejectionReason}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}