import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProblemData {
  title: string;
  difficulty: string;
  description: {
    text: string;
    notes: string[];
  };
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
}

interface ProblemDescriptionProps {
  problem: ProblemData;
}

export const ProblemDescription = ({ problem }: ProblemDescriptionProps) => {
  return (
    <div className="flex w-[45%] flex-col overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-card/80 px-4 py-3">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-foreground">{problem.title}</h1>
          <Badge
            variant="default"
            className={cn(
              "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              problem.difficulty === "Easy" &&
                "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
              problem.difficulty === "Medium" &&
                "text-amber-500 bg-amber-500/10 border-amber-500/20",
              problem.difficulty === "Hard" &&
                "text-rose-500 bg-rose-500/10 border-rose-500/20"
            )}
          >
            {problem.difficulty}
          </Badge>
        </div>
      </div>


      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Description</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {problem.description.text}
            </p>
          </div>

          <div className="space-y-4">
            {problem.examples.map((example, index) => (
              <div
                key={index}
                className="rounded-lg bg-background/50 border border-border p-4"
              >
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Example {index + 1}
                </h3>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground select-none w-12">
                      Input:
                    </span>
                    <span className="text-foreground">{example.input}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground select-none w-12">
                      Output:
                    </span>
                    <span className="text-foreground">{example.output}</span>
                  </div>
                  {example.explanation && (
                    <div className="flex gap-2 pt-1">
                      <span className="text-muted-foreground select-none w-12">
                        Expl:
                      </span>
                      <span className="text-muted-foreground italic font-sans">
                        {example.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Constraints
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
              {problem.constraints.map((constraint, i) => (
                <li key={i} className="font-mono text-xs">
                  {constraint}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
