import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./status-badge";
import type { Loan } from "@/lib/types";

interface Props {
  loans: Loan[];
  action?: (loan: Loan) => React.ReactNode;
}

export function LoanTable({ loans, action }: Props) {
  if (!loans.length) return (
    <p className="text-zinc-500 text-sm py-12 text-center tracking-wide">No loans to show.</p>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-zinc-800 hover:bg-transparent">
          <TableHead className="text-zinc-500 text-xs uppercase tracking-widest">Borrower</TableHead>
          <TableHead className="text-zinc-500 text-xs uppercase tracking-widest">Amount</TableHead>
          <TableHead className="text-zinc-500 text-xs uppercase tracking-widest">Tenure</TableHead>
          <TableHead className="text-zinc-500 text-xs uppercase tracking-widest">Repayment</TableHead>
          <TableHead className="text-zinc-500 text-xs uppercase tracking-widest">Status</TableHead>
          {action && <TableHead />}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loans.map(loan => (
          <TableRow key={loan._id} className="border-zinc-800">
            <TableCell>
              <p className="text-sm">{loan.userId?.firstName} {loan.userId?.lastName}</p>
              <p className="text-xs text-zinc-500">{loan.userId?.email}</p>
            </TableCell>
            <TableCell className="text-sm">₹{loan.principalAmount.toLocaleString("en-IN")}</TableCell>
            <TableCell className="text-sm">{loan.tenureDays}d</TableCell>
            <TableCell className="text-sm">₹{loan.totalRepayment.toLocaleString("en-IN")}</TableCell>
            <TableCell><StatusBadge status={loan.status} /></TableCell>
            {action && <TableCell className="text-right">{action(loan)}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}