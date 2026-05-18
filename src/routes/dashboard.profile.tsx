import { createFileRoute } from "@tanstack/react-router";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Camera, Linkedin, Github, Globe, MapPin } from "lucide-react";

export const Route = createFileRoute("/dashboard/profile")({
  head: () => ({ meta: [{ title: "Profile — S.Nehra" }] }),
  component: ProfilePage,
});

const fields = [
  { l: "Full name", v: "Jane Doe", k: "name" },
  { l: "Email", v: "jane.doe@gmail.com", k: "email" },
  { l: "Phone", v: "+91 98765 43210", k: "phone" },
  { l: "Location", v: "Bangalore, IN", k: "loc" },
  { l: "Track", v: "Sales · Cohort 14", k: "track", locked: true },
  { l: "Mentor", v: "Priya Mehta", k: "mentor", locked: true },
];

function ProfilePage() {
  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="eyebrow">Profile</div>
        <h1 className="mt-3 font-display text-display-md text-ink">Your candidate profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">This is what hiring partners see. Keep it sharp.</p>
      </Reveal>

      {/* Hero card */}
      <Reveal delay={0.05}>
        <div className="mt-8 overflow-hidden rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface shadow-soft">
          <div className="h-32 bg-gradient-to-br from-ink via-ink to-gold/40" />
          <div className="relative px-8 pb-8">
            <div className="-mt-12 flex items-end justify-between">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-surface bg-ink font-display text-3xl text-primary-foreground">JD</div>
                <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-surface bg-gold text-ink hover:bg-gold-muted">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <button className="rounded-[12px] border border-border bg-background px-4 py-2 text-xs font-medium hover:bg-muted">Edit profile</button>
            </div>
            <div className="mt-5">
              <h2 className="font-display text-2xl text-ink">Jane Doe</h2>
              <div className="mt-1 text-sm text-muted-foreground">Aspiring Account Executive · 2024 graduate · NIT Trichy</div>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Bangalore, IN</span>
                <a className="inline-flex items-center gap-1.5 hover:text-ink" href="#"><Linkedin className="h-3.5 w-3.5" /> linkedin.com/in/janedoe</a>
                <a className="inline-flex items-center gap-1.5 hover:text-ink" href="#"><Github className="h-3.5 w-3.5" /> github.com/janedoe</a>
                <a className="inline-flex items-center gap-1.5 hover:text-ink" href="#"><Globe className="h-3.5 w-3.5" /> janedoe.dev</a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Editable fields */}
        <Reveal>
          <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
            <h3 className="font-display text-xl text-ink">Personal information</h3>
            <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <RevealItem key={f.k}>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{f.l}</label>
                  <input
                    defaultValue={f.v}
                    disabled={f.locked}
                    className="mt-2 w-full rounded-[12px] border border-border bg-background px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 disabled:cursor-not-allowed disabled:opacity-70"
                  />
                </RevealItem>
              ))}
            </RevealGroup>
            <div className="mt-8 flex items-center justify-end gap-3 border-t border-[oklch(0_0_0/0.06)] pt-6">
              <button className="rounded-[14px] border border-border px-4 py-2 text-sm hover:bg-muted">Cancel</button>
              <button className="rounded-[14px] bg-ink px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-ink/90">Save changes</button>
            </div>
          </div>
        </Reveal>

        {/* Pitch + readiness */}
        <div className="space-y-6">
          <Reveal>
            <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-6 shadow-soft">
              <div className="eyebrow">Elevator pitch</div>
              <p className="mt-4 text-sm leading-relaxed text-foreground">
                "Recent NIT Trichy grad transitioning into B2B SaaS sales. 6 months of outbound experience at a YC-backed startup. Closed ₹14L pipeline as an intern."
              </p>
              <button className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-ink hover:underline">Edit pitch</button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-ink p-6 text-primary-foreground shadow-soft">
              <div className="eyebrow text-primary-foreground/60">Profile completeness</div>
              <div className="mt-4 font-display text-5xl text-gold">92%</div>
              <p className="mt-2 text-xs text-primary-foreground/60">Add a portfolio link to reach 100%.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
