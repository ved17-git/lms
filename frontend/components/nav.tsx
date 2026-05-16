"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/actions";
import { LogOut } from "lucide-react";
import type { AuthUser } from "@/lib/types";

const execLinks = [
  { href: "/dashboard/sales",        label: "Sales",        roles: ["admin", "sales"] },
  { href: "/dashboard/sanction",     label: "Sanction",     roles: ["admin", "sanction"] },
  { href: "/dashboard/disbursement", label: "Disbursement", roles: ["admin", "disbursement"] },
  { href: "/dashboard/collection",   label: "Collection",   roles: ["admin", "collection"] },
];

export function Nav({ user }: { user: AuthUser }) {
  const path = usePathname();
  const links = execLinks.filter(l => l.roles.includes(user.role));

  return (
    <aside className="w-52 shrink-0 border-r border-zinc-800 flex flex-col h-screen sticky top-0">
      <div className="px-6 py-5 border-b border-zinc-800">
        <p className="text-xs text-zinc-500 tracking-widest uppercase mb-0.5">LMS</p>
        <p className="text-sm font-medium truncate">{user.firstName} {user.lastName}</p>
        <p className="text-xs text-zinc-500 uppercase tracking-widest">{user.role}</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "block px-3 py-2 text-sm rounded transition-colors",
              path === l.href
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
            )}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <form action={logoutAction} className="p-3 border-t border-zinc-800">
        <button
          type="submit"
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 rounded hover:bg-zinc-900 transition-colors"
        >
          <LogOut size={14} /> Logout
        </button>
      </form>
    </aside>
  );
}