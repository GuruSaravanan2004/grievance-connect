import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useGrievances } from "@/context/GrievanceContext";
import { getDepartmentLabel, getStatusBadgeClass, getStatusLabel } from "@/data/constants";

export default function TrackStatus() {
  const [searchId, setSearchId] = useState("");
  const [searched, setSearched] = useState(false);
  const { grievances } = useGrievances();

  const result = searched ? grievances.find((g) => g.id.toLowerCase() === searchId.trim().toLowerCase()) : null;

  const handleSearch = () => {
    if (searchId.trim()) setSearched(true);
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <nav className="text-sm text-muted-foreground mb-6">
        <a href="/" className="hover:text-primary">Home</a>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Track Status / நிலையை கண்காணிக்க</span>
      </nav>

      <h1 className="text-2xl font-bold mb-2">Track Grievance Status</h1>
      <p className="text-muted-foreground mb-6">குறை நிலையை கண்காணிக்க - Enter your Grievance ID below</p>

      <div className="gov-form-step">
        <Label>Grievance ID / குறை அடையாள எண்</Label>
        <div className="flex gap-2 mt-1.5">
          <Input
            placeholder="e.g. GRV-2026-00001"
            value={searchId}
            onChange={(e) => { setSearchId(e.target.value); setSearched(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-1" /> Search
          </Button>
        </div>

        {searched && result && (
          <div className="mt-6 p-4 rounded-lg border bg-background animate-fade-in space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{result.id}</h3>
              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getStatusBadgeClass(result.status)}`}>
                {getStatusLabel(result.status)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Department:</span>
                <p className="font-medium">{getDepartmentLabel(result.department)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Subject:</span>
                <p className="font-medium">{result.subject}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Submitted:</span>
                <p className="font-medium">{result.submittedAt}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Updated:</span>
                <p className="font-medium">{result.updatedAt}</p>
              </div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Description:</span>
              <p className="text-sm mt-1">{result.description}</p>
            </div>
          </div>
        )}

        {searched && !result && (
          <div className="mt-6 p-4 rounded-lg border bg-background text-center animate-fade-in">
            <p className="text-muted-foreground">No grievance found with ID: <strong>{searchId}</strong></p>
            <p className="text-xs text-muted-foreground mt-1">Please check the ID and try again</p>
          </div>
        )}
      </div>

      {/* Recent grievances */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Grievances / சமீபத்திய குறைகள்</h2>
        <div className="space-y-2">
          {grievances.slice(0, 5).map((g) => (
            <div
              key={g.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:shadow-sm cursor-pointer transition-shadow"
              onClick={() => { setSearchId(g.id); setSearched(true); }}
            >
              <div>
                <span className="font-mono text-sm font-medium">{g.id}</span>
                <p className="text-xs text-muted-foreground">{g.subject}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getStatusBadgeClass(g.status)}`}>
                {g.status.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
