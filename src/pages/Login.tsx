import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, UserPlus } from "lucide-react";
import IndianLogo from "@/assets/Indian Logo.jpg";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, login: contextLogin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }
    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);
    if (error) {
      setError(error);
    } else {
      toast({ title: "Login Successful / உள்நுழைவு வெற்றிகரமானது" });
      navigate("/");
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }
    
    const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "admin@example.com";
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

    // Explicit check for admin using environment variables
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoading(true);
      // Try Supabase auth first, if it works, great. 
      // We also use the local bypass to ensure they get admin access even if Supabase isn't synced.
      await signIn(email, password);
      
      const success = contextLogin(email, password);
      setIsLoading(false);
      
      if (success) {
        toast({ title: "Admin Login Successful / நிர்வாகி உள்நுழைவு" });
        navigate("/admin");
      }
    } else {
      setError("Only authorized admin can access the admin dashboard.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);
    const { error } = await signUp(email, password, fullName);
    setIsLoading(false);
    if (error) {
      setError(error);
    } else {
      toast({
        title: "Registration Successful / பதிவு வெற்றிகரமானது",
        description: "Please check your email to verify your account.",
      });
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={IndianLogo} alt="Government Emblem" className="h-14 w-auto object-contain mix-blend-multiply mx-auto mb-4" />
          <h1 className="text-xl font-bold">Welcome / வரவேற்கிறோம்</h1>
          <p className="text-sm text-muted-foreground">Login or create a new account</p>
        </div>

        <Tabs defaultValue="login" className="w-full" onValueChange={() => setError("")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login / உள்நுழைக</TabsTrigger>
            <TabsTrigger value="signup">Sign Up / பதிவு</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="gov-form-step space-y-4">
              <div>
                <Label>Email / மின்னஞ்சல்</Label>
                <Input className="mt-1.5" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
              </div>
              <div>
                <Label>Password / கடவுச்சொல்</Label>
                <Input className="mt-1.5" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                <LogIn className="h-4 w-4 mr-2" /> {isLoading ? "Logging in..." : "Login / உள்நுழைக"}
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <Button type="button" variant="outline" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleAdminLogin} disabled={isLoading}>
                <LogIn className="h-4 w-4 mr-2" /> Admin Login / நிர்வாகி உள்நுழைக
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="gov-form-step space-y-4">
              <div>
                <Label>Full Name / முழு பெயர்</Label>
                <Input className="mt-1.5" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" />
              </div>
              <div>
                <Label>Email / மின்னஞ்சல்</Label>
                <Input className="mt-1.5" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
              </div>
              <div>
                <Label>Password / கடவுச்சொல்</Label>
                <Input className="mt-1.5" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" />
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                <UserPlus className="h-4 w-4 mr-2" /> {isLoading ? "Creating account..." : "Sign Up / பதிவு செய்க"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
