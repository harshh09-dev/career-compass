
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Calendar, Video, Star, MessagesSquare, ArrowUpRight, Clock } from "lucide-react";


const upcoming = [
  { co: "Postman", role: "AE — Round 2", when: "Thu, 14 Aug · 11:00 AM", mentor: "Priya M.", type: "real" },
  { co: "Mock — Behavioral", role: "STAR drill", when: "Fri, 15 Aug · 4:00 PM", mentor: "Rahul K.", type: "mock" },
];

const past = [
  { co: "Razorpay", role: "SDR Screen", when: "12 Aug", score: 8.4, notes: "Strong discovery, weak qualification." },
  { co: "Mock — Cold call", role: "Outbound drill", when: "10 Aug", score: 7.6, notes: "Pacing improved. Tighten opener." },
  { co: "Freshworks", role: "Inside Sales", when: "08 Aug", score: 8.1, notes: "Great rapport, verify next steps." },
  { co: "Mock — Objection", role: "Pricing pushback", when: "05 Aug", score: 6.9, notes: "Don't concede on first objection." },
];

function InterviewsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Interview Lab</div>
            <h1 className="mt-3 font-display text-display-md text-ink">Mock & Live Interviews</h1>
            <p className="mt-2 text-sm text-muted-foreground">9 mock sessions completed · avg score 8.2/10 · next live: Postman, 14 Aug.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-[14px] bg-ink px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-ink/90">
            <ArrowUpRight className="h-4 w-4" /> Schedule mock
          </button>
        </div>
      </Reveal>

      {/* Score strip */}
      <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-4">
        {[
          { l: "Avg score", v: "8.2", s: "/ 10" },
          { l: "Mocks done", v: "9", s: "this cohort" },
          { l: "Live rounds", v: "5", s: "across 3 cos" },
          { l: "Conversion", v: "60%", s: "screen → next" },
        ].map((s) => (
          <RevealItem key={s.l} className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-6 shadow-soft">
            <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{s.l}</div>
            <div className="mt-3"><span className="font-display text-4xl text-ink">{s.v}</span><span className="ml-1 text-xs text-muted-foreground">{s.s}</span></div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Upcoming */}
      <Reveal delay={0.05}>
        <h2 className="mt-12 font-display text-2xl text-ink">Upcoming</h2>
      </Reveal>
      <RevealGroup className="mt-4 grid gap-4 lg:grid-cols-2">
        {upcoming.map((u) => (
          <RevealItem key={u.co + u.when} className="flex items-start justify-between gap-4 rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-6 shadow-soft">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] ${u.type === "real" ? "bg-gold/15 text-ink" : "bg-muted text-muted-foreground"}`}>
                  {u.type === "real" ? "Live" : "Mock"}
                </span>
                <h3 className="truncate font-display text-lg text-ink">{u.co}</h3>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{u.role}</div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {u.when}</span>
                <span className="inline-flex items-center gap-1.5"><MessagesSquare className="h-3.5 w-3.5" /> {u.mentor}</span>
              </div>
            </div>
            <button className="inline-flex shrink-0 items-center gap-1.5 rounded-[12px] bg-ink px-3.5 py-2 text-xs text-primary-foreground hover:bg-ink/90">
              <Video className="h-3.5 w-3.5" /> Join
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Past */}
      <Reveal delay={0.05}>
        <h2 className="mt-12 font-display text-2xl text-ink">Past sessions</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-4 overflow-hidden rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface shadow-soft">
          <ul className="divide-y divide-[oklch(0_0_0/0.06)]">
            {past.map((p) => (
              <li key={p.co + p.when} className="flex flex-wrap items-center gap-4 px-6 py-5">
                <div className="min-w-[180px] flex-1">
                  <div className="font-medium text-ink">{p.co}</div>
                  <div className="text-xs text-muted-foreground">{p.role}</div>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {p.when}
                </div>
                <div className="hidden max-w-md flex-1 text-xs text-muted-foreground sm:block">{p.notes}</div>
                <div className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 font-display text-sm text-ink">
                  <Star className="h-3.5 w-3.5 text-gold" /> {p.score}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

export default InterviewsPage;
