"use client";

import { useActionState } from "react";
import { signupAction } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signupAction, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-4">
        <div className="mb-8">
          <p className="text-xs text-zinc-500 tracking-widest uppercase mb-1">LMS</p>
          <h1 className="text-2xl font-medium">Create account</h1>
        </div>

        <form action={action} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400 uppercase tracking-widest">First name</Label>
              <Input name="firstName" required className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500/30" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400 uppercase tracking-widest">Last name</Label>
              <Input name="lastName" required className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500/30" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400 uppercase tracking-widest">Email</Label>
            <Input name="email" type="email" required className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500/30" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400 uppercase tracking-widest">Password</Label>
            <Input name="password" type="password" required className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500/30" />
          </div>

          {state?.error && (
            <p className="text-xs text-red-400 border border-red-500/20 bg-red-500/5 px-3 py-2 rounded">
              {state.error}
            </p>
          )}

          <Button type="submit" disabled={pending}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-medium">
            {pending ? "Creating…" : "Create account"}
          </Button>
        </form>

        <p className="text-xs text-zinc-500 mt-6 text-center">
          Have an account?{" "}
          <Link href="/login" className="text-amber-400 hover:text-amber-300">Sign in</Link>
        </p>
      </div>
    </div>
  );
}