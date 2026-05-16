"use client";

import { useActionState, useState } from "react";
import { sanctionAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Loan } from "@/lib/types";

export function SanctionActions({ loan }: { loan: Loan }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"approve" | "reject">("approve");
  const [state, action, pending] = useActionState(async (prev: unknown, fd: FormData) => {
    const res = await sanctionAction(prev, fd);
    if (res?.success) { setOpen(false); window.location.reload(); }
    return res;
  }, undefined);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex gap-2">
        <DialogTrigger asChild>
          <Button size="sm" variant="outline"
            className="text-xs border-zinc-700 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30"
            onClick={() => setMode("approve")}>
            Approve
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline"
            className="text-xs border-zinc-700 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
            onClick={() => setMode("reject")}>
            Reject
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-base font-medium text-zinc-100">
            {mode === "approve" ? "Approve loan" : "Reject loan"}
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500">
            {mode === "approve"
              ? "This will mark the loan as sanctioned."
              : "Provide a reason for rejecting this loan."}
          </DialogDescription>
        </DialogHeader>

        <form action={action} className="space-y-4 mt-2">
          <input type="hidden" name="loanId" value={loan._id} />
          <input type="hidden" name="action" value={mode} />
          {mode === "reject" && (
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400 uppercase tracking-widest">
                Rejection Reason
              </Label>
              <Input
                name="rejectionReason"
                required
                className="bg-zinc-950 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500/30"
              />
            </div>
          )}
          {state?.error && (
            <p className="text-xs text-red-400">{state.error}</p>
          )}
          <Button
            type="submit"
            disabled={pending}
            size="sm"
            className={
              mode === "approve"
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-red-600 hover:bg-red-500 text-white"
            }
          >
            {pending ? "Processing…" : `Confirm ${mode}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}