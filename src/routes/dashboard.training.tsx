
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { CheckCircle2, Lock, PlayCircle, Clock, BookOpen, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";


const tracks = [
  { id: "core", label: "Core Curriculum", count: 14, done: 9 },
  { id: "sales", label: "Sales Specialization", count: 8, done: 5 },
  { id: "interview", label: "Interview Lab", count: 6, done: 2 },
];

const modules = [
  { n: 1, t: "Modern Sales Foundations", h: "4h 20m", lessons: 12, status: "done", track: "core" },
  { n: 2, t: "Outbound Email Playbook", h: "3h 10m", lessons: 9, status: "done", track: "sales" },
  { n: 3, t: "Discovery Call Frameworks", h: "5h 05m", lessons: 14, status: "in_progress", progress: 60, track: "sales" },
  { n: 4, t: "Objection Handling Drills", h: "2h 40m", lessons: 8, status: "in_progress", progress: 25, track: "interview" },
  { n: 5, t: "Account Executive Deep Dive", h: "6h 15m", lessons: 18, status: "locked", track: "core" },
  { n: 6, t: "Negotiation & Closing", h: "4h 50m", lessons: 11, status: "locked", track: "sales" },
  { n: 7, t: "Behavioral Interview Mastery", h: "3h 30m", lessons: 10, status: "locked", track: "interview" },
  { n: 8, t: "Capstone — Live Sales Pitch", h: "8h 00m", lessons: 1, status: "locked", track: "core" },
];

function TrainingPage() {
  const [filter, setFilter] = useState<string>("all");
  const visible = filter === "all" ? modules : modules.filter((m) => m.track === filter);

  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Training</div>
            <h1 className="mt-3 font-display text-display-md text-ink">Curriculum</h1>
            <p className="mt-2 text-sm text-muted-foreground">28 modules · 84 hours · cohort-paced with weekly mentor reviews.</p>
          </div>
          <div className="rounded-[14px] border border-border bg-surface px-4 py-2.5 text-xs">
            <span className="text-muted-foreground">Overall</span>{" "}
            <span className="font-display text-base text-ink">57%</span>{" "}
            <span className="text-muted-foreground">complete</span>
          </div>
        </div>
      </Reveal>

      {/* Track summary */}
      <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-3">
        {tracks.map((t) => (
          <RevealItem key={t.id} className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-6 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{t.label}</div>
                <div className="mt-3 font-display text-3xl text-ink">{t.done}<span className="text-muted-foreground">/{t.count}</span></div>
              </div>
              <BookOpen className="h-4 w-4 text-gold" />
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-ink" style={{ width: `${(t.done / t.count) * 100}%` }} />
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Filters */}
      <div className="mt-10 flex flex-wrap items-center gap-2">
        {[{ id: "all", label: "All modules" }, ...tracks.map((t) => ({ id: t.id, label: t.label }))].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.14em] transition-colors ${
              filter === f.id ? "bg-ink text-primary-foreground" : "border border-border bg-surface text-muted-foreground hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Modules grid */}
      <RevealGroup className="mt-6 grid gap-4 lg:grid-cols-2">
        {visible.map((m) => (
          <RevealItem
            key={m.n}
            className={`group flex items-start gap-5 rounded-[24px] border bg-surface p-6 shadow-soft transition-all ${
              m.status === "locked" ? "border-dashed border-border opacity-60" : "border-[oklch(0_0_0/0.06)] hover:-translate-y-0.5 hover:shadow-elevated"
            }`}
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              m.status === "done" ? "bg-ink text-gold" : m.status === "in_progress" ? "bg-gold/15 text-ink" : "bg-muted text-muted-foreground"
            }`}>
              {m.status === "done" ? <CheckCircle2 className="h-5 w-5" /> : m.status === "locked" ? <Lock className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-xs text-muted-foreground">M{String(m.n).padStart(2, "0")}</span>
                <h3 className="truncate font-display text-lg text-ink">{m.t}</h3>
              </div>
              <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {m.h}</span>
                <span>{m.lessons} lessons</span>
              </div>
              {m.status === "in_progress" && (
                <div className="mt-4">
                  <div className="h-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${m.progress}%` }} />
                  </div>
                  <div className="mt-1.5 text-[11px] text-muted-foreground">{m.progress}% complete</div>
                </div>
              )}
              <button
                disabled={m.status === "locked"}
                className={`mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.14em] ${
                  m.status === "locked" ? "text-muted-foreground" : "text-ink"
                }`}
              >
                {m.status === "done" ? "Review" : m.status === "locked" ? "Unlocks week 9" : "Continue"}
                {m.status !== "locked" && <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />}
              </button>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Mentor block */}
      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-ink p-8 text-primary-foreground">
          <div className="flex items-center gap-4">
            <Sparkles className="h-5 w-5 text-gold" />
            <div>
              <div className="font-display text-xl">Your mentor reviews on Friday</div>
              <div className="mt-1 text-sm text-primary-foreground/60">Submit your discovery-call recording before 4pm.</div>
            </div>
          </div>
          <button className="rounded-[14px] bg-gold px-5 py-2.5 text-sm font-medium text-ink hover:bg-gold-muted">Upload recording</button>
        </div>
      </Reveal>
    </div>
  );
}

export function Stub({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <h1 className="font-display text-display-md text-ink">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      </Reveal>
    </div>
  );
}

export default TrainingPage;
