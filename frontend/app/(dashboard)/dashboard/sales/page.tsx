import { getSession } from "@/lib/session";
import { apiFetch } from "@/lib/api";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/require-role";

export default async function SalesPage() {
 const session = await requireRole("admin", "sales");

  if (!session) redirect("/login");

  const res = await apiFetch<{ leads: any[] }>("/loans/dashboard/sales", { token: session.token });
  const leads = res.data?.leads ?? [];

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs text-zinc-500 tracking-widest uppercase mb-1">Module</p>
        <h1 className="text-2xl font-medium">Sales — Leads</h1>
      </div>

      {!leads.length ? (
        <p className="text-zinc-500 text-sm">No pending leads.</p>
      ) : (
        <div className="border border-zinc-800 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-800">
              <tr>
                {["Name", "Email", "Employment", "Salary", "BRE Status", "Registered"].map(h => (
                  <th key={h} className="text-left text-xs text-zinc-500 uppercase tracking-widest px-4 py-3 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: any) => (
                <tr key={lead._id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                  <td className="px-4 py-3">{lead.fullName}</td>
                  <td className="px-4 py-3 text-zinc-400">{lead.userId?.email}</td>
                  <td className="px-4 py-3 text-zinc-400">{lead.employmentMode}</td>
                  <td className="px-4 py-3">₹{lead.monthlySalary?.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs uppercase tracking-widest ${lead.breStatus === "passed" ? "text-emerald-400" : "text-red-400"}`}>
                      {lead.breStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-500 text-xs">{new Date(lead.createdAt).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}