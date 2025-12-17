import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Problem } from "@/types/problems";
import { PROBLEMS } from "@/data/problems";
import { ProblemNavbar } from "./problem-navbar";
import { ProblemDescription } from "./problem-discription";
import { CodeWorkspace } from "./code-workspace"; 

export const ProblemPage = () => {
  const { id } = useParams<{ id: string }>();
  const [language, setLanguage] = useState<"javascript" | "python" | "java">("javascript");
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);

  const problem: Problem | undefined = id ? PROBLEMS[id as keyof typeof PROBLEMS] : undefined;

  useEffect(() => {
    if (problem) {
      let initialCode = problem.starterCode[language];
      
      if (id === 'two-sum' && !initialCode.includes('return')) {
         if (language === 'javascript') {
            initialCode = initialCode.replace('// Write your solution here', '// Write your solution here\n  return [];');
         } else if (language === 'python') {
            initialCode = initialCode.replace('# Write your solution here', '# Write your solution here\n    return []');
         } else if (language === 'java') {
            initialCode = initialCode.replace('// Write your solution here', '// Write your solution here\n        return new int[0];');
         }
      }

      setCode(initialCode);
      setSuccess(false);
    }
  }, [problem, language, id]);

  if (!problem) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Problem not found</h2>
          <Link to="/dashboard/practice" className="mt-4 inline-block text-primary hover:underline">
            Return to practice
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30">
      

      <ProblemNavbar showSuccess={success} />

   
      <div className="relative z-10 flex flex-1 overflow-hidden p-4 gap-4">
      
        <ProblemDescription problem={problem} />

        <CodeWorkspace
          language={language}
          setLanguage={setLanguage}
          code={code}
          setCode={setCode}
          onSuccess={setSuccess}
        />
      </div>
    </div>
  );
};