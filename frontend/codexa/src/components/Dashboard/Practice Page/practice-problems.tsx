import { useState } from "react";
import { Code2, ChevronRight, Braces, Layers, Search, X } from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { PROBLEMS } from "@/data/problems";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const problemsList = Object.values(PROBLEMS);

const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "success";
    case "medium":
      return "warning";
    case "hard":
      return "destructive";
    default:
      return "secondary";
  }
};

export const PracticeProblems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const filteredProblems = problemsList.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty
      ? problem.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      : true;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden selection:bg-primary/20">
      <DotPattern
        className="absolute inset-0 h-full w-full fill-neutral-400/20 dark:fill-neutral-500/20"
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        glow={false}
      />
      
      <DotPattern
        className="absolute inset-0 h-full w-full fill-primary/80"
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        glow={true}
      />
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-7xl">
 
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 border-b border-border/40 pb-6">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Practice Problems
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
         
            <div className="relative w-full sm:w-[280px] group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search problems..."
                className="block w-full rounded-xl border border-border bg-card/50 pl-10 pr-4 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm transition-all placeholder:text-muted-foreground focus:border-primary/50 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

       
            <div className="flex items-center p-1 gap-1 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-sm overflow-x-auto max-w-full">
              {["Easy", "Medium", "Hard"].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() =>
                    setSelectedDifficulty(
                      selectedDifficulty === difficulty ? null : difficulty
                    )
                  }
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 border border-transparent whitespace-nowrap",
                    selectedDifficulty === difficulty
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {difficulty}
                </button>
              ))}
              {selectedDifficulty && (
                <div className="pl-1 border-l border-border/50 ml-1">
                  <button
                    onClick={() => setSelectedDifficulty(null)}
                    className="p-1.5 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-md transition-colors"
                    aria-label="Clear filters"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
            <Link key={problem.id} to={`/dashboard/practice/problem/${problem.id}`}>
              <div
                key={problem.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/40 p-5 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:bg-card/80 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="rounded-lg bg-secondary/80 p-2 text-primary ring-1 ring-border/50 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <Badge variant={getDifficultyVariant(problem.difficulty)}>
                      {problem.difficulty}
                    </Badge>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold tracking-tight leading-snug group-hover:text-primary transition-colors">
                    {problem.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {problem.category.split("•").map((cat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center text-[10px] text-muted-foreground bg-secondary/40 px-2 py-1 rounded-md border border-transparent group-hover:border-border/50 transition-colors"
                      >
                        {idx === 0 ? (
                          <Braces className="w-3 h-3 mr-1 opacity-70" />
                        ) : (
                          <Layers className="w-3 h-3 mr-1 opacity-70" />
                        )}
                        {cat.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 mt-auto border-t border-border/40 flex items-center justify-between text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    <span>View Problem</span>
                    <div className="p-1 rounded-full bg-transparent group-hover:bg-primary/10 transition-colors">
                      <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground">No problems found</h3>
              <p className="text-muted-foreground mt-1 max-w-xs">
                We couldn't find any problems matching your search or filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDifficulty(null);
                }}
                className="mt-4 text-sm font-medium text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
