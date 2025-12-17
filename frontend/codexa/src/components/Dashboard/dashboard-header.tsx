import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { Loader2, Terminal } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type {User} from "better-auth"
import { useEffect, useState } from "react";


interface DashboardHeaderProps {
  subHeader: string;
}

export function DashboardHeader({ subHeader }: DashboardHeaderProps) {
  const [userSession, setUserSession] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const getUserSession = async () => {
      try {
      const {data} = await authClient.getSession();
      if (isMounted) {
        setUserSession(data?.user as User);
      }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    getUserSession();
    return () => {
      isMounted = false;
    }
  }, [])
  console.log(userSession?.image)
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary border border-primary/20">
              <Terminal className="mr-1.5 h-3 w-3" />
              {subHeader}
        </div>
      </div>
      <div className="flex items-center gap-4">
          <AnimatedThemeToggler  className="size-9 rounded-full"/>
        <Avatar className="h-9 w-9">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : userSession?.image ? (
          <AvatarImage 
            src={userSession.image} 
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        ) : (
          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
            {userSession?.name?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>
      </div>
    </header>
  );
}