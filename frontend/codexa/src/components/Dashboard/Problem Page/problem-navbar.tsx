import { Link } from "react-router-dom";
import { Code2, List, LayoutDashboard, CheckCircle2 } from "lucide-react";

interface ProblemNavbarProps {
  showSuccess?: boolean;
}

export const ProblemNavbar = ({ showSuccess }: ProblemNavbarProps) => {
  return (
    <header className="relative z-10 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 font-bold text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Code2 className="h-5 w-5" />
          </div>
          <span>DevPractice</span>
        </div>

        <div className="h-4 w-px bg-border" />

        <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
          <Link
            to="/dashboard/practice"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <List className="h-4 w-4" />
            Problems
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </nav>
      </div>

      {showSuccess && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/10 border border-green-500/30 px-4 py-1.5 text-xs font-medium text-green-400 flex items-center gap-2 shadow-[0_0_15px_rgba(74,222,128,0.3)] backdrop-blur-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
            <span className="text-green-400">Execution Successful</span>
        </div>
      )}
    </header>
  );
};
