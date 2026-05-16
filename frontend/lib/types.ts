export type Role = "admin" | "sales" | "sanction" | "disbursement" | "collection" | "borrower";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export interface Session {
  token: string;
  user: AuthUser;
}

export interface Application {
  _id: string;
  fullName: string;
  pan: string;
  dob: string;
  monthlySalary: number;
  employmentMode: string;
  breStatus: "passed" | "failed";
  breRejectionReasons: string[];
  salarySlipUrl: string | null;
}

export interface Payment {
  _id: string;
  utrNumber: string;
  amount: number;
  paymentDate: string;
}

export interface Loan {
  _id: string;
  userId: { _id: string; firstName: string; lastName: string; email: string };
  applicationId: Application;
  principalAmount: number;
  tenureDays: number;
  interestRate: number;
  simpleInterest: number;
  totalRepayment: number;
  status: "applied" | "sanctioned" | "rejected" | "disbursed" | "closed";
  payments: Payment[];
  totalPaid: number;
  rejectionReason?: string;
  createdAt: string;
}