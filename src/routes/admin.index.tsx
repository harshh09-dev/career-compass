import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Users, IndianRupee, Briefcase, CheckCircle2, AlertOctagon, ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Overview — S.Nehra" }] }),
  component: AdminOverview,
});

function AdminOverview() {
  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="eyebrow">Operations</div>
        <h1 className="mt-3 font-display text-display-md text-ink">Cohort 14 — Operating snapshot</h1>
        <p className="mt-2 text-sm text-muted-foreground">Updated 2 minutes ago · 96 active candidates · 18 mentors live</p>
      </Reveal>

      <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "MRR", v: "₹42.8L", d: "+18.4% vs last cohort", icon: IndianRupee },
          { l: "Active candidates", v: "96", d: "of 120 enrolled", icon: Users },
          { l: "Offers issued", v: "37", d: "Avg CTC ₹18.2 LPA", icon: Briefcase },
          { l: "Conversion", v: "61%", d: "Apply → Offer", icon: TrendingUp },
        ].map((c) => (
          <RevealItem key={c.l} className="rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface p-5 shadow-soft">
            <div className="flex items-start justify-between">
              <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{c.l}</div>
              <c.icon className="h-4 w-4 text-gold" />
            </div>
            <div className="mt-3 font-display text-3xl text-ink">{c.v}</div>
            <div className="mt-1 text-xs text-muted-foreground">{c.d}</div>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Reveal>
          <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-7 shadow-soft">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-lg text-ink">Pipeline by stage</h3>
              <button className="text-xs text-muted-foreground hover:text-ink">Last 30 days ↓</button>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { s: "Sourced", n: 412, pct: 100 },
                { s: "Application reviewed", n: 287, pct: 70 },
                { s: "Screen passed", n: 184, pct: 45 },
                { s: "On-site / Final", n: 96, pct: 23 },
                { s: "Offer issued", n: 37, pct: 9 },
                { s: "Joined", n: 28, pct: 7 },
              ].map((r) => (
                <div key={r.s}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-foreground">{r.s}</span>
                    <span className="font-mono text-muted-foreground">{r.n}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-gradient-to-r from-ink to-gold" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-ink p-7 text-primary-foreground shadow-soft">
            <div className="eyebrow text-gold">Live activity</div>
            <ul className="mt-5 space-y-4 text-sm">
              {[
                { c: "CheckCircle2", t: "Aarav offer · Razorpay · ₹22 LPA", time: "2m" },
                { c: "AlertOctagon", t: "Payment failed · INV-2025-019", time: "9m" },
                { c: "ArrowUpRight", t: "Meera advanced to Final · Atlassian", time: "21m" },
                { c: "CheckCircle2", t: "Rohan completed Day 8 sheet", time: "44m" },
                { c: "ArrowUpRight", t: "12 new applications · YC W26", time: "1h" },
              ].map((a, i) => {
                const Icon = a.c === "CheckCircle2" ? CheckCircle2 : a.c === "AlertOctagon" ? AlertOctagon : ArrowUpRight;
                return (
                  <li key={i} className="flex items-start gap-3">
                    <Icon className={`mt-0.5 h-4 w-4 ${a.c === "AlertOctagon" ? "text-destructive" : "text-gold"}`} />
                    <div className="flex-1">
                      <div>{a.t}</div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-primary-foreground/40">{a.time} ago</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
