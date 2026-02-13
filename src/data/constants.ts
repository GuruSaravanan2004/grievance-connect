export const DEPARTMENTS = [
  { value: "none", label: "None / எதுவுமில்லை" },
  { value: "adw", label: "Adi Dravidar and Tribal Welfare Department (ADW) / ஆதி திராவிடர் மற்றும் பழங்குடியினர் நலத்துறை" },
  { value: "agri", label: "Agriculture and Farmers Welfare Department (AGRI) / வேளாண்மை மற்றும் விவசாயிகள் நலத்துறை" },
  { value: "ahfish", label: "Animal Husbandry, Dairying, Fisheries Department (AHFISH) / கால்நடை பராமரிப்பு, பால்வளம் மற்றும் மீன்வளத்துறை" },
  { value: "bc", label: "Backward Classes and Minorities Welfare Department / பிற்படுத்தப்பட்டோர் மற்றும் சிறுபான்மையினர் நலத்துறை" },
  { value: "commercial", label: "Commercial Taxes and Registration Department / வணிக வரி மற்றும் பதிவுத்துறை" },
  { value: "cooperation", label: "Co-operation, Food and Consumer Protection Department / கூட்டுறவு, உணவு மற்றும் நுகர்வோர் பாதுகாப்புத்துறை" },
  { value: "education", label: "Education Department / கல்வித்துறை" },
  { value: "energy", label: "Energy Department / எரிசக்தித்துறை" },
  { value: "environment", label: "Environment, Climate Change and Forests Department / சுற்றுச்சூழல், காலநிலை மாற்றம் மற்றும் வனத்துறை" },
  { value: "health", label: "Health and Family Welfare Department / சுகாதாரம் மற்றும் குடும்ப நலத்துறை" },
  { value: "highways", label: "Highways and Minor Ports Department / நெடுஞ்சாலை மற்றும் சிறு துறைமுகத்துறை" },
  { value: "housing", label: "Housing and Urban Development Department / வீட்டுவசதி மற்றும் நகர்ப்புற வளர்ச்சித்துறை" },
  { value: "industries", label: "Industries, Investment Promotion and Commerce Department / தொழில், முதலீட்டு மேம்பாடு மற்றும் வணிகத்துறை" },
  { value: "it", label: "Information Technology and Digital Services Department / தகவல் தொழில்நுட்பம் மற்றும் எண்ணிம சேவைகள் துறை" },
  { value: "labour", label: "Labour Welfare and Skill Development Department / தொழிலாளர் நலம் மற்றும் திறன் மேம்பாட்டுத்துறை" },
  { value: "law", label: "Law Department / சட்டத்துறை" },
  { value: "municipal", label: "Municipal Administration and Water Supply Department / நகராட்சி நிர்வாகம் மற்றும் குடிநீர் வழங்கல் துறை" },
  { value: "police", label: "Police Department / காவல்துறை" },
  { value: "revenue", label: "Revenue and Disaster Management Department / வருவாய் மற்றும் பேரிடர் மேலாண்மைத்துறை" },
  { value: "rural", label: "Rural Development and Panchayat Raj Department / ஊரக வளர்ச்சி மற்றும் பஞ்சாயத்து ராஜ் துறை" },
  { value: "social", label: "Social Welfare and Women Empowerment Department / சமூக நலம் மற்றும் பெண்கள் மேம்பாட்டுத்துறை" },
  { value: "transport", label: "Transport Department / போக்குவரத்துத்துறை" },
  { value: "tn_water", label: "Water Resources Department / நீர்வளத்துறை" },
];

export const LOCAL_BODY_TYPES = [
  { value: "none", label: "Select / தேர்ந்தெடுக்கவும்" },
  { value: "corporation", label: "Municipal Corporation / மாநகராட்சி" },
  { value: "municipality", label: "Municipality / நகராட்சி" },
  { value: "town_panchayat", label: "Town Panchayat / பேரூராட்சி" },
  { value: "village_panchayat", label: "Village Panchayat / கிராம பஞ்சாயத்து" },
];

export const GRIEVANCE_TYPES = [
  { value: "none", label: "Select / தேர்ந்தெடுக்கவும்" },
  { value: "service_delay", label: "Delay in Service / சேவை தாமதம்" },
  { value: "corruption", label: "Corruption / ஊழல்" },
  { value: "infrastructure", label: "Infrastructure Issue / உள்கட்டமைப்பு பிரச்சினை" },
  { value: "welfare", label: "Welfare Scheme Issue / நலத்திட்ட பிரச்சினை" },
  { value: "land", label: "Land Related / நிலம் சம்பந்தமான" },
  { value: "water", label: "Water Supply / குடிநீர் வழங்கல்" },
  { value: "road", label: "Road & Transport / சாலை மற்றும் போக்குவரத்து" },
  { value: "electricity", label: "Electricity / மின்சாரம்" },
  { value: "other", label: "Other / மற்றவை" },
];

export const GRIEVANCE_SUBTYPES: Record<string, Array<{ value: string; label: string }>> = {
  service_delay: [
    { value: "certificate", label: "Certificate Issuance / சான்றிதழ் வழங்குதல்" },
    { value: "pension", label: "Pension Delay / ஓய்வூதிய தாமதம்" },
    { value: "ration", label: "Ration Card Issue / ரேஷன் அட்டை பிரச்சினை" },
  ],
  infrastructure: [
    { value: "road_repair", label: "Road Repair / சாலை பழுது" },
    { value: "drainage", label: "Drainage / வடிகால்" },
    { value: "building", label: "Building / கட்டிடம்" },
  ],
  water: [
    { value: "no_supply", label: "No Water Supply / குடிநீர் இல்லை" },
    { value: "contaminated", label: "Contaminated Water / மாசுபட்ட நீர்" },
    { value: "pipe_leak", label: "Pipe Leakage / குழாய் கசிவு" },
  ],
  default: [
    { value: "general", label: "General / பொது" },
  ],
};

