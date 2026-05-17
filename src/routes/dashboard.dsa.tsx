import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  Flame, CalendarDays, Users, Bookmark, BookOpen, Youtube, Code2, Search,
  ChevronDown, ChevronRight, Filter, Building2, Sparkles, Trophy, Clock, BookmarkCheck,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { days, allCompanies, counts, type Level } from "@/lib/dsa-data";


const levelPill: Record<Level, string> = {
  Easy: "bg-success/10 text-success border-success/20",
  Medium: "bg-gold/15 text-gold border-gold/30",
  Hard: "bg-destructive/10 text-destructive border-destructive/20",
};

type View = "sheet" | "company" | "interview" | "saved";

function DSAPage() {
  const [view, setView] = useState<View>("sheet");
  const [openDay, setOpenDay] = useState<number | null>(1);
  const [query, setQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState<string>("");
  const [levelFilter, setLevelFilter] = useState<Level | "">("");
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<Set<string>>(new Set(["p-605", "p-705", "p-902"]));

  const toggleSolved = (id: string) =>
    setSolved((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleSaved = (id: string) =>
    setSaved((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filteredDays = useMemo(() => {
    const q = query.toLowerCase().trim();
    return days
      .map((d) => ({
        ...d,
        problems: d.problems.filter((p) => {
          if (q && !(p.title.toLowerCase().includes(q) || p.companies.some(c => c.toLowerCase().includes(q)) || p.tags.some(t => t.includes(q)))) return false;
          if (companyFilter && !p.companies.includes(companyFilter)) return false;
          if (levelFilter && p.level !== levelFilter) return false;
          return true;
        }),
      }))
      .filter((d) => d.problems.length > 0);
  }, [query, companyFilter, levelFilter]);

  const savedProblems = useMemo(
    () => days.flatMap(d => d.problems.map(p => ({ p, day: d.day, topic: d.topic }))).filter(x => saved.has(x.p.id)),
    [saved],
  );

  const solvedTotal = solved.size;
  const pct = Math.round((solvedTotal / counts.total) * 100);
  const streak = 12;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header strip */}
      <Reveal>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="eyebrow">Placement Prep · Sheet 01</div>
            <h1 className="mt-3 font-display text-display-md text-ink">DSA Sheet — Most Important Interview Questions</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {counts.total} problems · Easy {counts.easy} · Medium {counts.medium} · Hard {counts.hard}. Curated from {allCompanies.length}+ hiring funnels. Track, time, and revise.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-[14px] border border-gold/30 bg-gold/10 px-4 py-2.5">
              <Flame className="h-4 w-4 text-gold" />
              <span className="font-mono text-sm text-ink">{streak}</span>
              <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">day streak</span>
            </div>
            <button className="inline-flex items-center gap-2 rounded-[14px] border border-border bg-surface px-4 py-2.5 text-sm hover:bg-muted">
              <CalendarDays className="h-4 w-4" /> Calendar
            </button>
            <button className="inline-flex items-center gap-2 rounded-[14px] border border-border bg-surface px-4 py-2.5 text-sm hover:bg-muted">
              <Users className="h-4 w-4" /> Group Study
            </button>
            <button onClick={() => setView("saved")} className="inline-flex items-center gap-2 rounded-[14px] bg-ink px-4 py-2.5 text-sm text-primary-foreground hover:bg-ink/90">
              <Bookmark className="h-4 w-4" /> Saved ({saved.size})
            </button>
          </div>
        </div>
      </Reveal>

      {/* Stat cards */}
      <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Solved", v: `${solvedTotal}/${counts.total}`, d: `${pct}% complete`, icon: Trophy },
          { l: "Active streak", v: `${streak} days`, d: "Personal best 19", icon: Flame },
          { l: "Avg / day", v: "2.4 problems", d: "Cohort median 1.8", icon: Sparkles },
          { l: "Time logged", v: "47h 22m", d: "This month", icon: Clock },
        ].map((c) => (
          <RevealItem key={c.l} className="rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface p-5 shadow-soft">
            <div className="flex items-start justify-between">
              <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{c.l}</div>
              <c.icon className="h-4 w-4 text-gold" />
            </div>
            <div className="mt-3 font-display text-2xl text-ink">{c.v}</div>
            <div className="mt-1 text-xs text-muted-foreground">{c.d}</div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Progress bar */}
      <Reveal>
        <div className="mt-4 rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface p-5 shadow-soft">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Sheet progress</span>
            <span className="font-mono text-ink">{pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-gradient-to-r from-gold to-ink transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
            <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-success" /> Easy {Array.from(solved).filter(id => days.flatMap(d=>d.problems).find(p=>p.id===id)?.level==="Easy").length}/{counts.easy}</span>
            <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-gold" /> Medium {Array.from(solved).filter(id => days.flatMap(d=>d.problems).find(p=>p.id===id)?.level==="Medium").length}/{counts.medium}</span>
            <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-destructive" /> Hard {Array.from(solved).filter(id => days.flatMap(d=>d.problems).find(p=>p.id===id)?.level==="Hard").length}/{counts.hard}</span>
          </div>
        </div>
      </Reveal>

      {/* Tabs + filters */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-6">
          <nav className="rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface p-2 shadow-soft">
            {([
              { k: "sheet", l: "DSA Sheet", icon: BookOpen },
              { k: "company", l: "Company-wise Sheets", icon: Building2 },
              { k: "interview", l: "Company Interviews", icon: MessagesIcon },
              { k: "saved", l: "Saved Questions", icon: BookmarkCheck },
            ] as const).map((t) => {
              const active = view === t.k;
              return (
                <button
                  key={t.k}
                  onClick={() => setView(t.k as View)}
                  className={`flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-sm transition-colors ${
                    active ? "bg-ink text-primary-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <t.icon className={`h-4 w-4 ${active ? "text-gold" : "text-muted-foreground"}`} />
                  {t.l}
                </button>
              );
            })}
          </nav>

          <div className="rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface p-5 shadow-soft">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <Filter className="h-3.5 w-3.5" /> Filters
            </div>
            <div className="mt-4 space-y-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search problems, companies, tags…"
                  className="w-full rounded-[12px] border border-border bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                />
              </div>
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="w-full rounded-[12px] border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              >
                <option value="">All companies</option>
                {allCompanies.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="flex gap-1.5">
                {(["", "Easy", "Medium", "Hard"] as const).map((l) => (
                  <button
                    key={l || "all"}
                    onClick={() => setLevelFilter(l as Level | "")}
                    className={`flex-1 rounded-[10px] border px-2 py-1.5 text-[11px] transition-colors ${
                      levelFilter === l
                        ? "border-ink bg-ink text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:text-ink"
                    }`}
                  >
                    {l || "All"}
                  </button>
                ))}
              </div>
              {(query || companyFilter || levelFilter) && (
                <button
                  onClick={() => { setQuery(""); setCompanyFilter(""); setLevelFilter(""); }}
                  className="w-full text-[11px] text-muted-foreground hover:text-ink"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <div className="rounded-[20px] border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-5">
            <div className="eyebrow text-gold">Mentor pairing</div>
            <div className="mt-2 font-display text-base text-ink">Stuck on Day 8 graphs?</div>
            <p className="mt-1 text-xs text-muted-foreground">Book a 1:1 with a Meta engineer mentor.</p>
            <Link to="/dashboard/interviews" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-ink hover:underline">
              Book session →
            </Link>
          </div>
        </aside>

        <main>
          {view === "saved" ? (
            <SavedView items={savedProblems} solved={solved} toggleSolved={toggleSolved} toggleSaved={toggleSaved} />
          ) : view === "company" ? (
            <CompanyView />
          ) : view === "interview" ? (
            <InterviewView />
          ) : (
            <Reveal>
              <div className="space-y-3">
                {filteredDays.length === 0 && (
                  <div className="rounded-[20px] border border-dashed border-border bg-surface p-12 text-center text-sm text-muted-foreground">
                    No problems match your filters.
                  </div>
                )}
                {filteredDays.map((d) => {
                  const open = openDay === d.day;
                  const daySolved = d.problems.filter(p => solved.has(p.id)).length;
                  return (
                    <div key={d.day} className="overflow-hidden rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface shadow-soft">
                      <button
                        onClick={() => setOpenDay(open ? null : d.day)}
                        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-background/60"
                      >
                        <div className="flex items-center gap-4">
                          {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                          <div>
                            <div className="font-display text-base text-ink">Day {d.day} · {d.topic}</div>
                            <div className="mt-0.5 text-xs text-muted-foreground">{d.problems.length} problems · {Math.round(d.problems.length * 0.6)}h estimate</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-muted-foreground">{daySolved}/{d.problems.length}</span>
                          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-ink" style={{ width: `${(daySolved / d.problems.length) * 100}%` }} />
                          </div>
                        </div>
                      </button>
                      {open && (
                        <div className="border-t border-[oklch(0_0_0/0.06)] overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-background text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                              <tr>
                                <th className="px-4 py-3 text-left w-10"></th>
                                <th className="px-4 py-3 text-left">Problem</th>
                                <th className="px-4 py-3 text-center">Article</th>
                                <th className="px-4 py-3 text-center">Video</th>
                                <th className="px-4 py-3 text-center">Practice</th>
                                <th className="px-4 py-3 text-center">Level</th>
                                <th className="px-4 py-3 text-center">Timer</th>
                                <th className="px-4 py-3 text-left">Companies</th>
                                <th className="px-4 py-3 text-center">Save</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[oklch(0_0_0/0.06)]">
                              {d.problems.map((p) => {
                                const isSolved = solved.has(p.id);
                                const isSaved = saved.has(p.id);
                                return (
                                  <tr key={p.id} className={`transition-colors hover:bg-background/40 ${isSolved ? "bg-success/5" : ""}`}>
                                    <td className="px-4 py-3">
                                      <button
                                        onClick={() => toggleSolved(p.id)}
                                        aria-label="Mark solved"
                                        className={`h-4 w-4 rounded-full border-2 transition-colors ${
                                          isSolved ? "border-success bg-success" : "border-border hover:border-ink"
                                        }`}
                                      />
                                    </td>
                                    <td className="px-4 py-3">
                                      <Link to={`/dashboard/dsa/${p.slug}`} className="font-medium text-ink hover:underline">
                                        {p.title}
                                      </Link>
                                      <div className="mt-0.5 flex flex-wrap gap-1">
                                        {p.tags.slice(0, 2).map(t => (
                                          <span key={t} className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] uppercase tracking-[0.1em] text-muted-foreground">{t}</span>
                                        ))}
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <Link to={`/dashboard/dsa/${p.slug}`} className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-muted">
                                        <BookOpen className="h-3.5 w-3.5 text-ink" />
                                      </Link>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <a href={p.youtube} target="_blank" rel="noreferrer" className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-muted">
                                        <Youtube className="h-3.5 w-3.5 text-destructive" />
                                      </a>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <a href={p.practice} target="_blank" rel="noreferrer" className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-muted">
                                        <Code2 className="h-3.5 w-3.5 text-ink" />
                                      </a>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] ${levelPill[p.level]}`}>{p.level}</span>
                                    </td>
                                    <td className="px-4 py-3 text-center font-mono text-xs text-muted-foreground">{p.timer}m</td>
                                    <td className="px-4 py-3">
                                      <div className="flex flex-wrap gap-1">
                                        {p.companies.slice(0, 3).map(c => (
                                          <span key={c} className="rounded bg-ink px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] text-gold">{c}</span>
                                        ))}
                                        {p.companies.length > 3 && (
                                          <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">+{p.companies.length - 3}</span>
                                        )}
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <button onClick={() => toggleSaved(p.id)} aria-label="Save" className="text-muted-foreground hover:text-gold">
                                        {isSaved ? <BookmarkCheck className="h-4 w-4 text-gold" /> : <Bookmark className="h-4 w-4" />}
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Reveal>
          )}
        </main>
      </div>
    </div>
  );
}

function MessagesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/>
      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
    </svg>
  );
}

function CompanyView() {
  const grouped = useMemo(() => {
    const map = new Map<string, number>();
    days.flatMap(d => d.problems).forEach(p => p.companies.forEach(c => map.set(c, (map.get(c) || 0) + 1)));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, []);
  return (
    <Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grouped.map(([c, n]) => (
          <div key={c} className="group rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface p-6 shadow-soft transition-all hover:border-gold/40 hover:shadow-elevated">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-lg text-ink">{c}</div>
                <div className="mt-1 text-xs text-muted-foreground">{n} curated problems · most-asked rounds</div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-mono text-xs text-gold">{c.slice(0, 2).toUpperCase()}</div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Cohort 14 placed</span>
              <span className="font-mono text-xs text-ink">{Math.floor(Math.random() * 8) + 2}</span>
            </div>
            <button className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-ink hover:underline">Open sheet →</button>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function InterviewView() {
  const interviews = [
    { c: "Amazon", role: "SDE-1", rounds: 4, type: "On-site", date: "2025-08", outcome: "Offer" },
    { c: "Google", role: "APM", rounds: 5, type: "Virtual", date: "2025-07", outcome: "Reject" },
    { c: "Meta", role: "E4", rounds: 4, type: "On-site", date: "2025-06", outcome: "Offer" },
    { c: "Microsoft", role: "SDE-2", rounds: 3, type: "Virtual", date: "2025-05", outcome: "Offer" },
    { c: "Adobe", role: "MTS-2", rounds: 3, type: "On-site", date: "2025-04", outcome: "Hold" },
  ];
  return (
    <Reveal>
      <div className="overflow-hidden rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-background text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <tr><th className="px-6 py-3 text-left">Company</th><th className="px-6 py-3 text-left">Role</th><th className="px-6 py-3 text-center">Rounds</th><th className="px-6 py-3 text-left">Format</th><th className="px-6 py-3 text-left">Date</th><th className="px-6 py-3 text-center">Outcome</th><th className="px-6 py-3"></th></tr>
          </thead>
          <tbody className="divide-y divide-[oklch(0_0_0/0.06)]">
            {interviews.map((i, idx) => (
              <tr key={idx} className="hover:bg-background/40">
                <td className="px-6 py-4 font-medium text-ink">{i.c}</td>
                <td className="px-6 py-4 text-foreground">{i.role}</td>
                <td className="px-6 py-4 text-center font-mono text-xs">{i.rounds}</td>
                <td className="px-6 py-4 text-muted-foreground">{i.type}</td>
                <td className="px-6 py-4 text-muted-foreground">{i.date}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] ${
                    i.outcome === "Offer" ? "bg-success/10 text-success" : i.outcome === "Reject" ? "bg-destructive/10 text-destructive" : "bg-gold/15 text-gold"
                  }`}>{i.outcome}</span>
                </td>
                <td className="px-6 py-4 text-right"><button className="text-xs text-ink hover:underline">Read transcript →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

function SavedView({
  items, solved, toggleSolved, toggleSaved,
}: {
  items: { p: import("@/lib/dsa-data").Problem; day: number; topic: string }[];
  solved: Set<string>;
  toggleSolved: (id: string) => void;
  toggleSaved: (id: string) => void;
}) {
  return (
    <Reveal>
      <div className="rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface shadow-soft">
        <div className="flex items-center justify-between border-b border-[oklch(0_0_0/0.06)] px-6 py-4">
          <h3 className="font-display text-base text-ink">Saved Questions</h3>
          <span className="font-mono text-xs text-muted-foreground">{items.length} bookmarked</span>
        </div>
        {items.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted-foreground">No saved questions yet. Tap the bookmark on any problem.</div>
        ) : (
          <ul className="divide-y divide-[oklch(0_0_0/0.06)]">
            {items.map(({ p, day, topic }) => (
              <li key={p.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-background/40">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleSolved(p.id)}
                    className={`h-4 w-4 shrink-0 rounded-full border-2 ${solved.has(p.id) ? "border-success bg-success" : "border-border"}`}
                  />
                  <div>
                    <Link to={`/dashboard/dsa/${p.slug}`} className="font-medium text-ink hover:underline">{p.title}</Link>
                    <div className="mt-0.5 text-xs text-muted-foreground">Day {day} · {topic} · {p.companies.slice(0, 3).join(", ")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] ${levelPill[p.level]}`}>{p.level}</span>
                  <button onClick={() => toggleSaved(p.id)} className="text-gold"><BookmarkCheck className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}

export default DSAPage;
