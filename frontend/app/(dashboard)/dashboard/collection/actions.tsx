"use client";

import { useActionState } from "react";
import { paymentAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Loan } from "@/lib/types";

export function PaymentForm({ loan }: { loan: Loan }) {
  const [state, action, pending] = useActionState(async (prev: any, fd: FormData) => {
    const res = await paymentAction(prev, fd);
    if (res?.success) window.location.reload();
    return res;
  }, undefined);

  return (
    <form action={action} className="border-t border-zinc-800 pt-4 grid grid-cols-3 gap-3 items-end">
      <input type="hidden" name="loanId" value={loan._id} />
      <div className="space-y-1.5">
        <Label className="text-xs text-zinc-400 uppercase tracking-widest">UTR Number</Label>
        <Input name="utrNumber" required className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500/30 text-sm" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-zinc-400 uppercase tracking-widest">Amount (₹)</Label>
        <Input name="amount" type="number" min={1} required className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500/30 text-sm" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-zinc-400 uppercase tracking-widest">Date</Label>
        <Input name="paymentDate" type="date" defaultValue={new Date().toISOString().split("T")[0]}
          className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500/30 text-sm" />
      </div>
      {state?.error && <p className="col-span-3 text-xs text-red-400">{state.error}</p>}
      <Button type="submit" disabled={pending} size="sm"
        className="col-span-3 bg-amber-500 hover:bg-amber-400 text-black font-medium">
        {pending ? "Recording…" : "Record Payment"}
      </Button>
    </form>
  );
}