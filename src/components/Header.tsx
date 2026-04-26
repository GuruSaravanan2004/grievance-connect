import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, LogOut, User } from "lucide-react";
import IndianLogo from "@/assets/parl.jpg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGrievances } from "@/context/GrievanceContext";

const NAV_ITEMS = [
  { label: "Home", labelTamil: "முகப்பு", path: "/" },
  { label: "Submit Grievance", labelTamil: "குறை சமர்ப்பிக்க", path: "/submit" },
  { label: "Track Status", labelTamil: "நிலையை கண்காணிக்க", path: "/track" },
  { label: "Contact", labelTamil: "தொடர்பு", path: "/contact" },
];

export default function Header() {
  const { auth, logout } = useAuth();
  const { grievances } = useGrievances();
  const userGrievances = grievances.filter((g) => g.authorEmail === auth.username);
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
            <img src={IndianLogo} alt="Government Emblem" className="h-16 sm:h-20 w-16 sm:w-20 object-cover rounded-full shadow-md" />
            <div>
              <h1 className="text-sm sm:text-base font-bold text-foreground leading-tight">
                Government Grievance Redressal Portal
              </h1>
              <p className="text-xs text-muted-foreground">அரசு குறை தீர்வு நுழைவாயில்</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              if (item.path === "/track" && !auth.isLoggedIn) return null;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {auth.isLoggedIn ? (
              <>
                {auth.role === "admin" && (
                  <Link
                    to="/admin"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === "/admin"
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                      }`}
                  >
                    Admin Panel
                  </Link>
                )}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="ml-2">
                      <User className="h-4 w-4 mr-1" /> Profile
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto min-w-64 max-w-sm p-4 border rounded-md shadow-md bg-card" align="end">
                    <div className="space-y-3">
                      <h4 className="font-semibold leading-none text-foreground border-b pb-2 mb-2">My Profile</h4>
                      {auth.fullName && (
                        <div className="text-sm">
                          <span className="text-muted-foreground mr-2">Name:</span>
                          <span className="font-medium text-foreground">{auth.fullName}</span>
                        </div>
                      )}
                      <div className="text-sm break-all">
                        <span className="text-muted-foreground mr-2">Email:</span>
                        <span className="font-medium text-foreground">{auth.username || "Admin"}</span>
                      </div>
                      <div className="text-sm border-t pt-2 mt-2">
                        <span className="text-muted-foreground mr-2">Total Grievances:</span>
                        <span className="font-medium text-primary">{userGrievances.length} submitted</span>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button variant="ghost" size="sm" onClick={logout} className="ml-2">
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </>
            ) : (
              <Link
                to="/login"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === "/login"
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
            {NAV_ITEMS.map((item) => {
              if (item.path === "/track" && !auth.isLoggedIn) return null;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                    }`}
                >
                  {item.label} <span className="text-xs opacity-70">/ {item.labelTamil}</span>
                </Link>
              );
            })}
            {auth.isLoggedIn ? (
              <>
                {auth.role === "admin" && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">
                    Admin Panel
                  </Link>
                )}
                <div className="px-3 py-2 border-y my-1">
                  <div className="text-sm text-muted-foreground">
                    Signed in as <span className="text-foreground font-medium block truncate mt-0.5">{auth.fullName ? `${auth.fullName} (${auth.username})` : (auth.username || "Admin")}</span>
                  </div>
                  <div className="text-sm font-medium text-primary mt-1">Grievances Submitted: {userGrievances.length}</div>
                </div>
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
