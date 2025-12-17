import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PROBLEMS } from "@/data/problems";
import type { Problem } from "@/types/problems";
import { SessionHeader } from "./session-header";
import { VideoWorkspace } from "./video-workspace";
import { ChatDrawer } from "./chat-drawer";
import { ProblemDescription } from "./problem-discription";
import { CodeWorkspace } from "./code-workspace";
import { Loader2, AlertCircle, GripVertical } from "lucide-react";
import { useSessionById } from "@/hooks/useSessions";
import { useJoinSession } from "@/hooks/useSessions";
import { authClient } from "@/lib/auth-client";
import { useStreamClient } from "@/hooks/useStreamClient";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export const SessionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [userSession, setUserSession] = useState<any>(null);
  useEffect(() => {
    const fetchUserSession = async () => {
      const {data} = await authClient.getSession();
      setUserSession(data as any);
    }
    fetchUserSession();
  }, [])

  const [language, setLanguage] = useState<"javascript" | "python" | "java">("javascript");
  const [code, setCode] = useState("");
  // Explicitly initialize chatOpen to false
  const [chatOpen, setChatOpen] = useState(false);
  
  const { data: sessionData, isLoading, error, refetch } = useSessionById(id as string);
  const joinSessionMutation = useJoinSession();
  const session = sessionData?.session;
  const problemId = session?.problem;
  const problem: Problem | undefined = problemId ? PROBLEMS[problemId as keyof typeof PROBLEMS] : undefined;
  
  const isHost = userSession?.user.id === session?.host._id;
  const participants = session?.participants ?? [];
  const isParticipant = participants.some(
    (p: any) => p._id === userSession?.user.id
  );

  const {
      streamClient, 
      call, 
      chatClient, 
      channel
  } = useStreamClient(session, isLoading, isHost, isParticipant)

  useEffect(() => {
    const autoJoinSession = () => {
      if (!session || !userSession || isLoading) return
      if (isHost || isParticipant) return 

      joinSessionMutation.mutate(session._id, {
        onSuccess: () => refetch,
        onError: () => navigate('/dashboard')
      })
    }
    autoJoinSession()
  }, [session, userSession, isLoading, isHost, isParticipant])

  useEffect(() => {
    if (problem) {
      let initialCode = problem.starterCode[language];
       if (problem.id === 'two-sum' && !initialCode.includes('return')) {
         if (language === 'javascript') {
            initialCode = initialCode.replace('// Write your solution here', '// Write your solution here\n  return [];');
         } else if (language === 'python') {
            initialCode = initialCode.replace('# Write your solution here', '# Write your solution here\n    return []');
         } else if (language === 'java') {
            initialCode = initialCode.replace('// Write your solution here', '// Write your solution here\n        return new int[0];');
         }
      }
      setCode(initialCode);
    }
  }, [problem, language]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Loading session...</span>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground gap-4">
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-6 w-6" />
          <h2 className="text-xl font-bold">Error</h2>
        </div>
        <p className="text-muted-foreground">{error instanceof Error ? error.message : "Problem details not found."}</p>
        <Link to="/dashboard" className="text-primary hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground overflow-hidden">
      <SessionHeader problem={problem} session={session} />
      
      <div className="flex-1 overflow-hidden">
         <PanelGroup direction="horizontal">
            {/* Left Side: Code & Description */}
            <Panel defaultSize={50} minSize={30}>
                <PanelGroup direction="vertical">
                    <Panel defaultSize={40} minSize={20}>
                        <div className="h-full w-full overflow-hidden border-b border-border bg-background">
                            <ProblemDescription 
                                problem={problem} 
                                className="h-full w-full rounded-none border-0 shadow-none bg-transparent" 
                            />
                        </div>
                    </Panel>
                    
                    <PanelResizeHandle className="relative flex h-px w-full items-center justify-center bg-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1">
                        <div className="z-10 flex h-3 w-4 items-center justify-center rounded-sm border bg-border">
                            <GripVertical className="h-2.5 w-2.5 rotate-90" />
                        </div>
                    </PanelResizeHandle>
                    
                    <Panel defaultSize={60} minSize={20}>
                        <div className="h-full w-full overflow-hidden bg-black">
                            <CodeWorkspace 
                                language={language}
                                setLanguage={setLanguage}
                                code={code}
                                setCode={setCode}
                                className="h-full rounded-none border-0 shadow-none"
                            />
                        </div>
                    </Panel>
                </PanelGroup>
            </Panel>

            <PanelResizeHandle className="relative flex w-px items-center justify-center bg-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1">
                <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
                    <GripVertical className="h-2.5 w-2.5" />
                </div>
            </PanelResizeHandle>

            {/* Right Side: Video & Chat */}
            <Panel defaultSize={50} minSize={30}>
                {/* 
                  Container needs to be relative and overflow-hidden to contain absolute chat drawer 
                  without it affecting layout or creating scrollbars.
                */}
                <div className="relative h-full w-full bg-black overflow-hidden isolate">
                    <VideoWorkspace 
                        onToggleChat={() => setChatOpen(!chatOpen)}
                        isChatOpen={chatOpen}
                        session={session}
                        streamClient={streamClient}
                        call={call}
                    />
                    <ChatDrawer 
                        isOpen={chatOpen}
                        onClose={() => setChatOpen(false)} 
                        chatClient={chatClient}
                        channel={channel}
                    />
                </div>
            </Panel>
         </PanelGroup>
      </div>
    </div>
  );
};