import { createFileRoute } from "@tanstack/react-router";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { FileText, CheckCircle2, AlertCircle, Download, Sparkles, Eye } from "lucide-react";

export const Route = createFileRoute("/dashboard/resume")({
  head: () => ({ meta: [{ title: "Resume Builder — S.Nehra" }] }),
  component: ResumePage,
});

const sections = [
  { l: "Header & contact", done: true, score: 100 },
  { l: "Professional summary", done: true, score: 95 },
  { l: "Experience", done: true, score: 88 },
  { l: "Skills & tools", done: true, score: 92 },
  { l: "Projects & impact", done: false, score: 60 },
  { l: "Education & certifications", done: true, score: 100 },
];

const reviews = [
  { tag: "ATS", icon: CheckCircle2, ok: true, t: "Passes Workday + Greenhouse parsers." },
  { tag: "Keywords", icon: AlertCircle, ok: false, t: "Add 'pipeline generation' and 'discovery calls' (Postman JD)." },
  { tag: "Length", icon: CheckCircle2, ok: true, t: "Single page · within 1-page recruiter convention." },
  { tag: "Quantification", icon: AlertCircle, ok: false, t: "3 of 6 bullets lack metrics. Add CTC, % growth, or counts." },
];

function ResumePage() {
  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Resume</div>
            <h1 className="mt-3 font-display text-display-md text-ink">Resume Builder</h1>
            <p className="mt-2 text-sm text-muted-foreground">ATS-tuned, mentor-reviewed, exportable to PDF or shareable link.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-[14px] border border-border bg-surface px-4 py-2.5 text-sm hover:bg-muted">
              <Eye className="h-4 w-4" /> Preview
            </button>
            <button className="inline-flex items-center gap-2 rounded-[14px] bg-ink px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-ink/90">
              <Download className="h-4 w-4" /> Export PDF
            </button>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Sections */}
        <Reveal>
          <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-ink">Sections</h2>
              <span className="text-xs text-muted-foreground">5 of 6 complete</span>
            </div>
            <ul className="mt-6 divide-y divide-[oklch(0_0_0/0.06)]">
              {sections.map((s) => (
                <li key={s.l} className="flex items-center gap-4 py-4">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full ${s.done ? "bg-ink text-gold" : "bg-muted text-muted-foreground"}`}>
                    {s.done ? <CheckCircle2 className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-ink">{s.l}</div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${s.done ? "bg-ink" : "bg-gold"}`} style={{ width: `${s.score}%` }} />
                    </div>
                  </div>
                  <button className="text-xs font-medium uppercase tracking-[0.14em] text-ink hover:underline">Edit</button>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Score + AI */}
        <div className="space-y-6">
          <Reveal>
            <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-ink p-8 text-primary-foreground shadow-soft">
              <div className="eyebrow text-primary-foreground/60">ATS Readiness</div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-6xl text-gold">88</span>
                <span className="text-sm text-primary-foreground/60">/ 100</span>
              </div>
              <p className="mt-3 text-sm text-primary-foreground/70">Strong. Two quick fixes will push you past 95.</p>
              <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-gold px-4 py-3 text-sm font-medium text-ink hover:bg-gold-muted">
                <Sparkles className="h-4 w-4" /> Run AI rewrite
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-6 shadow-soft">
              <h3 className="font-display text-lg text-ink">Mentor review</h3>
              <RevealGroup className="mt-4 space-y-3">
                {reviews.map((r) => (
                  <RevealItem key={r.tag} className="flex items-start gap-3 rounded-2xl border border-[oklch(0_0_0/0.06)] bg-background p-4">
                    <r.icon className={`mt-0.5 h-4 w-4 shrink-0 ${r.ok ? "text-success" : "text-gold"}`} />
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{r.tag}</div>
                      <p className="mt-1 text-xs leading-relaxed text-foreground">{r.t}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
