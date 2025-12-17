import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Chat, 
  Channel, 
  Window, 
  MessageList, 
  MessageInput, 
  Thread
} from 'stream-chat-react';
import type { StreamChat, Channel as StreamChannel } from 'stream-chat';
import 'stream-chat-react/dist/css/v2/index.css';
import { cn } from "@/lib/utils";

interface ChatDrawerProps {
  onClose: () => void;
  chatClient: StreamChat | null;
  channel: StreamChannel | null;
  isOpen: boolean;
}

export const ChatDrawer = ({ onClose, chatClient, channel, isOpen }: ChatDrawerProps) => {
  // We render the container even if client isn't ready, to maintain DOM structure 
  // and preventing layout jumps. We show a loader if open but not ready.

  return (
    <div 
        className={cn(
            "absolute inset-y-0 right-0 z-50 flex w-80 flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-in-out will-change-transform",
            isOpen ? "translate-x-0" : "translate-x-full",
            // Add invisible and pointer-events-none when closed to ensure it doesn't affect layout/interaction
            !isOpen && "invisible pointer-events-none"
        )}
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
        aria-hidden={!isOpen}
    >
      <div className="flex items-center justify-between border-b border-border p-4 bg-card z-10 shrink-0">
        <h3 className="font-semibold text-foreground">Chat</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-hidden relative str-chat-container bg-card">
        {chatClient && channel ? (
            <Chat client={chatClient} theme="str-chat__theme-dark">
            <Channel channel={channel}>
                <Window>
                <MessageList />
                <MessageInput focus />
                </Window>
                <Thread />
            </Channel>
            </Chat>
        ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading chat...</span>
            </div>
        )}
      </div>
      
      {/* Custom styles to override default Stream Chat styles for better integration */}
      <style>{`
        .str-chat-container {
            height: 100%;
        }
        .str-chat {
            background-color: transparent;
            height: 100%;
        }
        .str-chat__list {
            background-color: transparent;
        }
        .str-chat__channel-list {
            background-color: transparent;
        }
        .str-chat__main-panel {
            padding: 0;
        }
        .str-chat__ul {
             padding-bottom: 10px;
        }
        .str-chat__input-flat {
            background-color: hsl(var(--card));
            border-top: 1px solid hsl(var(--border));
        }
        .str-chat__input-flat-wrapper {
            background-color: hsl(var(--background));
            border: 1px solid hsl(var(--border));
        }
      `}</style>
    </div>
  );
};