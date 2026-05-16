import { getSession } from "@/lib/session";
import { apiFetch } from "@/lib/api";
import { redirect } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";
import { PaymentForm } from "./actions";
import type { Loan } from "@/lib/types";
import { requireRole } from "@/lib/require-role";

export default async function CollectionPage() {

  const session = await requireRole("admin", "collection");

  if (!session) redirect("/login");

  const res = await apiFetch<{ loans: Loan[] }>("/loans/dashboard/collection", { token: session.token });
  const loans = res.data?.loans ?? [];

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs text-zinc-500 tracking-widest uppercase mb-1">Module</p>
        <h1 className="text-2xl font-medium">Collection</h1>
      </div>

      {!loans.length ? (
        <p className="text-zinc-500 text-sm">No active loans.</p>
      ) : (
        <div className="space-y-4">
          {loans.map(loan => (
            <div key={loan._id} className="border border-zinc-800 rounded p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium">{loan.userId?.firstName} {loan.userId?.lastName}</p>
                  <p className="text-xs text-zinc-500">{loan.userId?.email}</p>
                </div>
                <StatusBadge status={loan.status} />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Total Due</p>
                  <p>₹{loan.totalRepayment.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Paid</p>
                  <p className="text-emerald-400">₹{loan.totalPaid.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Outstanding</p>
                  <p className="text-amber-400">₹{(loan.totalRepayment - loan.totalPaid).toLocaleString("en-IN")}</p>
                </div>
              </div>

              <div className="h-1 bg-zinc-800 rounded mb-4">
                <div className="h-1 bg-amber-500 rounded" style={{ width: `${Math.min(100, (loan.totalPaid / loan.totalRepayment) * 100)}%` }} />
              </div>

              <PaymentForm loan={loan} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}