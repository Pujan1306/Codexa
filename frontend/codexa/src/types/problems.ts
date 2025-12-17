export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string; 
}

export interface Problem {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  description: {
    text: string;
    notes: string[];
  };
  examples: ProblemExample[];
  constraints: string[];
  starterCode: {
    javascript: string;
    python: string;
    java: string;
  };
  expectedOutput: {
    javascript: string;
    python: string;
    java: string;
  };
}

export interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
}