export const TALUKS = [
  { value: "none", label: "Select Taluk / வட்டம் தேர்ந்தெடுக்கவும்" },
  { value: "chennai_north", label: "Chennai North / சென்னை வடக்கு" },
  { value: "chennai_south", label: "Chennai South / சென்னை தெற்கு" },
  { value: "tambaram", label: "Tambaram / தாம்பரம்" },
  { value: "sriperumbudur", label: "Sriperumbudur / ஸ்ரீபெரும்புதூர்" },
  { value: "tiruvallur", label: "Tiruvallur / திருவள்ளூர்" },
  { value: "kanchipuram", label: "Kanchipuram / காஞ்சிபுரம்" },
  { value: "madurai_north", label: "Madurai North / மதுரை வடக்கு" },
  { value: "madurai_south", label: "Madurai South / மதுரை தெற்கு" },
  { value: "coimbatore_north", label: "Coimbatore North / கோயம்புத்தூர் வடக்கு" },
  { value: "coimbatore_south", label: "Coimbatore South / கோயம்புத்தூர் தெற்கு" },
  { value: "salem", label: "Salem / சேலம்" },
  { value: "trichy", label: "Tiruchirappalli / திருச்சிராப்பள்ளி" },
];

export const REVENUE_DIVISIONS = [
  { value: "none", label: "Select / தேர்ந்தெடுக்கவும்" },
  { value: "div1", label: "Revenue Division I / உட்கோட்டம் I" },
  { value: "div2", label: "Revenue Division II / உட்கோட்டம் II" },
  { value: "div3", label: "Revenue Division III / உட்கோட்டம் III" },
];

export const STATUS_OPTIONS = [
  { value: "pending", label: "Pending / நிலுவையில்", color: "bg-gov-orange" },
  { value: "in_progress", label: "In Progress / நடவடிக்கையில்", color: "bg-primary" },
  { value: "resolved", label: "Resolved / தீர்க்கப்பட்டது", color: "bg-gov-green" },
  { value: "closed", label: "Closed / மூடப்பட்டது", color: "bg-muted-foreground" },
];

export interface Grievance {
  id: string;
  department: string;
  grievanceType: string;
  subType: string;
  localBodyType: string;
  taluk: string;
  subject: string;
  description: string;
  status: "pending" | "in_progress" | "resolved" | "closed";
  submittedAt: string;
  updatedAt: string;
  attachmentName?: string;
}

export const MOCK_GRIEVANCES: Grievance[] = [
  {
    id: "GRV-2026-00001",
    department: "municipal",
    grievanceType: "water",
    subType: "no_supply",
    localBodyType: "corporation",
    taluk: "chennai_north",
    subject: "No water supply for 3 days",
    description: "Our area has not received water supply for 3 consecutive days.",
    status: "in_progress",
    submittedAt: "2026-02-10",
    updatedAt: "2026-02-11",
  },
  {
    id: "GRV-2026-00002",
    department: "highways",
    grievanceType: "infrastructure",
    subType: "road_repair",
    localBodyType: "municipality",
    taluk: "coimbatore_north",
    subject: "Pothole on main road",
    description: "Large pothole causing accidents on the main road near bus stand.",
    status: "pending",
    submittedAt: "2026-02-09",
    updatedAt: "2026-02-09",
  },
  {
    id: "GRV-2026-00003",
    department: "education",
    grievanceType: "service_delay",
    subType: "certificate",
    localBodyType: "town_panchayat",
    taluk: "madurai_south",
    subject: "Transfer certificate not issued",
    description: "School has not issued transfer certificate despite multiple requests.",
    status: "resolved",
    submittedAt: "2026-02-05",
    updatedAt: "2026-02-12",
  },
  {
    id: "GRV-2026-00004",
    department: "energy",
    grievanceType: "other",
    subType: "general",
    localBodyType: "village_panchayat",
    taluk: "salem",
    subject: "Frequent power cuts",
    description: "Village experiencing power cuts lasting 4+ hours daily.",
    status: "pending",
    submittedAt: "2026-02-11",
    updatedAt: "2026-02-11",
  },
  {
    id: "GRV-2026-00005",
    department: "health",
    grievanceType: "welfare",
    subType: "general",
    localBodyType: "corporation",
    taluk: "trichy",
    subject: "PHC not functioning properly",
    description: "Primary Health Centre lacks basic medicines and staff.",
    status: "closed",
    submittedAt: "2026-01-28",
    updatedAt: "2026-02-08",
  },
];

export function generateGrievanceId(): string {
  const num = Math.floor(Math.random() * 99999) + 1;
  return `GRV-2026-${String(num).padStart(5, "0")}`;
}

export function getDepartmentLabel(value: string): string {
  const dept = DEPARTMENTS.find((d) => d.value === value);
  return dept ? dept.label.split(" / ")[0] : value;
}

export function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "pending": return "bg-gov-orange/15 text-gov-orange border-gov-orange/30";
    case "in_progress": return "bg-primary/15 text-primary border-primary/30";
    case "resolved": return "bg-gov-green/15 text-gov-green border-gov-green/30";
    case "closed": return "bg-muted text-muted-foreground border-border";
    default: return "bg-muted text-muted-foreground border-border";
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "pending": return "Pending / நிலுவையில்";
    case "in_progress": return "In Progress / நடவடிக்கையில்";
    case "resolved": return "Resolved / தீர்க்கப்பட்டது";
    case "closed": return "Closed / மூடப்பட்டது";
    default: return status;
  }
}
