
import { useState, useMemo } from "react";
import { Search, Download, Filter } from "lucide-react";
import { Reveal } from "@/components/reveal";


const candidates = [
  { id: "C-1041", name: "Aarav Kapoor", track: "Sales", stage: "Offer", ctc: "₹22 LPA", company: "Razorpay", payment: "Paid", risk: "Low" },
  { id: "C-1042", name: "Meera Iyer", track: "Product", stage: "Final", ctc: "—", company: "Atlassian", payment: "Paid", risk: "Low" },
  { id: "C-1043", name: "Rohan Shah", track: "Engineering", stage: "Screen", ctc: "—", company: "Multiple", payment: "Due", risk: "Medium" },
  { id: "C-1044", name: "Sneha Reddy", track: "Sales", stage: "Joined", ctc: "₹18 LPA", company: "CRED", payment: "Paid", risk: "Low" },
  { id: "C-1045", name: "Karan Singh", track: "Engineering", stage: "Offer", ctc: "₹26 LPA", company: "Stripe", payment: "Paid", risk: "Low" },
  { id: "C-1046", name: "Priya Nair", track: "Product", stage: "Application", ctc: "—", company: "—", payment: "Due", risk: "High" },
  { id: "C-1047", name: "Arjun Mehta", track: "Sales", stage: "Final", ctc: "—", company: "Notion", payment: "Paid", risk: "Low" },
  { id: "C-1048", name: "Ishita Bose", track: "Engineering", stage: "Screen", ctc: "—", company: "Linear", payment: "Pending", risk: "Medium" },
];

const stagePill: Record<string, string> = {
  Application: "bg-muted text-foreground",
  Screen: "bg-gold/15 text-gold",
  Final: "bg-blue-50 text-blue-700",
  Offer: "bg-success/10 text-success",
  Joined: "bg-ink text-gold",
};

function CandidatesPage() {
  const [q, setQ] = useState("");
  const [track, setTrack] = useState<string>("");
  const [stage, setStage] = useState<string>("");

  const rows = useMemo(() => candidates.filter(c =>
    (!q || c.name.toLowerCase().includes(q.toLowerCase()) || c.id.includes(q)) &&
    (!track || c.track === track) && (!stage || c.stage === stage)
  ), [q, track, stage]);

  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Roster</div>
            <h1 className="mt-3 font-display text-display-md text-ink">Candidates</h1>
            <p className="mt-2 text-sm text-muted-foreground">{rows.length} of {candidates.length} shown</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-[12px] border border-border bg-surface px-4 py-2.5 text-sm hover:bg-muted">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </Reveal>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or ID…" className="w-full rounded-[12px] border border-border bg-surface py-2.5 pl-9 pr-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" />
        </div>
        <select value={track} onChange={(e) => setTrack(e.target.value)} className="rounded-[12px] border border-border bg-surface px-3 py-2.5 text-sm">
          <option value="">All tracks</option><option>Sales</option><option>Product</option><option>Engineering</option>
        </select>
        <select value={stage} onChange={(e) => setStage(e.target.value)} className="rounded-[12px] border border-border bg-surface px-3 py-2.5 text-sm">
          <option value="">All stages</option><option>Application</option><option>Screen</option><option>Final</option><option>Offer</option><option>Joined</option>
        </select>
        <button className="inline-flex items-center gap-2 rounded-[12px] border border-border bg-surface px-3 py-2.5 text-sm"><Filter className="h-3.5 w-3.5" /> More</button>
      </div>

      <Reveal>
        <div className="mt-6 overflow-hidden rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-background text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <tr><th className="px-6 py-3 text-left">ID</th><th className="px-6 py-3 text-left">Candidate</th><th className="px-6 py-3 text-left">Track</th><th className="px-6 py-3 text-center">Stage</th><th className="px-6 py-3 text-left">Company</th><th className="px-6 py-3 text-right">CTC</th><th className="px-6 py-3 text-center">Payment</th><th className="px-6 py-3 text-center">Risk</th></tr>
            </thead>
            <tbody className="divide-y divide-[oklch(0_0_0/0.06)]">
              {rows.map(c => (
                <tr key={c.id} className="hover:bg-background/60">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{c.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-display text-[11px] text-gold">{c.name.split(" ").map(s => s[0]).join("")}</div>
                      <div className="font-medium text-ink">{c.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground">{c.track}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] ${stagePill[c.stage]}`}>{c.stage}</span>
                  </td>
                  <td className="px-6 py-4 text-foreground">{c.company}</td>
                  <td className="px-6 py-4 text-right font-display text-ink">{c.ctc}</td>
                  <td className="px-6 py-4 text-center text-xs">
                    <span className={`rounded-full px-2 py-0.5 ${c.payment === "Paid" ? "bg-success/10 text-success" : c.payment === "Pending" ? "bg-gold/15 text-gold" : "bg-destructive/10 text-destructive"}`}>{c.payment}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs ${c.risk === "Low" ? "text-success" : c.risk === "Medium" ? "text-gold" : "text-destructive"}`}>● {c.risk}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  );
}

export default CandidatesPage;
