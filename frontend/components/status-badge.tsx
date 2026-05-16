import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  applied:     "bg-amber-500/10 text-amber-400 border-amber-500/20",
  sanctioned:  "bg-blue-500/10 text-blue-400 border-blue-500/20",
  rejected:    "bg-red-500/10 text-red-400 border-red-500/20",
  disbursed:   "bg-violet-500/10 text-violet-400 border-violet-500/20",
  closed:      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={cn("text-xs tracking-widest uppercase", map[status])}>
      {status}
    </Badge>
  );
}