import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import StepIndicator from "@/components/StepIndicator";
import { useGrievances } from "@/context/GrievanceContext";
import {
  DEPARTMENTS,
  LOCAL_BODY_TYPES,
  GRIEVANCE_TYPES,
  GRIEVANCE_SUBTYPES,
  TALUKS,
  REVENUE_DIVISIONS,
  generateGrievanceId,
  Grievance,
} from "@/data/constants";
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
import { FileText, Upload, ChevronLeft, ChevronRight, Send, Trash2 } from "lucide-react";

const STEPS = ["Department", "Location & Details", "Communication"];

export default function SubmitGrievance() {
  const [step, setStep] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addGrievance } = useGrievances();

  const [form, setForm] = useState({
    department: "",
    localBodyType: "",
    grievanceType: "",
    subType: "",
    taluk: "",
    revenueDivision: "",
    firka: "",
    villagePanchayat: "",
    responsibleOfficer: "",
    differentAddress: false,
    grievanceId: generateGrievanceId(),
    subject: "Grievance",
    description: "",
    attachment: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = useCallback((field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!form.department || form.department === "none")
        newErrors.department = "Please select a department / துறையை தேர்ந்தெடுக்கவும்";
    }
    if (step === 1) {
      if (!form.localBodyType || form.localBodyType === "none")
        newErrors.localBodyType = "Please select local body type";
      if (!form.grievanceType || form.grievanceType === "none")
        newErrors.grievanceType = "Please select grievance type";
      if (!form.taluk || form.taluk === "none")
        newErrors.taluk = "Please select taluk";
    }
    if (step === 2) {
      if (!form.subject.trim()) newErrors.subject = "Subject is required";
      if (!form.description.trim()) newErrors.description = "Description is required";
      if (form.description.trim().length < 10) newErrors.description = "Description must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 2));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    if (!validateStep()) return;
    setShowConfirm(true);
  };

  const confirmSubmit = () => {
    setSubmitting(true);
    setShowConfirm(false);
    setTimeout(() => {
      const grievance: Grievance = {
        id: form.grievanceId,
        department: form.department,
        grievanceType: form.grievanceType,
        subType: form.subType || "general",
        localBodyType: form.localBodyType,
        taluk: form.taluk,
        subject: form.subject,
        description: form.description,
        status: "pending",
        submittedAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        attachmentName: form.attachment?.name,
      };
      addGrievance(grievance);
      setSubmitting(false);
      toast({
        title: "Grievance Submitted Successfully! / குறை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!",
        description: `Your Grievance ID: ${form.grievanceId}`,
      });
      navigate("/track");
    }, 1500);
  };

  const discard = () => {
    setForm({
      department: "",
      localBodyType: "",
      grievanceType: "",
      subType: "",
      taluk: "",
      revenueDivision: "",
      firka: "",
      villagePanchayat: "",
      responsibleOfficer: "",
      differentAddress: false,
      grievanceId: generateGrievanceId(),
      subject: "Grievance",
      description: "",
      attachment: null,
    });
    setStep(0);
    setErrors({});
  };

  const subtypes = GRIEVANCE_SUBTYPES[form.grievanceType] || GRIEVANCE_SUBTYPES.default || [];

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-6">
        <a href="/" className="hover:text-primary">Home</a>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Submit Grievance / குறை சமர்ப்பிக்க</span>
      </nav>

      <h1 className="text-2xl font-bold mb-2">Submit Grievance</h1>
      <p className="text-muted-foreground mb-6">குறை சமர்ப்பிக்க - Fill in the details below</p>

      <StepIndicator steps={STEPS} currentStep={step} />

      <div className="gov-form-step animate-fade-in">
        {/* Step 0: Department */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Department Selection / துறை தேர்வு
            </h2>
            <div>
              <Label>Government Department / அரசு துறை <span className="text-destructive">*</span></Label>
              <Select value={form.department} onValueChange={(v) => updateField("department", v)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select Department / துறையை தேர்ந்தெடுக்கவும்" />
                </SelectTrigger>
                <SelectContent className="bg-popover max-h-60">
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && <p className="text-destructive text-xs mt-1">{errors.department}</p>}
            </div>
          </div>
        )}

        {/* Step 1: Location */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Location & Administrative Details / இடம் மற்றும் நிர்வாக விவரங்கள்</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Local Body Type / உள்ளாட்சி அமைப்பு வகை <span className="text-destructive">*</span></Label>
                <Select value={form.localBodyType} onValueChange={(v) => updateField("localBodyType", v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent className="bg-popover">{LOCAL_BODY_TYPES.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}</SelectContent>
                </Select>
                {errors.localBodyType && <p className="text-destructive text-xs mt-1">{errors.localBodyType}</p>}
              </div>
              <div>
                <Label>Grievance Type / குறையின் வகை <span className="text-destructive">*</span></Label>
                <Select value={form.grievanceType} onValueChange={(v) => { updateField("grievanceType", v); updateField("subType", ""); }}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent className="bg-popover">{GRIEVANCE_TYPES.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}</SelectContent>
                </Select>
                {errors.grievanceType && <p className="text-destructive text-xs mt-1">{errors.grievanceType}</p>}
              </div>
              <div>
                <Label>Grievance SubType / குறையின் துணை வகை</Label>
                <Select value={form.subType} onValueChange={(v) => updateField("subType", v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent className="bg-popover">{subtypes.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Taluk / வட்டம் <span className="text-destructive">*</span></Label>
                <Select value={form.taluk} onValueChange={(v) => updateField("taluk", v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent className="bg-popover">{TALUKS.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}</SelectContent>
                </Select>
                {errors.taluk && <p className="text-destructive text-xs mt-1">{errors.taluk}</p>}
              </div>
              <div>
                <Label>Revenue Division / உட்கோட்டம்</Label>
                <Select value={form.revenueDivision} onValueChange={(v) => updateField("revenueDivision", v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent className="bg-popover">{REVENUE_DIVISIONS.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Firka / குறுவட்டம்</Label>
                <Input className="mt-1.5" placeholder="Enter Firka name" value={form.firka} onChange={(e) => updateField("firka", e.target.value)} />
              </div>
              <div>
                <Label>Village Panchayat / கிராம பஞ்சாயத்து</Label>
                <Input className="mt-1.5" placeholder="Enter Village Panchayat" value={form.villagePanchayat} onChange={(e) => updateField("villagePanchayat", e.target.value)} />
              </div>
              <div>
                <Label>Responsible Officer / பொறுப்பு அதிகாரி</Label>
                <Input className="mt-1.5" placeholder="Enter officer name" value={form.responsibleOfficer} onChange={(e) => updateField("responsibleOfficer", e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Communication */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Communication Details / தொடர்பு விவரங்கள்</h2>

            <div className="flex items-center gap-2">
              <Checkbox
                id="diffAddr"
                checked={form.differentAddress}
                onCheckedChange={(v) => updateField("differentAddress", !!v)}
              />
              <Label htmlFor="diffAddr" className="text-sm cursor-pointer">
                Select if different from above / மேலே உள்ளதிலிருந்து வேறுபட்டால் தேர்ந்தெடுக்கவும்
              </Label>
            </div>

            <div>
              <Label>Grievance ID / குறை அடையாள எண்</Label>
              <Input className="mt-1.5 bg-muted" value={form.grievanceId} readOnly />
            </div>

            <div>
              <Label>Subject / பொருள் <span className="text-destructive">*</span></Label>
              <Input className="mt-1.5" value={form.subject} onChange={(e) => updateField("subject", e.target.value)} />
              {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
            </div>

            <div>
              <Label>Description / விளக்கம் <span className="text-destructive">*</span></Label>
              <Textarea className="mt-1.5 min-h-[100px]" placeholder="Describe your grievance in detail..." value={form.description} onChange={(e) => updateField("description", e.target.value)} />
              {errors.description && <p className="text-destructive text-xs mt-1">{errors.description}</p>}
            </div>

            <div>
              <Label>Attachment / இணைப்பு (up to 40 MB)</Label>
              <div className="mt-1.5 border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  id="fileUpload"
                  onChange={(e) => updateField("attachment", e.target.files?.[0] || null)}
                />
                <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  {form.attachment ? (
                    <span className="text-sm font-medium text-primary">{form.attachment.name}</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Click to upload file</span>
                  )}
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t">
          <div>
            {step > 0 && (
              <Button variant="outline" onClick={prev}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={discard} className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4 mr-1" /> Discard
            </Button>
            {step < 2 ? (
              <Button onClick={next}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-1" /> Submit / சமர்ப்பிக்க
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Confirm dialog */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Submission / சமர்ப்பிப்பதை உறுதிப்படுத்தவும்</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit this grievance? Your Grievance ID will be <strong>{form.grievanceId}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubmit}>Confirm Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
