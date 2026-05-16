import { getSession } from "./session";
import { redirect } from "next/navigation";
import type { Role } from "./types";

export async function requireRole(...roles: Role[]) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!roles.includes(session.user.role)) redirect("/login");
  return session;
}