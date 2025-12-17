import { DotPattern } from "../ui/dot-pattern";
import { SidebarProvider } from "../ui/sidebar";
import { DashboardHeader } from "./dashboard-header";
import { AppSidebar } from "./sidebar";
import { Activity, ArrowRight, Clock, Code2, History, Trophy, Users, LayoutGrid, List } from "lucide-react";
import { Badge } from "../ui/badge";
import { CreateSession } from "./create-session";
import { useActiveSessions, useMyRecentSessions } from "@/hooks/useSessions";
import { useState } from "react";
import { Button } from "../ui/button";
import { useJoinSession } from "@/hooks/useSessions";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "success";
      case "medium": return "warning";
      case "hard": return "destructive";
      default: return "secondary";
    }
  };

  const {isPending} = useJoinSession();

  const handleRejoinSession = (sessionId: string) => {
    navigate(`/session/${sessionId}`);
  }
  
  const [isGridView, setIsGridView] = useState(true); 
  const { data: activeSessionsData} = useActiveSessions();
  const { data: recentSessionsData } = useMyRecentSessions();
  

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full min-h-full">
        <DashboardHeader subHeader="Dev Dashboard" />
        <div className="flex-1 relative">
          <DotPattern
            className="absolute inset-0 h-full w-full fill-neutral-400/20 dark:fill-neutral-500/20"
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1.5}
            glow={false}
          />
          <DotPattern
            className="absolute inset-0 h-full w-full fill-primary/80"
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1.5}
            glow={true}
          />
          <div className="relative z-10 max-w-7xl mx-auto space-y-8 p-6 md:p-8">
          
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Welcome back, get ready to code.</p>
              </div>
              <CreateSession />
            </div>

         
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="space-y-6">
                
                <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/10 p-6 shadow-sm transition-all group backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-primary/10 rounded-xl text-primary ring-1 ring-primary/20">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-500 uppercase tracking-wider">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                      </span>
                      Live
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-foreground">{activeSessionsData?.session?.length ?? 0}</h3>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Active Sessions</p>
                  </div>
                </div>

                
                <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/10 p-6 shadow-sm transition-all group backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-primary/10 rounded-xl text-primary ring-1 ring-primary/20">
                      <Trophy className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-foreground">
                      {(activeSessionsData?.session?.length ?? 0) + (recentSessionsData?.session?.length ?? 0)}
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Sessions</p>
                  </div>
                </div>
              </div>

              
              <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card/10 shadow-sm overflow-hidden flex flex-col backdrop-blur-sm">
                <div className="p-6 border-b border-border/50 flex items-center justify-between bg-card/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Activity className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground">Live Sessions</h2>
                  </div>

                  {activeSessionsData?.session?.length > 0 && (
                    <div className="text-xs font-semibold text-green-500 flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      {activeSessionsData.session.length} active
                    </div>
                  )}
                </div>

                {activeSessionsData?.session?.length > 0 ? (
                  <div className="p-6 flex-1 space-y-4">
                    {activeSessionsData.session.map((session: any) => (
                      <div
                        key={session._id}
                        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-5 rounded-xl border border-border/50 bg-card/10 hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-5">
                          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
                            <Code2 className="h-7 w-7" />
                          </div>

                          <div>
                            <div className="flex items-center gap-3 mb-1.5">
                              <h3 className="font-bold text-lg text-foreground tracking-tight">{session.problem}</h3>

                              <Badge
                                variant={
                                  session.difficulty === "easy"
                                    ? "success"
                                    : session.difficulty === "medium"
                                    ? "warning"
                                    : "destructive"
                                }
                                className="text-[10px] py-0.5 h-5 shadow-none"
                              >
                                {session.difficulty}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                              <div className="flex items-center gap-1.5 text-foreground/80">
                                <div className="h-4 w-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[9px] font-bold ring-1 ring-indigo-500/30">
                                  {session.host?.name?.[0] ?? "U"}
                                </div>
                                {session.host?.name ?? "Unknown"}
                              </div>

                              <span className="text-border h-3 w-px bg-border/50"></span>

                              <div className="flex items-center gap-1.5">
                                <Users className="h-3.5 w-3.5" />
                                <span>2/{(session?.host ? 1 : 0) + (session?.participants?.length ?? 0)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0 pl-18 sm:pl-0">

                          <Button
                            onClick={() => handleRejoinSession(session._id)}
                            disabled={isPending}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 group-hover:shadow-primary/30"
                          >
                            Rejoin <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Activity className="mx-auto h-10 w-10 mb-3 opacity-40" />
                      <p className="text-sm font-medium">No active sessions</p>
                      <p className="text-xs opacity-70 mt-1">Start a new session to begin coding</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            
            <div className="rounded-2xl border border-border/50 bg-card shadow-sm p-6 flex flex-col">
            
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg">
                    <History className="h-5 w-5 text-foreground" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Your Past Sessions</h2>
                </div>

      
                <div className="flex items-center gap-2">
                <button
                    className={`p-2 rounded-lg hover:bg-primary/10 transition-colors ${isGridView ? "bg-primary/10" : ""}`}
                    onClick={() => setIsGridView(true)}
                >
                    <LayoutGrid className="h-5 w-5 text-foreground" />
                </button>
                <button
                    className={`p-2 rounded-lg hover:bg-primary/10 transition-colors ${!isGridView ? "bg-primary/10" : ""}`}
                    onClick={() => setIsGridView(false)}
                >
                    <List className="h-5 w-5 text-foreground" />
                </button>
                </div>
            </div>

            
            <div
                className={`overflow-y-auto max-h-[600px] ${
                isGridView ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"
                }`}
            >
                {recentSessionsData?.session?.slice(0, 9).map((session: any) => (
                <div
                    key={session._id}
                    className="rounded-2xl border border-border/50 p-5 shadow-sm hover:border-primary/30 transition-all group"
                >
                    <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-xl bg-secondary/80 flex items-center justify-center text-primary border border-border/50 group-hover:bg-primary/10 transition-colors">
                        <Code2 className="h-5 w-5" />
                        </div>
                        <div>
                        <h3 className="font-semibold text-sm text-foreground">{session.problem}</h3>
                        <Badge
                            variant={getDifficultyVariant(session.difficulty)}
                            className="text-[10px] py-0 mt-1"
                        >
                            {session.difficulty}
                        </Badge>
                        </div>
                    </div>
                    </div>

                    <div className="space-y-2.5 mb-5 px-1">
                    <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-medium">
                        <Clock className="h-3.5 w-3.5 opacity-70" />
                        {new Date(session.createdAt).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-medium">
                        <Users className="h-3.5 w-3.5 opacity-70" />
                        {session.participants ? "2 participants" : "1 participant"}
                    </div>
                    </div>

                    <div className="pt-4 border-t border-border/50 flex items-center justify-between text-[11px] font-semibold tracking-wide">
                    <span className="text-muted-foreground uppercase">{session.status}</span>
                    <span className="text-muted-foreground/70">{new Date(session.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                ))}
            </div>
            </div>

          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
