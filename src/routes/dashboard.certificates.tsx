
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Award, Download, Lock, ExternalLink } from "lucide-react";


const certs = [
  { t: "Modern Sales Foundations", id: "SN-2024-001432", date: "Jul 2024", status: "issued" },
  { t: "Outbound Email Playbook", id: "SN-2024-001512", date: "Jul 2024", status: "issued" },
  { t: "Discovery Call Frameworks", id: "—", date: "Pending", status: "in_progress" },
  { t: "Account Executive Mastery", id: "—", date: "Locked", status: "locked" },
  { t: "Capstone Certification", id: "—", date: "Locked", status: "locked" },
];

function CertsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="eyebrow">Certifications</div>
        <h1 className="mt-3 font-display text-display-md text-ink">Verifiable credentials</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">Each certificate is signed, ID-verified, and shareable on LinkedIn. Recruiters can verify directly from the public link.</p>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c) => (
          <RevealItem
            key={c.t}
            className={`group relative overflow-hidden rounded-[24px] border bg-surface p-6 shadow-soft transition-all ${
              c.status === "locked" ? "border-dashed border-border opacity-60" : "border-[oklch(0_0_0/0.06)] hover:-translate-y-0.5 hover:shadow-elevated"
            }`}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-gold-muted to-transparent" />
            <div className="flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.status === "issued" ? "bg-ink text-gold" : "bg-muted text-muted-foreground"}`}>
                {c.status === "locked" ? <Lock className="h-5 w-5" /> : <Award className="h-5 w-5" />}
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${
                c.status === "issued" ? "bg-success/15 text-success" :
                c.status === "in_progress" ? "bg-gold/15 text-ink" : "bg-muted text-muted-foreground"
              }`}>{c.status === "issued" ? "Issued" : c.status === "in_progress" ? "Pending" : "Locked"}</span>
            </div>
            <h3 className="mt-6 font-display text-xl leading-tight text-ink">{c.t}</h3>
            <div className="mt-2 text-xs text-muted-foreground">{c.date}</div>
            {c.status === "issued" && (
              <div className="mt-5 flex items-center justify-between border-t border-[oklch(0_0_0/0.06)] pt-4">
                <div className="font-mono text-[11px] text-muted-foreground">{c.id}</div>
                <div className="flex items-center gap-3">
                  <button title="View" className="text-ink hover:text-gold"><ExternalLink className="h-4 w-4" /></button>
                  <button title="Download" className="text-ink hover:text-gold"><Download className="h-4 w-4" /></button>
                </div>
              </div>
            )}
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

export default CertsPage;
