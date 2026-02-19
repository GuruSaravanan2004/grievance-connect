import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, LogOut } from "lucide-react";
import vijayLogo from "@/assets/vijay-logo.webp";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Home", labelTamil: "முகப்பு", path: "/" },
  { label: "Submit Grievance", labelTamil: "குறை சமர்ப்பிக்க", path: "/submit" },
  { label: "Track Status", labelTamil: "நிலையை கண்காணிக்க", path: "/track" },
  { label: "Contact", labelTamil: "தொடர்பு", path: "/contact" },
];

export default function Header() {
  const { auth, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
      {/* Top banner */}
      <div className="gov-banner py-1.5 px-4">
        <div className="container mx-auto flex items-center justify-between text-primary-foreground text-xs">
          <span>Government of Tamil Nadu / தமிழ்நாடு அரசு</span>
          <span className="hidden sm:block">English | தமிழ்</span>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={vijayLogo} alt="TVK Logo" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <h1 className="text-sm sm:text-base font-bold text-foreground leading-tight">
                Government Grievance Redressal Portal
              </h1>
              <p className="text-xs text-muted-foreground">அரசு குறை தீர்வு நுழைவாயில்</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {auth.isLoggedIn ? (
              <>
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === "/admin"
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  Admin Panel
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} className="ml-2">
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </>
            ) : (
              <Link
                to="/login"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/login"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-secondary"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden mt-3 pb-2 border-t pt-3 flex flex-col gap-1 animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {item.label} <span className="text-xs opacity-70">/ {item.labelTamil}</span>
              </Link>
            ))}
            {auth.isLoggedIn ? (
              <>
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">
                  Admin Panel
                </Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="px-3 py-2 rounded-md text-sm font-medium text-left text-destructive hover:bg-secondary">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
