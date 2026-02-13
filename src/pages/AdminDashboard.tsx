import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useGrievances } from "@/context/GrievanceContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  getDepartmentLabel,
  getStatusBadgeClass,
  getStatusLabel,
  STATUS_OPTIONS,
  DEPARTMENTS,
  Grievance,
} from "@/data/constants";
import { Download, Trash2, Eye, RefreshCw, Search, BarChart3, Clock, CheckCircle2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminDashboard() {
  const { auth } = useAuth();
  const { grievances, updateStatus, deleteGrievance } = useGrievances();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewGrievance, setViewGrievance] = useState<Grievance | null>(null);

  if (!auth.isLoggedIn) return <Navigate to="/login" replace />;

  const filtered = grievances.filter((g) => {
    const matchSearch = g.id.toLowerCase().includes(search.toLowerCase()) ||
      g.subject.toLowerCase().includes(search.toLowerCase());
    const matchDept = filterDept === "all" || g.department === filterDept;
    const matchStatus = filterStatus === "all" || g.status === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const stats = {
    total: grievances.length,
    pending: grievances.filter((g) => g.status === "pending").length,
    inProgress: grievances.filter((g) => g.status === "in_progress").length,
    resolved: grievances.filter((g) => g.status === "resolved" || g.status === "closed").length,
  };

  const exportCSV = () => {
    const headers = ["ID,Department,Type,Subject,Status,Submitted,Updated"];
    const rows = filtered.map((g) =>
      `${g.id},${getDepartmentLabel(g.department)},${g.grievanceType},${g.subject},${g.status},${g.submittedAt},${g.updatedAt}`
    );
    const csv = [...headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grievances_export.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported successfully!" });
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteGrievance(deleteId);
      setDeleteId(null);
      toast({ title: "Grievance deleted / குறை நீக்கப்பட்டது" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">நிர்வாகி கட்டுப்பாட்டு பலகை - Welcome, {auth.username}</p>
        </div>
        <Button variant="outline" onClick={exportCSV}>
          <Download className="h-4 w-4 mr-1" /> Export CSV
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="gov-stat-card">
          <BarChart3 className="h-6 w-6 mx-auto mb-1 text-primary" />
          <div className="text-xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
        <div className="gov-stat-card">
          <Clock className="h-6 w-6 mx-auto mb-1 text-gov-orange" />
          <div className="text-xl font-bold">{stats.pending}</div>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
        <div className="gov-stat-card">
          <Users className="h-6 w-6 mx-auto mb-1 text-primary" />
          <div className="text-xl font-bold">{stats.inProgress}</div>
          <p className="text-xs text-muted-foreground">In Progress</p>
        </div>
        <div className="gov-stat-card">
          <CheckCircle2 className="h-6 w-6 mx-auto mb-1 text-gov-green" />
          <div className="text-xl font-bold">{stats.resolved}</div>
          <p className="text-xs text-muted-foreground">Resolved</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search by ID or subject..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={filterDept} onValueChange={setFilterDept}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Department" /></SelectTrigger>
          <SelectContent className="bg-popover max-h-60">
            <SelectItem value="all">All Departments</SelectItem>
            {DEPARTMENTS.filter((d) => d.value !== "none").map((d) => (
              <SelectItem key={d.value} value={d.value}>{d.label.split(" / ")[0].substring(0, 30)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Status</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label.split(" / ")[0]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="hidden md:table-cell">Department</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No grievances found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((g) => (
                <TableRow key={g.id}>
                  <TableCell className="font-mono text-xs">{g.id}</TableCell>
                  <TableCell className="hidden md:table-cell text-xs">{getDepartmentLabel(g.department)}</TableCell>
                  <TableCell className="text-sm max-w-[200px] truncate">{g.subject}</TableCell>
                  <TableCell>
                    <Select
                      value={g.status}
                      onValueChange={(v) => {
                        updateStatus(g.id, v as Grievance["status"]);
                        toast({ title: `Status updated to ${v}` });
                      }}
                    >
                      <SelectTrigger className="h-7 w-28 text-xs">
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                          g.status === "pending" ? "bg-gov-orange" :
                          g.status === "in_progress" ? "bg-primary" :
                          g.status === "resolved" ? "bg-gov-green" : "bg-muted-foreground"
                        }`} />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem key={s.value} value={s.value}>{s.label.split(" / ")[0]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{g.submittedAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setViewGrievance(g)}>
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeleteId(g.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View dialog */}
      <Dialog open={!!viewGrievance} onOpenChange={() => setViewGrievance(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Grievance Details / குறை விவரங்கள்</DialogTitle>
          </DialogHeader>
          {viewGrievance && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-muted-foreground">ID:</span><p className="font-mono font-medium">{viewGrievance.id}</p></div>
                <div><span className="text-muted-foreground">Status:</span><p><span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getStatusBadgeClass(viewGrievance.status)}`}>{getStatusLabel(viewGrievance.status)}</span></p></div>
                <div><span className="text-muted-foreground">Department:</span><p className="font-medium">{getDepartmentLabel(viewGrievance.department)}</p></div>
                <div><span className="text-muted-foreground">Type:</span><p className="font-medium">{viewGrievance.grievanceType}</p></div>
                <div><span className="text-muted-foreground">Submitted:</span><p>{viewGrievance.submittedAt}</p></div>
                <div><span className="text-muted-foreground">Updated:</span><p>{viewGrievance.updatedAt}</p></div>
              </div>
              <div><span className="text-muted-foreground">Subject:</span><p className="font-medium">{viewGrievance.subject}</p></div>
              <div><span className="text-muted-foreground">Description:</span><p>{viewGrievance.description}</p></div>
              {viewGrievance.attachmentName && (
                <div><span className="text-muted-foreground">Attachment:</span><p>{viewGrievance.attachmentName}</p></div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Grievance?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. The grievance {deleteId} will be permanently removed.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
