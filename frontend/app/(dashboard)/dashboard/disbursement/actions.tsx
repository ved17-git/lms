"use client";

import { useActionState } from "react";
import { disburseAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import type { Loan } from "@/lib/types";

export function DisburseButton({ loan }: { loan: Loan }) {
  const [state, action, pending] = useActionState(async (prev: any, fd: FormData) => {
    const res = await disburseAction(prev, fd);
    if (res?.success) window.location.reload();
    return res;
  }, undefined);

  return (
    <form action={action}>
      <input type="hidden" name="loanId" value={loan._id} />
      {state?.error && <p className="text-xs text-red-400 mb-1">{state.error}</p>}
      <Button size="sm" type="submit" disabled={pending} variant="outline"
        className="text-xs border-zinc-700 hover:bg-violet-500/10 hover:text-violet-400 hover:border-violet-500/30">
        {pending ? "Processing…" : "Disburse"}
      </Button>
    </form>
  );
}