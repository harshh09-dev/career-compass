
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Building2, MapPin, Calendar, ArrowUpRight, Filter, TrendingUp } from "lucide-react";
import { useState } from "react";


type Stage = "applied" | "screen" | "interview" | "offer" | "rejected";

const stageLabel: Record<Stage, string> = {
  applied: "Applied",
  screen: "Recruiter Screen",
  interview: "Interview",
  offer: "Offer",
  rejected: "Closed",
};

const apps: { co: string; role: string; loc: string; ctc: string; date: string; stage: Stage; round?: string }[] = [
  { co: "Razorpay", role: "SDR — Outbound", loc: "Bangalore", ctc: "₹8.5L", date: "12 Aug", stage: "interview", round: "Round 2 · Hiring manager" },
  { co: "Postman", role: "Account Executive", loc: "Bangalore", ctc: "₹9.2L", date: "10 Aug", stage: "interview", round: "Round 2 · Sales VP" },
  { co: "Freshworks", role: "Inside Sales", loc: "Chennai", ctc: "₹7.0L", date: "08 Aug", stage: "screen" },
  { co: "Zluri", role: "BDR", loc: "Remote", ctc: "₹6.8L", date: "06 Aug", stage: "offer" },
  { co: "Chargebee", role: "Customer Success Associate", loc: "Chennai", ctc: "₹7.5L", date: "04 Aug", stage: "applied" },
  { co: "Atlan", role: "SDR — APAC", loc: "Remote", ctc: "₹8.0L", date: "02 Aug", stage: "applied" },
  { co: "BrowserStack", role: "Inside Sales Rep", loc: "Mumbai", ctc: "₹7.2L", date: "31 Jul", stage: "rejected" },
];

const stages: Stage[] = ["applied", "screen", "interview", "offer", "rejected"];

function JobsPage() {
  const [active, setActive] = useState<Stage | "all">("all");
  const list = active === "all" ? apps : apps.filter((a) => a.stage === active);

  const counts = stages.reduce((acc, s) => ({ ...acc, [s]: apps.filter((a) => a.stage === s).length }), {} as Record<Stage, number>);

  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Pipeline</div>
            <h1 className="mt-3 font-display text-display-md text-ink">Job Applications</h1>
            <p className="mt-2 text-sm text-muted-foreground">23 active applications · 5 in interview stage · response rate 41%.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-[14px] bg-ink px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-ink/90">
            <ArrowUpRight className="h-4 w-4" /> Add application
          </button>
        </div>
      </Reveal>

      {/* Pipeline funnel */}
      <RevealGroup className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stages.map((s) => (
          <RevealItem key={s}>
            <button
              onClick={() => setActive(active === s ? "all" : s)}
              className={`w-full rounded-2xl border p-5 text-left transition-all ${
                active === s ? "border-ink bg-ink text-primary-foreground" : "border-[oklch(0_0_0/0.06)] bg-surface hover:-translate-y-0.5 hover:shadow-soft"
              }`}
            >
              <div className={`text-[10px] uppercase tracking-[0.18em] ${active === s ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{stageLabel[s]}</div>
              <div className="mt-3 font-display text-3xl">{counts[s] ?? 0}</div>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Toolbar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-muted-foreground">{list.length} {list.length === 1 ? "result" : "results"}</div>
        <button className="inline-flex items-center gap-2 rounded-[12px] border border-border bg-surface px-3 py-2 text-xs hover:bg-muted">
          <Filter className="h-3.5 w-3.5" /> Filter
        </button>
      </div>

      {/* Applications table */}
      <Reveal delay={0.05}>
        <div className="mt-3 overflow-hidden rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface shadow-soft">
          <div className="hidden grid-cols-12 gap-4 border-b border-[oklch(0_0_0/0.06)] px-6 py-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:grid">
            <div className="col-span-4">Company / Role</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2">CTC</div>
            <div className="col-span-2">Stage</div>
            <div className="col-span-2 text-right">Last update</div>
          </div>
          <ul className="divide-y divide-[oklch(0_0_0/0.06)]">
            {list.map((a) => (
              <li key={a.co + a.role} className="grid grid-cols-1 items-center gap-3 px-6 py-4 sm:grid-cols-12 sm:gap-4">
                <div className="col-span-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-ink">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-medium text-ink">{a.co}</div>
                    <div className="truncate text-xs text-muted-foreground">{a.role}</div>
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {a.loc}</div>
                <div className="col-span-2 font-display text-sm text-ink">{a.ctc}</div>
                <div className="col-span-2">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${
                    a.stage === "offer" ? "bg-success/15 text-success" :
                    a.stage === "interview" ? "bg-gold/15 text-ink" :
                    a.stage === "rejected" ? "bg-destructive/10 text-destructive" :
                    "bg-muted text-muted-foreground"
                  }`}>{stageLabel[a.stage]}</span>
                  {a.round && <div className="mt-1 text-[11px] text-muted-foreground">{a.round}</div>}
                </div>
                <div className="col-span-2 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" /> {a.date}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 flex items-center gap-3 rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-6">
          <TrendingUp className="h-5 w-5 text-gold" />
          <div className="text-sm text-muted-foreground">
            Your interview-to-offer rate is <span className="font-medium text-ink">2.8×</span> the cohort median. Keep going.
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default JobsPage;
