"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { apiFetch } from "./api";
import { setSession, getSession, clearSession } from "./session";
import type { Session, Loan } from "./types";

const COOKIE = "lms_session";

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function loginAction(_: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await apiFetch<Session>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!res.success || !res.data) return { error: res.message ?? "Login failed" };

  await setSession(res.data);

  const role = res.data.user.role;
  if (role === "borrower") redirect("/apply");
  redirect("/dashboard/sales"); // admin/exec — redirect handled client-side by role
}

export async function signupAction(_: unknown, formData: FormData) {
  const body = {
    firstName: formData.get("firstName"),
    lastName:  formData.get("lastName"),
    email:     formData.get("email"),
    password:  formData.get("password"),
  };

  const res = await apiFetch<Session>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.success || !res.data) return { error: res.message ?? "Signup failed" };

  await setSession(res.data);
  redirect("/apply");
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}

// ─── Borrower ─────────────────────────────────────────────────────────────────

export async function personalDetailsAction(_: unknown, formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const body = {
    fullName:       formData.get("fullName"),
    pan:            formData.get("pan"),
    dob:            formData.get("dob"),
    monthlySalary:  Number(formData.get("monthlySalary")),
    employmentMode: formData.get("employmentMode"),
  };

  const res = await apiFetch("/application/personal-details", {
    method: "POST",
    token: session.token,
    body: JSON.stringify(body),
  });

  if (!res.success) return { error: res.message };
  return { success: true };
}

export async function uploadSalarySlipAction(_: unknown, formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  // File upload — can't use JSON, must use raw fetch with FormData
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application/upload-salary-slip`, {
    method: "POST",
    headers: { Authorization: `Bearer ${session.token}` },
    body: formData, // pass FormData directly, no Content-Type header
  });

  const json = await res.json();
  if (!res.ok) return { error: json.message ?? "Upload failed" };
  return { success: true };
}

export async function applyLoanAction(_: unknown, formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const body = {
    principalAmount: Number(formData.get("principalAmount")),
    tenureDays:      Number(formData.get("tenureDays")),
  };

  const res = await apiFetch("/loans/apply", {
    method: "POST",
    token: session.token,
    body: JSON.stringify(body),
  });

  if (!res.success) return { error: res.message };
  redirect("/loans");  // ← was "/dashboard/borrower"
}

// ─── Sanction ─────────────────────────────────────────────────────────────────

export async function sanctionAction(_: unknown, formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const loanId        = formData.get("loanId") as string;
  const action        = formData.get("action") as string;
  const rejectionReason = formData.get("rejectionReason") as string | undefined;

  const res = await apiFetch(`/loans/${loanId}/sanction`, {
    method: "PATCH",
    token: session.token,
    body: JSON.stringify({ action, rejectionReason }),
  });

  if (!res.success) return { error: res.message };
  return { success: true };
}

// ─── Disburse ─────────────────────────────────────────────────────────────────

export async function disburseAction(_: unknown, formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const loanId = formData.get("loanId") as string;

  const res = await apiFetch(`/loans/${loanId}/disburse`, {
    method: "PATCH",
    token: session.token,
    body: JSON.stringify({}),
  });

  if (!res.success) return { error: res.message };
  return { success: true };
}

// ─── Payment ──────────────────────────────────────────────────────────────────

export async function paymentAction(_: unknown, formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const loanId = formData.get("loanId") as string;
  const body = {
    utrNumber:   formData.get("utrNumber"),
    amount:      Number(formData.get("amount")),
    paymentDate: formData.get("paymentDate"),
  };

  const res = await apiFetch(`/loans/${loanId}/payment`, {
    method: "POST",
    token: session.token,
    body: JSON.stringify(body),
  });

  if (!res.success) return { error: res.message };
  return { success: true };
}