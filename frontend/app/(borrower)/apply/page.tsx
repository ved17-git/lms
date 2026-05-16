"use client";

import { useActionState, useState } from "react";
import { personalDetailsAction, uploadSalarySlipAction, applyLoanAction } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const STEPS = ["Personal Details", "Salary Slip", "Loan Config"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-colors",
            i < current  ? "bg-amber-500 border-amber-500 text-black" :
            i === current ? "border-amber-500 text-amber-400" :
                           "border-zinc-700 text-zinc-600"
          )}>
            {i < current ? "✓" : i + 1}
          </div>
          <span className={cn("text-xs", i === current ? "text-zinc-200" : "text-zinc-600")}>
            {label}
          </span>
          {i < STEPS.length - 1 && <div className="w-8 h-px bg-zinc-800 ml-1" />}
        </div>
      ))}
    </div>
  );
}

// Step 1
function PersonalDetailsStep({ onSuccess }: { onSuccess: () => void }) {
  const [state, action, pending] = useActionState(async (prev: any, fd: FormData) => {
    const res = await personalDetailsAction(prev, fd);
    if (res?.success) onSuccess();
    return res;
  }, undefined);

  const [employment, setEmployment] = useState("");

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1.5">
        <Label className="text-xs text-zinc-400 uppercase tracking-widest">Full Name</Label>
        <Input name="fullName" required className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500/30" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs text-zinc-400 uppercase tracking-widest">PAN</Label>
          <Input name="pan" placeholder="ABCDE1234F" className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500/30 uppercase" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-zinc-400 uppercase tracking-widest">Date of Birth</Label>
          <Input name="dob" type="date" required className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500/30" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs text-zinc-400 uppercase tracking-widest">Monthly Salary (₹)</Label>
          <Input name="monthlySalary" type="number" min={0} required className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500/30" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-zinc-400 uppercase tracking-widest">Employment</Label>
          <Select name="employmentMode" onValueChange={setEmployment} required>
            <SelectTrigger className="">
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="Salaried">Salaried</SelectItem>
              <SelectItem value="Self-Employed">Self-Employed</SelectItem>
              <SelectItem value="Unemployed">Unemployed</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="employmentMode" value={employment} />
        </div>
      </div>

      {state?.error && (
        <div className="text-xs text-red-400 border border-red-500/20 bg-red-500/5 px-3 py-2 rounded space-y-1">
          <p className="font-medium">Eligibility check failed:</p>
          <p>{state.error}</p>
        </div>
      )}

      <Button type="submit" disabled={pending} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-medium">
        {pending ? "Checking eligibility…" : "Continue"}
      </Button>
    </form>
  );
}

// Step 2
function SalarySlipStep({ onSuccess }: { onSuccess: () => void }) {
  const [state, action, pending] = useActionState(async (prev: any, fd: FormData) => {
    const res = await uploadSalarySlipAction(prev, fd);
    if (res?.success) onSuccess();
    return res;
  }, undefined);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1.5">
        <Label className="text-xs text-zinc-400 uppercase tracking-widest">Salary Slip</Label>
        <p className="text-xs text-zinc-500">PDF, JPG or PNG — max 5 MB</p>
        <Input name="salarySlip" type="file" accept=".pdf,.jpg,.jpeg,.png" required
          className="bg-zinc-900 border-zinc-800 file:text-zinc-400 file:bg-transparent file:border-0 file:text-xs" />
      </div>

      {state?.error && (
        <p className="text-xs text-red-400 border border-red-500/20 bg-red-500/5 px-3 py-2 rounded">{state.error}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-medium">
        {pending ? "Uploading…" : "Upload & Continue"}
      </Button>
    </form>
  );
}

// Step 3
function LoanConfigStep() {
  const [state, action, pending] = useActionState(applyLoanAction, undefined);
  const [amount, setAmount] = useState(200000);
  const [tenure, setTenure] = useState(180);

  const si = (amount * 12 * tenure) / (365 * 100);
  const total = amount + si;

  return (
    <form action={action} className="space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between">
          <Label className="text-xs text-zinc-400 uppercase tracking-widest">Loan Amount</Label>
          <span className="text-sm text-amber-400">₹{amount.toLocaleString("en-IN")}</span>
        </div>
        <input type="range" name="principalAmount" min={50000} max={500000} step={10000}
          value={amount} onChange={e => setAmount(Number(e.target.value))}
          className="w-full accent-amber-500" />
        <div className="flex justify-between text-xs text-zinc-600">
          <span>₹50,000</span><span>₹5,00,000</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <Label className="text-xs text-zinc-400 uppercase tracking-widest">Tenure</Label>
          <span className="text-sm text-amber-400">{tenure} days</span>
        </div>
        <input type="range" name="tenureDays" min={30} max={365} step={5}
          value={tenure} onChange={e => setTenure(Number(e.target.value))}
          className="w-full accent-amber-500" />
        <div className="flex justify-between text-xs text-zinc-600">
          <span>30 days</span><span>365 days</span>
        </div>
      </div>

      {/* Live calculation */}
      <div className="border border-zinc-800 rounded p-4 space-y-2 bg-zinc-900/50">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Principal</span>
          <span>₹{amount.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Interest (12% p.a.)</span>
          <span>₹{si.toFixed(2)}</span>
        </div>
        <div className="h-px bg-zinc-800" />
        <div className="flex justify-between text-sm font-medium">
          <span className="text-zinc-300">Total Repayment</span>
          <span className="text-amber-400">₹{total.toFixed(2)}</span>
        </div>
      </div>

      {state?.error && (
        <p className="text-xs text-red-400 border border-red-500/20 bg-red-500/5 px-3 py-2 rounded">{state.error}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-medium">
        {pending ? "Submitting…" : "Apply for Loan"}
      </Button>
    </form>
  );
}

export default function ApplyPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-lg px-4">
        <div className="mb-8">
          <p className="text-xs text-zinc-500 tracking-widest uppercase mb-1">Loan Application</p>
          <h1 className="text-2xl font-medium">{STEPS[step]}</h1>
        </div>

        <StepIndicator current={step} />

        {step === 0 && <PersonalDetailsStep onSuccess={() => setStep(1)} />}
        {step === 1 && <SalarySlipStep onSuccess={() => setStep(2)} />}
        {step === 2 && <LoanConfigStep />}
      </div>
    </div>
  );
}