import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/admin/pipeline")({
  head: () => ({ meta: [{ title: "Pipeline — Admin" }] }),
  component: PipelinePage,
});

const columns = [
  { k: "Application", count: 24, items: [
    { n: "Priya Nair", c: "Razorpay", days: 2 },
    { n: "Vikram Joshi", c: "CRED", days: 3 },
    { n: "Tara Bhat", c: "Atlassian", days: 1 },
  ]},
  { k: "Screen", count: 18, items: [
    { n: "Rohan Shah", c: "Stripe", days: 5 },
    { n: "Ishita Bose", c: "Linear", days: 4 },
    { n: "Nikhil Rao", c: "Notion", days: 6 },
  ]},
  { k: "Final", count: 11, items: [
    { n: "Meera Iyer", c: "Atlassian", days: 8 },
    { n: "Arjun Mehta", c: "Notion", days: 7 },
  ]},
  { k: "Offer", count: 6, items: [
    { n: "Aarav Kapoor", c: "Razorpay · ₹22 LPA", days: 12 },
    { n: "Karan Singh", c: "Stripe · ₹26 LPA", days: 14 },
  ]},
  { k: "Joined", count: 4, items: [
    { n: "Sneha Reddy", c: "CRED · ₹18 LPA", days: 22 },
  ]},
];

function PipelinePage() {
  return (
    <div className="mx-auto max-w-[1600px]">
      <Reveal>
        <div className="eyebrow">Hiring funnel</div>
        <h1 className="mt-3 font-display text-display-md text-ink">Placement pipeline</h1>
        <p className="mt-2 text-sm text-muted-foreground">Drag candidates between columns to update stage. Aging highlighted past 7 days.</p>
      </Reveal>

      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        {columns.map((col) => (
          <div key={col.k} className="rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface shadow-soft">
            <div className="flex items-center justify-between border-b border-[oklch(0_0_0/0.06)] px-4 py-3">
              <div className="font-display text-sm text-ink">{col.k}</div>
              <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] text-gold">{col.count}</span>
            </div>
            <div className="space-y-2 p-3">
              {col.items.map((it, i) => (
                <div key={i} className="cursor-grab rounded-[14px] border border-[oklch(0_0_0/0.04)] bg-background p-3 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing">
                  <div className="text-sm font-medium text-ink">{it.n}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{it.c}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`text-[10px] uppercase tracking-[0.12em] ${it.days > 7 ? "text-destructive" : "text-muted-foreground"}`}>{it.days}d in stage</span>
                    <button className="text-[10px] text-ink hover:underline">Open</button>
                  </div>
                </div>
              ))}
              <button className="w-full rounded-[12px] border border-dashed border-border py-2 text-xs text-muted-foreground hover:border-ink hover:text-ink">+ Add candidate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
