import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileEdit, Save, Plus, Trash2, GripVertical } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/admin/cms")({
  head: () => ({ meta: [{ title: "CMS — Admin" }] }),
  component: CMSPage,
});

type Tab = "landing" | "faq" | "testimonials" | "pricing";

function CMSPage() {
  const [tab, setTab] = useState<Tab>("landing");
  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="eyebrow">Content management</div>
        <h1 className="mt-3 font-display text-display-md text-ink">CMS</h1>
        <p className="mt-2 text-sm text-muted-foreground">Edit live landing copy, FAQ, testimonials and pricing without redeploying.</p>
      </Reveal>

      <div className="mt-8 flex items-center gap-1 border-b border-[oklch(0_0_0/0.06)]">
        {([
          { k: "landing", l: "Landing" },
          { k: "faq", l: "FAQ" },
          { k: "testimonials", l: "Testimonials" },
          { k: "pricing", l: "Pricing" },
        ] as const).map(t => {
          const active = tab === t.k;
          return (
            <button key={t.k} onClick={() => setTab(t.k as Tab)} className={`-mb-px border-b-2 px-4 py-3 text-sm transition-colors ${active ? "border-ink text-ink" : "border-transparent text-muted-foreground hover:text-ink"}`}>
              {t.l}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {tab === "landing" && <LandingEditor />}
        {tab === "faq" && <FAQEditor />}
        {tab === "testimonials" && <TestimonialEditor />}
        {tab === "pricing" && <PricingEditor />}
      </div>
    </div>
  );
}

function Field({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</label>
      {multiline ? (
        <textarea defaultValue={value} rows={3} className="mt-2 w-full rounded-[12px] border border-border bg-background p-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" />
      ) : (
        <input defaultValue={value} className="mt-2 w-full rounded-[12px] border border-border bg-background p-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" />
      )}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base text-ink">{title}</h3>
        <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-ink px-3 py-1.5 text-xs text-primary-foreground hover:bg-ink/90"><Save className="h-3 w-3" /> Save</button>
      </div>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function LandingEditor() {
  return (
    <div className="space-y-6">
      <SectionCard title="Hero">
        <Field label="Eyebrow" value="Cohort 14 · Applications closing 28 Aug" />
        <Field label="Headline" value="Placement, engineered." multiline />
        <Field label="Sub-headline" value="A premium career operating system for ambitious operators, engineers and product builders." multiline />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Primary CTA" value="Apply to Cohort 14" />
          <Field label="Secondary CTA" value="See the process" />
        </div>
      </SectionCard>

      <SectionCard title="Announcement bar">
        <Field label="Text" value="Cohort 14 · 28 seats remaining · Average CTC ₹18.2 LPA" />
      </SectionCard>

      <SectionCard title="By the numbers">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Stat 1" value="93% placement rate" />
          <Field label="Stat 2" value="₹18.2 LPA avg CTC" />
          <Field label="Stat 3" value="6:1 mentor ratio" />
        </div>
      </SectionCard>
    </div>
  );
}

function FAQEditor() {
  const [items, setItems] = useState([
    { q: "Who is this program for?", a: "Operators, builders, and engineers in their first 0–4 years aiming for category-defining companies." },
    { q: "How does the ISA work?", a: "₹29,500 enrollment + 12% of CTC for 24 months, capped, post-placement only." },
    { q: "What is the time commitment?", a: "12 weeks · ~20h/week of live sessions, sheet practice, and mock loops." },
  ]);
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-[16px] border border-[oklch(0_0_0/0.06)] bg-surface p-5 shadow-soft">
          <div className="flex items-start gap-3">
            <GripVertical className="mt-2 h-4 w-4 cursor-grab text-muted-foreground" />
            <div className="flex-1 space-y-3">
              <input defaultValue={it.q} className="w-full rounded-[10px] border border-border bg-background p-2.5 text-sm font-medium" />
              <textarea defaultValue={it.a} rows={2} className="w-full rounded-[10px] border border-border bg-background p-2.5 text-sm text-muted-foreground" />
            </div>
            <button onClick={() => setItems(items.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        </div>
      ))}
      <button onClick={() => setItems([...items, { q: "New question", a: "Answer…" }])} className="inline-flex items-center gap-2 rounded-[12px] border border-dashed border-border px-4 py-2.5 text-sm hover:bg-muted"><Plus className="h-4 w-4" /> Add FAQ item</button>
    </div>
  );
}

function TestimonialEditor() {
  const items = [
    { n: "Aarav Kapoor", r: "Razorpay · GTM", q: "Closed at ₹22 LPA in week 9. The mentor pairing was the unlock." },
    { n: "Meera Iyer", r: "Atlassian · APM", q: "I didn't believe placement programs worked. Then I got 4 final-round offers." },
    { n: "Karan Singh", r: "Stripe · SDE-2", q: "DSA sheet + mock loops were brutal. They needed to be." },
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((t, i) => (
        <div key={i} className="rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface p-6 shadow-soft">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-sm text-gold">{t.n.split(" ").map(s => s[0]).join("")}</div>
              <div>
                <input defaultValue={t.n} className="w-full rounded-md border border-transparent bg-transparent px-1 text-sm font-medium hover:border-border focus:border-gold focus:outline-none" />
                <input defaultValue={t.r} className="mt-0.5 w-full rounded-md border border-transparent bg-transparent px-1 text-xs text-muted-foreground hover:border-border focus:border-gold focus:outline-none" />
              </div>
            </div>
            <button className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
          <textarea defaultValue={t.q} rows={3} className="mt-4 w-full rounded-[10px] border border-border bg-background p-3 text-sm" />
        </div>
      ))}
      <button className="rounded-[20px] border-2 border-dashed border-border p-6 text-sm text-muted-foreground hover:border-ink hover:text-ink"><Plus className="mx-auto mb-2 h-5 w-5" /> Add testimonial</button>
    </div>
  );
}

function PricingEditor() {
  const tiers = [
    { name: "Founders", price: "₹29,500 + ISA", features: ["12-week cohort", "Mentor pairing", "Mock loops", "ISA 12% × 24m"] },
    { name: "Accelerator", price: "₹1,49,000 upfront", features: ["Everything in Founders", "Priority placement", "1:1 strategy", "No ISA"] },
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {tiers.map((t, i) => (
        <div key={i} className="rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <input defaultValue={t.name} className="font-display text-lg text-ink bg-transparent border-b border-transparent hover:border-border focus:border-gold focus:outline-none" />
            <button className="inline-flex items-center gap-1.5 rounded-[10px] bg-ink px-3 py-1.5 text-xs text-primary-foreground"><Save className="h-3 w-3" /> Save</button>
          </div>
          <input defaultValue={t.price} className="mt-3 w-full rounded-[10px] border border-border bg-background p-2.5 font-display text-2xl text-ink" />
          <ul className="mt-4 space-y-2">
            {t.features.map((f, j) => (
              <li key={j} className="flex items-center gap-2">
                <FileEdit className="h-3 w-3 text-gold" />
                <input defaultValue={f} className="flex-1 rounded-md border border-transparent bg-transparent px-1 text-sm hover:border-border focus:border-gold focus:outline-none" />
              </li>
            ))}
          </ul>
          <button className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-ink"><Plus className="h-3 w-3" /> Add feature</button>
        </div>
      ))}
    </div>
  );
}
