import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { useState } from "react";
import { Bell, Shield, CreditCard, Trash2, Mail } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — S.Nehra" }] }),
  component: SettingsPage,
});

const tabs = [
  { id: "account", l: "Account", icon: Shield },
  { id: "notifications", l: "Notifications", icon: Bell },
  { id: "billing", l: "Billing", icon: CreditCard },
  { id: "danger", l: "Danger zone", icon: Trash2 },
] as const;

function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("account");

  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="eyebrow">Settings</div>
        <h1 className="mt-3 font-display text-display-md text-ink">Preferences</h1>
        <p className="mt-2 text-sm text-muted-foreground">Manage your account, notifications, and billing.</p>
      </Reveal>

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Side nav */}
        <nav className="space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm transition-colors ${
                tab === t.id ? "bg-ink text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              <t.icon className={`h-4 w-4 ${tab === t.id ? "text-gold" : "text-muted-foreground"}`} />
              {t.l}
            </button>
          ))}
        </nav>

        {/* Panel */}
        <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
          {tab === "account" && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl text-ink">Account</h2>
              <Field l="Email" v="jane.doe@gmail.com" />
              <Field l="Password" v="••••••••••••" action="Change" />
              <Field l="Two-factor authentication" v="Disabled" action="Enable" />
              <Field l="Connected accounts" v="Google, LinkedIn" action="Manage" />
            </div>
          )}

          {tab === "notifications" && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl text-ink">Notifications</h2>
              <Toggle l="New job matches" d="Daily digest of fresh openings matching your track." defaultOn />
              <Toggle l="Interview reminders" d="24h and 1h before any scheduled session." defaultOn />
              <Toggle l="Mentor messages" d="Realtime notifications when your mentor responds." defaultOn />
              <Toggle l="Weekly readiness report" d="Sundays · summary of your week's metrics." />
              <Toggle l="Marketing & cohort news" d="Occasional updates. We never share your address." />
            </div>
          )}

          {tab === "billing" && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl text-ink">Billing</h2>
              <div className="rounded-[16px] border border-[oklch(0_0_0/0.06)] bg-background p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Current plan</div>
                    <div className="mt-2 font-display text-2xl text-ink">Cohort 14 · ISA</div>
                  </div>
                  <span className="rounded-full bg-success/15 px-3 py-1 text-xs text-success">Active</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 border-t border-[oklch(0_0_0/0.06)] pt-4 text-sm">
                  <div><div className="text-muted-foreground">Total fee</div><div className="mt-1 font-display text-ink">₹89,000</div></div>
                  <div><div className="text-muted-foreground">Paid</div><div className="mt-1 font-display text-ink">₹15,000</div></div>
                  <div><div className="text-muted-foreground">Due on placement</div><div className="mt-1 font-display text-ink">₹74,000</div></div>
                </div>
              </div>
              <Field l="Payment method" v="HDFC Credit · ••4421" action="Update" />
              <Field l="Invoices" v="3 issued" action="Download" />
            </div>
          )}

          {tab === "danger" && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl text-destructive">Danger zone</h2>
              <p className="text-sm text-muted-foreground">These actions are irreversible. We'll always confirm before anything is deleted.</p>
              <div className="rounded-[16px] border border-destructive/30 bg-destructive/5 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="font-display text-base text-ink">Pause cohort enrollment</div>
                    <div className="text-xs text-muted-foreground">Take a break for up to 4 weeks. Re-join with the next cohort.</div>
                  </div>
                  <button className="rounded-[12px] border border-border bg-background px-4 py-2 text-xs hover:bg-muted">Pause</button>
                </div>
              </div>
              <div className="rounded-[16px] border border-destructive/30 bg-destructive/5 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="font-display text-base text-destructive">Delete account</div>
                    <div className="text-xs text-muted-foreground">Permanently erase your data. Certificates remain verifiable.</div>
                  </div>
                  <button className="rounded-[12px] bg-destructive px-4 py-2 text-xs text-destructive-foreground hover:bg-destructive/90">Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ l, v, action }: { l: string; v: string; action?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[oklch(0_0_0/0.06)] pb-5 last:border-0 last:pb-0">
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{l}</div>
        <div className="mt-1 truncate text-sm text-ink">{v}</div>
      </div>
      {action && <button className="rounded-[12px] border border-border bg-background px-3.5 py-1.5 text-xs hover:bg-muted">{action}</button>}
    </div>
  );
}

function Toggle({ l, d, defaultOn }: { l: string; d: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-start justify-between gap-6 border-b border-[oklch(0_0_0/0.06)] pb-5 last:border-0 last:pb-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-sm font-medium text-ink"><Mail className="h-3.5 w-3.5 text-muted-foreground" /> {l}</div>
        <div className="mt-1 text-xs text-muted-foreground">{d}</div>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${on ? "bg-ink" : "bg-muted"}`}
        aria-pressed={on}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-surface transition-transform ${on ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    </div>
  );
}
