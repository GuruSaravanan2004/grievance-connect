import vijayLogo from "@/assets/vijay-logo.webp";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-3">
            <img src={vijayLogo} alt="TVK Logo" className="h-8 w-8 rounded-full object-cover shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm">Government Grievance Redressal Portal</h3>
              <p className="text-xs text-muted-foreground mt-1">அரசு குறை தீர்வு நுழைவாயில்</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><a href="/submit" className="hover:text-primary transition-colors">Submit Grievance / குறை சமர்ப்பிக்க</a></li>
              <li><a href="/track" className="hover:text-primary transition-colors">Track Status / நிலையை கண்காணிக்க</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us / தொடர்பு கொள்ளுங்கள்</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Legal</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Accessibility Statement</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Copyright © TVK Government Portal 2026. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>English</span>
            <span className="text-border">|</span>
            <span>தமிழ்</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
