import { useState, useEffect } from "react";
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  Shield, 
  Save, 
  Loader2, 
  AlertTriangle, 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DotPattern } from "@/components/ui/dot-pattern";
import { authClient } from "@/lib/auth-client";
import type {User} from "better-auth"
import { toast } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../sidebar";
import { DashboardHeader } from "../dashboard-header";

export const SettingsPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await authClient.getSession();
      const baseUser = data?.user;
      
      if (baseUser) {
        setUser(baseUser as User);
        setName(baseUser.name);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
    const response = await authClient.updateUser({ name });
    if (response) {
      const { data } = await authClient.getSession();
      if (data?.user) {
        setUser(data.user as User);
      }
      toast.success("Username updated successfully");
    }
    } catch (error) {
        console.error(error);
        toast.error("Failed to update username");
    } finally {
        setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center min-h-[500px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="min-h-screen w-full bg-background">
        <DashboardHeader subHeader="DevSettings" />

        <div className="relative overflow-hidden">
          <DotPattern
            className="absolute inset-0 fill-neutral-400/20 dark:fill-neutral-500/20"
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            glow={false}
          />

          <DotPattern
            className="absolute inset-0 fill-primary/70"
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            glow={true}
          />

          <div
            className="
              relative z-10
              px-12
              pr-10
              py-10
              space-y-8
            "
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Settings
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your account settings and preferences.
              </p>
            </div>

            <div className="grid gap-8">
              <section className="rounded-xl border border-border bg-card/60 backdrop-blur-sm shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/50">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-primary" />
                    Profile Information
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Update your personal information.
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24 border-4 border-secondary shadow-lg">
                      <AvatarImage src={user.image || ""} crossOrigin="anonymous" referrerPolicy="no-referrer"/>
                      <AvatarFallback className="text-3xl font-bold bg-secondary">
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-medium text-xl">
                        {user.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Display Name
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          value={user.email}
                          disabled
                          className="h-10 w-full rounded-md border border-input bg-secondary/40 px-3 text-sm cursor-not-allowed"
                        />
                        <div className="absolute right-3 top-2.5">
                          {user.emailVerified ? (
                            <Shield className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-secondary/20 border-t border-border/50 flex justify-end">
                  <Button onClick={handleSave} disabled={saving} className="gap-2">
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Save Changes
                  </Button>
                </div>
              </section>

              <section className="rounded-xl border border-border bg-card/60 backdrop-blur-sm shadow-sm">
                <div className="p-6 border-b border-border/50">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Account Status
                  </h2>
                </div>

                <div className="p-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Verification
                    </div>
                    <Badge
                      variant={user.emailVerified ? "success" : "warning"}
                      className="mt-2"
                    >
                      {user.emailVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Member Since
                    </div>
                    <div className="mt-2 text-sm font-mono">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};