"use client";

import { logoutAction } from "@/lib/actions";
import { LogOut } from "lucide-react";
import type { AuthUser } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function BorrowerHeader({ user }: { user: AuthUser }) {
  const path = usePathname();

  return (
    <header className="border-b border-zinc-800 px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <p className="text-xs text-zinc-500 tracking-widest uppercase">LMS</p>
        <nav className="flex items-center gap-1">
          <Link href="/apply" className={cn(
            "text-xs px-3 py-1.5 rounded transition-colors",
            path === "/apply" ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:text-zinc-100"
          )}>
            Apply
          </Link>
          <Link href="/loans" className={cn(
            "text-xs px-3 py-1.5 rounded transition-colors",
            path === "/loans" ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:text-zinc-100"
          )}>
            My Loans
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-zinc-300">{user.firstName} {user.lastName}</p>
          <p className="text-xs text-zinc-500">{user.email}</p>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors px-2 py-1.5 rounded hover:bg-zinc-800">
            <LogOut size={13} /> Logout
          </button>
        </form>
      </div>
    </header>
  );
}