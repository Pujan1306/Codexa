import { LogOut, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Problem } from "@/types/problems";
import { useEndSession } from "@/hooks/useSessions";
import { useNavigate } from "react-router-dom";

interface SessionHeaderProps {
  problem: Problem;
  session?: any;
}

export const SessionHeader = ({ problem, session }: SessionHeaderProps) => {
  const navigate = useNavigate();
  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "success";
      case "medium": return "warning";
      case "hard": return "destructive";
      default: return "secondary";
    }
  };

  const hostName = session?.host?.name || "Unknown Host";
  const participantCount = session?.participants ? session.participants.length + 1 : 1;

  const {mutate: endSessionMutation, isPending: endSessionLoading} = useEndSession();

  const handleEndSession = () => {
    console.log(session?._id);
    endSessionMutation(session?._id, {
      onSuccess: () => {
        navigate('/dashboard');
      }
    });
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex flex-col">
        <h1 className="text-lg font-bold tracking-tight text-foreground">{problem.title}</h1>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
           <span>{problem.category}</span>
           <span>•</span>
           <span className="flex items-center gap-1">
             Host: <span className="text-foreground font-medium">{hostName}</span>
           </span>
           <span>•</span>
           <span className="flex items-center gap-1">
             <Users className="h-3 w-3" />
             {participantCount} participants
           </span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Badge variant={getDifficultyVariant(problem.difficulty)}>
            {problem.difficulty}
        </Badge>
        
          <Button
            variant="destructive"
            size="sm"
            className="font-semibold hover:bg-red-900! transition-colors duration-300 hover:shadow-lg"
            disabled={endSessionLoading}
          >
             <LogOut className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
             <span onClick={handleEndSession} className="group-hover:underline">End Session</span>
          </Button>
      </div>
    </header>
  );
};