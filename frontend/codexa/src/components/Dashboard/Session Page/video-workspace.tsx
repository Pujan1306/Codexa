import { useEffect, useState } from "react";
import { 
  StreamVideo, 
  StreamCall, 
  StreamTheme, 
  PaginatedGridLayout, 
  useCallStateHooks,
  useCall
} from "@stream-io/video-react-sdk";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  MonitorUp,
  MessageSquare, 
  Users, 
  Loader2,
  Smile
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { StreamVideoClient, Call } from "@stream-io/video-react-sdk";

interface VideoWorkspaceProps {
  onToggleChat: () => void;
  isChatOpen: boolean;
  session?: any;
  streamClient: StreamVideoClient | null;
  call: Call | null;
}

interface VideoWorkspaceProps {
  onToggleChat: () => void;
  isChatOpen: boolean;
  session?: any;
  streamClient: StreamVideoClient | null;
  call: Call | null;
}

const VideoControls = () => {
  const call = useCall();
  const { useMicrophoneState, useCameraState, useScreenShareState } = useCallStateHooks();
  
  const { isMute: isMicMuted } = useMicrophoneState();
  const { isMute: isCamMuted } = useCameraState();
  const { isMute: isScreenShareMuted } = useScreenShareState();
  
  const isScreenSharing = !isScreenShareMuted;

  const toggleMic = () => call?.microphone.toggle();
  const toggleCam = () => call?.camera.toggle();
  const toggleScreenShare = () => call?.screenShare.toggle();
  const emojis = ['👍', '👏', '😂', '🎉', '❤️', '🔥'];

  return (
    <div className="shrink-0 bg-[#0a0a0a] border-t border-white/5 p-4 flex justify-center items-center gap-4 z-20">
       {/* Mic */}
       <Button 
         variant="secondary" 
         size="icon" 
         className={`h-12 w-12 rounded-full border-0 transition-all ${!isMicMuted ? 'bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'}`}
         onClick={toggleMic}
       >
          {!isMicMuted ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
       </Button>

       {/* Camera */}
       <Button 
         variant="secondary" 
         size="icon" 
         className={`h-12 w-12 rounded-full border-0 transition-all ${!isCamMuted ? 'bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'}`}
         onClick={toggleCam}
       >
          {!isCamMuted ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
       </Button>

       {/* Screen Share */}
       <Button 
         variant="secondary" 
         size="icon" 
         className={`h-12 w-12 rounded-full border-0 transition-all ${isScreenSharing ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' : 'bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white'}`}
         onClick={toggleScreenShare}
       >
          <MonitorUp className="h-5 w-5" />
       </Button>
       
       {/* Reactions Popover */}
       <Popover>
         <PopoverTrigger asChild>
            <Button 
                variant="secondary" 
                size="icon" 
                className="h-12 w-12 rounded-full bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white border-0"
            >
                <Smile className="h-5 w-5" />
            </Button>
         </PopoverTrigger>
         <PopoverContent 
            side="top" 
            align="center" 
            sideOffset={10} 
            className="w-auto p-2 bg-[#1a1a1a] border-white/10 flex gap-2 rounded-full shadow-2xl mb-2"
         >
            {emojis.map(emoji => (
                <button 
                    key={emoji}
                    onClick={() => call?.sendReaction({ type: 'reaction', emoji_code: emoji })}
                    className="h-10 w-10 flex items-center justify-center text-2xl hover:scale-125 hover:bg-white/10 rounded-full transition-all"
                >
                    {emoji}
                </button>
            ))}
         </PopoverContent>
       </Popover>
       
      </div>
  );
};

// Component to handle displaying reactions
const FloatingReactions = ({ call }: { call: Call }) => {
    const [reactions, setReactions] = useState<{id: string, emoji: string, left: number}[]>([]);

    useEffect(() => {
        if (!call) return;

        const handleReaction = (event: any) => {
            if (event.reaction) {
                const newReaction = {
                    id: Math.random().toString(36).substr(2, 9),
                    emoji: event.reaction.emoji_code,
                    left: Math.floor(Math.random() * 80) + 10 // Random position between 10% and 90%
                };

                setReactions(prev => [...prev, newReaction]);

                // Remove reaction after animation duration (2s)
                setTimeout(() => {
                    setReactions(prev => prev.filter(r => r.id !== newReaction.id));
                }, 2000);
            }
        };

        call.on('call.reaction_new', handleReaction);

        return () => {
            call.off('call.reaction_new', handleReaction);
        };
    }, [call]);

    return (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            {reactions.map((reaction) => (
                <div 
                    key={reaction.id}
                    className="absolute bottom-20 text-4xl animate-float-up"
                    style={{ left: `${reaction.left}%` }}
                >
                    {reaction.emoji}
                </div>
            ))}
        </div>
    );
}

export const VideoWorkspace = ({ 
  onToggleChat, 
  isChatOpen, 
  streamClient, 
  call 
}: VideoWorkspaceProps) => {

  if (!streamClient || !call) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#0f0f0f] text-white">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
         <span className="ml-3 text-sm text-gray-400">Initializing Studio...</span>
      </div>
    );
  }

  return (
    <StreamVideo client={streamClient}>
      <StreamCall call={call}>
        <StreamTheme className="h-full w-full">
          <div className="relative flex h-full w-full flex-col bg-[#0f0f0f] text-white overflow-hidden">
             
             {/* Header Overlay */}
             <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                 <div className="flex items-center gap-2 rounded-lg bg-black/40 px-3 py-1.5 backdrop-blur-md border border-white/5">
                    <Users className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs font-medium">Live</span>
                 </div>
                 
                 <Button 
                   variant="ghost" 
                   size="sm"
                   onClick={onToggleChat}
                   className={`h-9 gap-2 rounded-lg border border-white/5 bg-black/40 backdrop-blur-md hover:bg-black/60 hover:text-white transition-colors ${isChatOpen ? 'text-primary' : 'text-gray-300'}`}
                 >
                    <MessageSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">Chat</span>
                 </Button>
             </div>

             {/* Floating Reactions Layer */}
             <FloatingReactions call={call} />

             {/* Main Video Area - Explicit centering */}
             <div className="flex-1 overflow-hidden relative p-4 flex items-center justify-center">
                 <PaginatedGridLayout 
                    groupSize={4}
                    VideoPlaceholder={({ participant }) => (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#151515] rounded-2xl border border-white/5 overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #333 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                            
                            <div className="relative flex flex-col items-center gap-6 z-10">
                                <div className="relative">
                                    <div className="h-28 w-28 rounded-full bg-linear-to-br from-gray-800 to-black border-2 border-white/10 flex items-center justify-center shadow-2xl">
                                        <span className="text-4xl font-bold text-gray-300">
                                        {participant.name ? participant.name.charAt(0).toUpperCase() : "U"}
                                        </span>
                                    </div>
                                    {!participant.isSpeaking && (
                                        <div className="absolute bottom-1 right-1 h-8 w-8 bg-red-500/90 rounded-full flex items-center justify-center border-2 border-[#151515]">
                                            <MicOff className="h-4 w-4 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold text-white tracking-wide">{participant.name || "Unknown User"}</h3>
                                    <p className="text-sm text-gray-500 font-medium mt-1">Video is turned off</p>
                                </div>
                            </div>
                        </div>
                    )}
                 />
             </div>

             {/* Bottom Controls */}
             <VideoControls />
          </div>
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  );
};