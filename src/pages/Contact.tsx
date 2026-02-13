import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <nav className="text-sm text-muted-foreground mb-6">
        <a href="/" className="hover:text-primary">Home</a>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Contact / தொடர்பு</span>
      </nav>

      <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
      <p className="text-muted-foreground mb-8">தொடர்பு கொள்ளுங்கள் - Reach out for assistance</p>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Phone, title: "Phone / தொலைபேசி", detail: "1800-XXX-XXXX", sub: "Toll Free / இலவச அழைப்பு" },
          { icon: Mail, title: "Email / மின்னஞ்சல்", detail: "grievance@tn.gov.in", sub: "Mon-Fri, 9AM-5PM" },
          { icon: MapPin, title: "Address / முகவரி", detail: "Secretariat, Chennai", sub: "Tamil Nadu 600009" },
        ].map((item, i) => (
          <div key={i} className="gov-form-step text-center">
            <div className="h-12 w-12 rounded-full gov-gradient flex items-center justify-center mx-auto mb-3">
              <item.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-sm">{item.title}</h3>
            <p className="font-medium mt-1">{item.detail}</p>
            <p className="text-xs text-muted-foreground">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
