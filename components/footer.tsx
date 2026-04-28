import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">KhushAI</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              AI-powered legal research assistant for Indian law. Not a substitute for professional legal advice.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/chat" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/acts" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Bare Acts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-xs text-muted-foreground">Privacy Policy</span>
              </li>
              <li>
                <span className="text-xs text-muted-foreground">Terms of Service</span>
              </li>
              <li>
                <span className="text-xs text-muted-foreground">Disclaimer</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Data</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Legal data sourced from India Code (indiacode.nic.in), Ministry of Law & Justice, Government of India.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} KhushAI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 text-center md:text-right max-w-md">
            This platform provides legal information for research purposes only. It does not constitute legal advice and should not be relied upon as such.
          </p>
        </div>
      </div>
    </footer>
  );
}