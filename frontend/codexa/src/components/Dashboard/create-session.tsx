import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Zap, Users, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PROBLEMS } from "@/data/problems";
import { useCreateSession } from "@/hooks/useSessions";

export const CreateSession = () => {
  const [selectedProblemId, setSelectedProblemId] = useState<string>("");
  const selectedProblem = selectedProblemId ? PROBLEMS[selectedProblemId as keyof typeof PROBLEMS] : null;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {mutate: createSession, isPending} = useCreateSession();

  const handleCreate = () => {
    if (selectedProblemId) {
      setOpen(false);
      const sessionData = {
        problem: selectedProblemId,
        difficulty: selectedProblem?.difficulty.toLowerCase() || "",
      }
      createSession(sessionData, {
        onSuccess: (data) => navigate(`/session/${data.session._id}`)
      })
    }
  };

  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 shadow-lg shadow-primary/20 rounded-xl px-5 h-11 transition-all hover:scale-105 active:scale-95">
          <Zap className="h-4 w-4 fill-current" />
          Create Session <span className="ml-1 opacity-80">→</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0a0a0a] text-white border-border/20 sm:max-w-[500px] gap-0 p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold tracking-tight">Create New Session</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 pt-2 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
              Select Problem <span className="text-red-500">*</span>
            </label>
            <Select onValueChange={setSelectedProblemId} value={selectedProblemId}>
              <SelectTrigger className="bg-[#151515] border-border/20 text-white h-12 rounded-xl focus:ring-primary/50">
                <SelectValue placeholder="Select a problem..." />
              </SelectTrigger>
              <SelectContent className="bg-[#151515] border-border/20 text-white rounded-xl">
                {Object.values(PROBLEMS).map((p) => (
                  <SelectItem key={p.id} value={p.id} className="focus:bg-primary/20 focus:text-white">
                    {p.title} <span className="text-muted-foreground ml-2 text-xs">({p.difficulty})</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProblem && (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wide">
                 Room Summary:
              </div>
              <div className="space-y-1.5 pl-1">
                <div className="flex items-center gap-2.5 text-sm text-gray-300">
                   <div className="p-1 bg-primary/10 rounded-md">
                    <Code2 className="h-3.5 w-3.5 text-primary" />
                   </div>
                   Problem: <span className="text-white font-medium">{selectedProblem.title}</span>
                </div>
                 <div className="flex items-center gap-2.5 text-sm text-gray-300">
                   <div className="p-1 bg-primary/10 rounded-md">
                    <Users className="h-3.5 w-3.5 text-primary" />
                   </div>
                   Max Participants: <span className="text-white font-medium">2 (1-on-1 session)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="p-6 pt-2 bg-[#0f0f0f] border-t border-border/10">
           <Button variant="ghost" onClick={() => setOpen(false)} className="text-gray-400 hover:text-white hover:bg-white/5">
             Cancel
           </Button>
           <Button 
             onClick={handleCreate} 
             disabled={!selectedProblemId || isPending}
             className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-medium"
           >
             + Create Room
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};