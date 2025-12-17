import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { DotPattern } from '../ui/dot-pattern';
import { Eye, EyeOff, Command, ArrowRight } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const GoogleIcon = () => (
  <svg role="img" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
    />
  </svg>
);

export const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const { data, error } = await authClient.signIn.email({
        email,
        password,
    });

      if (error) {
         toast.error("Failed to sign in")
         console.log(error)
      }
      if (data) {
        toast.success("Signed in successfully")
        const {data: userSession} = await authClient.getSession()
        if (userSession?.session) {
          navigate("/dashboard")
        }
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };

  const handleGoogleLogin = async() => {
    try {
      setIsLoading(true)
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:5173/dashboard",
      })
      if (error) {
        toast.error("Failed to sign in")
        console.log(error)
      }
      if (data) {
        toast.success("Proceding for Google Sign In")
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-4">
      
      <DotPattern 
        className="absolute inset-0 z-0 text-muted-foreground/20" 
        width={20} 
        height={20} 
        cx={1.5} 
        cy={1.5} 
        cr={1.5}
        fill="currentColor"
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <Card className="relative w-full max-w-[440px] border-border/50 bg-card/60 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_-12px_hsl(var(--primary)/0.2)] transition-all duration-700 z-10 overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-70"></div>

        <CardHeader className="space-y-2 pb-3 text-center">
          <div className="flex justify-center mb-1">
            <div className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-orange-500 text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-500 hover:rotate-12 hover:scale-105">
              <Command className="h-5 w-5" />
              <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover:ring-white/40"></div>
            </div>
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Welcome back
          </CardTitle>

          <CardDescription className="text-center text-sm max-w-sm mx-auto">
            Enter your credentials to sign in
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 pb-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                className="h-10 bg-background/50 focus:bg-background transition-colors"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="••••••••"
                  className="h-10 bg-background/50 focus:bg-background pr-10 transition-colors"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full w-10 px-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button 
              disabled={isLoading} 
              type="submit" 
              className="w-full h-10 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 bg-linear-to-r from-primary to-orange-600 hover:to-orange-700"
            >
              {isLoading ? "Signing in..." : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/50 backdrop-blur-sm px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button 
            variant="outline" 
            type="button" 
            disabled={isLoading} 
            onClick={handleGoogleLogin} 
            className="w-full h-10 bg-background hover:bg-accent hover:text-accent-foreground transition-all"
          >
            {isLoading ? <span className="mr-2">Loading...</span> : <GoogleIcon />}
            <span className="font-medium">Google</span>
          </Button>
        </CardContent>

        <div className="bg-muted/30 border-t border-border/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-semibold text-primary hover:text-primary/80">
              Sign Up
            </Link>
          </p>
        </div>
      </Card>

      <div className="mt-8 text-xs text-muted-foreground/60 text-center z-10">
        &copy; 2025 Your Company. All rights reserved.
      </div>
    </div>
  );
};
