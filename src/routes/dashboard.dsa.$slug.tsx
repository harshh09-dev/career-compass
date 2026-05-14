import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BookOpen, Youtube, Code2, Bookmark, Play, Pause, RotateCcw, Building2, Tag, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { findProblem } from "@/lib/dsa-data";

export const Route = createFileRoute("/dashboard/dsa/$slug")({
  loader: ({ params }) => {
    const found = findProblem(params.slug);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.problem.title} — DSA` : "Problem" }],
  }),
  component: ProblemPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl py-20 text-center">
      <h1 className="font-display text-display-md">Problem not found</h1>
      <Link to="/dashboard/dsa" className="mt-6 inline-block text-sm text-ink hover:underline">← Back to DSA Sheet</Link>
    </div>
  ),
});

const levelPill: Record<string, string> = {
  Easy: "bg-success/10 text-success border-success/20",
  Medium: "bg-gold/15 text-gold border-gold/30",
  Hard: "bg-destructive/10 text-destructive border-destructive/20",
};

function ProblemPage() {
  const { problem, day } = Route.useLoaderData();
  const [solved, setSolved] = useState(false);
  const [saved, setSaved] = useState(false);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(problem.timer * 60);

  return (
    <div className="mx-auto max-w-5xl">
      <Reveal>
        <Link to="/dashboard/dsa" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-ink">
          <ArrowLeft className="h-3 w-3" /> Back to sheet
        </Link>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="eyebrow">Day {day.day} · {day.topic}</div>
            <h1 className="mt-3 font-display text-display-md text-ink">{problem.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] ${levelPill[problem.level]}`}>{problem.level}</span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] text-muted-foreground">{problem.timer} min target</span>
              {problem.tags.map((t: string) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  <Tag className="h-2.5 w-2.5" /> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={problem.practice} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[12px] bg-ink px-4 py-2.5 text-sm text-primary-foreground hover:bg-ink/90">
              <Code2 className="h-4 w-4" /> Solve on LeetCode
            </a>
            <a href={problem.youtube} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[12px] border border-border bg-surface px-4 py-2.5 text-sm hover:bg-muted">
              <Youtube className="h-4 w-4 text-destructive" /> Watch video
            </a>
            <button onClick={() => setSaved(!saved)} className={`inline-flex items-center gap-2 rounded-[12px] border px-4 py-2.5 text-sm ${saved ? "border-gold bg-gold/10 text-gold" : "border-border bg-surface hover:bg-muted"}`}>
              <Bookmark className="h-4 w-4" /> {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
        <Reveal>
          <article className="prose prose-sm max-w-none rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
            <h2 className="font-display text-xl text-ink">Problem statement</h2>
            <p className="text-foreground">
              Given the array, return the {problem.title.toLowerCase()}. The expected solution should run within the time limit and handle edge cases like empty input, duplicates, and overflow.
            </p>
            <h3 className="font-display text-base text-ink">Examples</h3>
            <pre className="rounded-md bg-ink p-4 font-mono text-xs text-gold">{`Input:  [3,2,3]\nOutput: 3\n\nInput:  [2,2,1,1,1,2,2]\nOutput: 2`}</pre>
            <h3 className="font-display text-base text-ink">Approach — Optimal</h3>
            <p className="text-foreground">
              Use Boyer–Moore voting / hash counting / two-pointer pattern depending on the constraints. Aim for <code>O(n)</code> time and <code>O(1)</code> space when feasible.
            </p>
            <ol>
              <li>Initialize counters and pointers.</li>
              <li>Iterate once, maintaining the invariant.</li>
              <li>Validate against edge cases on the second pass.</li>
            </ol>
            <h3 className="font-display text-base text-ink">Reference solution (Java)</h3>
            <pre className="rounded-md bg-ink p-4 font-mono text-xs text-gold leading-relaxed">{`class Solution {\n  public int solve(int[] nums) {\n    int candidate = 0, count = 0;\n    for (int n : nums) {\n      if (count == 0) candidate = n;\n      count += (n == candidate) ? 1 : -1;\n    }\n    return candidate;\n  }\n}`}</pre>
            <h3 className="font-display text-base text-ink">Complexity</h3>
            <p className="text-foreground">Time: O(n). Space: O(1). Avoid sorting unless the problem permits O(n log n).</p>
            <h3 className="font-display text-base text-ink">Asked at</h3>
            <div className="not-prose flex flex-wrap gap-2">
              {problem.companies.map((c: string) => (
                <span key={c} className="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-gold">
                  <Building2 className="h-3 w-3" /> {c}
                </span>
              ))}
            </div>
          </article>
        </Reveal>

        <aside className="space-y-4">
          <Reveal>
            <div className="rounded-[20px] border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-6">
              <div className="eyebrow text-gold">Focus timer</div>
              <div className="mt-3 font-display text-4xl text-ink tabular-nums">
                {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => setRunning(!running)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-[12px] bg-ink px-3 py-2 text-xs text-primary-foreground hover:bg-ink/90">
                  {running ? <><Pause className="h-3 w-3" /> Pause</> : <><Play className="h-3 w-3" /> Start</>}
                </button>
                <button onClick={() => { setSeconds(problem.timer * 60); setRunning(false); }} className="inline-flex items-center gap-1 rounded-[12px] border border-border bg-surface px-3 py-2 text-xs hover:bg-muted">
                  <RotateCcw className="h-3 w-3" />
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <button
              onClick={() => setSolved(!solved)}
              className={`flex w-full items-center justify-center gap-2 rounded-[16px] border-2 px-4 py-4 text-sm font-medium transition-colors ${
                solved ? "border-success bg-success/10 text-success" : "border-dashed border-border bg-surface text-foreground hover:border-ink"
              }`}
            >
              <CheckCircle2 className="h-4 w-4" /> {solved ? "Marked as solved" : "Mark as solved"}
            </button>
          </Reveal>

          <Reveal>
            <div className="rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface p-5">
              <div className="eyebrow">Resources</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href={problem.article} className="inline-flex items-center gap-2 text-foreground hover:text-ink"><BookOpen className="h-3.5 w-3.5" /> Editorial article</a></li>
                <li><a href={problem.youtube} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-foreground hover:text-ink"><Youtube className="h-3.5 w-3.5 text-destructive" /> Walkthrough video</a></li>
                <li><a href={problem.practice} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-foreground hover:text-ink"><Code2 className="h-3.5 w-3.5" /> Practice on LeetCode</a></li>
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface p-5">
              <div className="eyebrow">Discussion</div>
              <p className="mt-2 text-xs text-muted-foreground">12 cohort 14 candidates discussing approaches.</p>
              <button className="mt-3 text-xs font-medium text-ink hover:underline">Open thread →</button>
            </div>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
