import { Link } from "react-router-dom";
import { FileText, Search, Clock, CheckCircle2, ArrowRight, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGrievances } from "@/context/GrievanceContext";
import vijayHero from "@/assets/vijay-hero.jpeg";

export default function Index() {
  const { grievances } = useGrievances();

  const stats = {
    total: grievances.length,
    pending: grievances.filter((g) => g.status === "pending").length,
    inProgress: grievances.filter((g) => g.status === "in_progress").length,
    resolved: grievances.filter((g) => g.status === "resolved" || g.status === "closed").length,
  };

  return (
    <div>
      {/* Hero */}
      <section className="gov-gradient py-16 sm:py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left z-10 relative">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
              Government Grievance Redressal Portal
            </h1>
            <p className="text-primary-foreground/80 text-base sm:text-lg mb-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              அரசு குறை தீர்வு நுழைவாயில்
            </p>
            <p className="text-primary-foreground/70 max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              A transparent platform for citizens to submit, track, and resolve grievances with government departments efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                <Link to="/submit">
                  <FileText className="mr-2 h-5 w-5" />
                  Submit Grievance / குறை சமர்ப்பிக்க
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold border-2 border-accent">
                <Link to="/track">
                  <Search className="mr-2 h-5 w-5" />
                  Track Status / நிலையை கண்காணிக்க
                </Link>
              </Button>
            </div>
          </div>
          {/* Right image overlay */}
          <div className="hidden lg:block flex-shrink-0 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-transparent to-transparent rounded-full" />
              <img
                src={vijayHero}
                alt="Vijay - TVK Leader"
                className="h-[400px] w-auto object-contain drop-shadow-2xl"
                style={{
                  maskImage: "linear-gradient(to left, black 60%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to left, black 60%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 -mt-8">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="gov-stat-card animate-fade-in">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{stats.total}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Total Grievances<br />மொத்த குறைகள்</p>
            </div>
            <div className="gov-stat-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Clock className="h-8 w-8 mx-auto mb-2 text-gov-orange" />
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{stats.pending}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Pending<br />நிலுவையில்</p>
            </div>
            <div className="gov-stat-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{stats.inProgress}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">In Progress<br />நடவடிக்கையில்</p>
            </div>
            <div className="gov-stat-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-gov-green" />
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{stats.resolved}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Resolved<br />தீர்க்கப்பட்டது</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-4 bg-card">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-2">How It Works / இது எவ்வாறு செயல்படுகிறது</h2>
          <p className="text-center text-muted-foreground mb-10">Simple 3-step process to submit and resolve your grievance</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: "Submit Grievance", titleTamil: "குறை சமர்ப்பிக்க", desc: "Fill in the multi-step form with your department and grievance details" },
              { icon: Search, title: "Track Progress", titleTamil: "நிலையை கண்காணிக்க", desc: "Use your Grievance ID to track the status of your complaint" },
              { icon: CheckCircle2, title: "Get Resolution", titleTamil: "தீர்வு பெறுங்கள்", desc: "Receive updates as your grievance moves through the resolution process" },
            ].map((step, i) => (
              <div key={i} className="text-center p-6 rounded-lg border bg-background hover:shadow-md transition-shadow">
                <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-xs font-bold text-primary mb-2">STEP {i + 1}</div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{step.titleTamil}</p>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              <Link to="/submit">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
