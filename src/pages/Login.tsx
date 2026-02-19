import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import vijayLogo from "@/assets/vijay-logo.webp";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }
    const success = login(username, password);
    if (success) {
      toast({ title: "Login Successful / உள்நுழைவு வெற்றிகரமானது" });
      navigate("/admin");
    } else {
      setError("Invalid credentials. Please try again. / தவறான சான்றுகள்");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={vijayLogo} alt="TVK Logo" className="h-14 w-14 rounded-full object-cover mx-auto mb-4" />
          <h1 className="text-xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground">நிர்வாகி உள்நுழைவு</p>
        </div>

        <form onSubmit={handleSubmit} className="gov-form-step space-y-4">
          <div>
            <Label>Username / பயனர் பெயர்</Label>
            <Input className="mt-1.5" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
          </div>
          <div>
            <Label>Password / கடவுச்சொல்</Label>
            <Input className="mt-1.5" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            <LogIn className="h-4 w-4 mr-2" /> Login / உள்நுழைக
          </Button>
        </form>
      </div>
    </div>
  );
}
