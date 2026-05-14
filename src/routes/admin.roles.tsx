import { createFileRoute } from "@tanstack/react-router";
import { Shield, UserPlus, Trash2 } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/admin/roles")({
  head: () => ({ meta: [{ title: "Roles & Access — Admin" }] }),
  component: RolesPage,
});

const team = [
  { n: "Sahil Nehra", e: "sahil@snehra.io", role: "Owner", last: "Active now" },
  { n: "Anika Verma", e: "anika@snehra.io", role: "Admin", last: "2h ago" },
  { n: "Devansh Patel", e: "dev@snehra.io", role: "Operations", last: "Yesterday" },
  { n: "Meera Iyer", e: "meera@snehra.io", role: "Mentor", last: "3 days ago" },
  { n: "Karan Singh", e: "karan@snehra.io", role: "Mentor", last: "1 week ago" },
];

const rolePill: Record<string, string> = {
  Owner: "bg-ink text-gold",
  Admin: "bg-gold/15 text-gold",
  Operations: "bg-blue-50 text-blue-700",
  Mentor: "bg-muted text-foreground",
};

function RolesPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <div className="eyebrow">Access control</div>
            <h1 className="mt-3 font-display text-display-md text-ink">Roles & access</h1>
            <p className="mt-2 text-sm text-muted-foreground">5 team members · 3 role tiers · audit log retained 90 days</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-[12px] bg-ink px-4 py-2.5 text-sm text-primary-foreground hover:bg-ink/90"><UserPlus className="h-4 w-4" /> Invite</button>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-8 overflow-hidden rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-background text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <tr><th className="px-6 py-3 text-left">Member</th><th className="px-6 py-3 text-left">Email</th><th className="px-6 py-3 text-center">Role</th><th className="px-6 py-3 text-left">Last seen</th><th className="px-6 py-3 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-[oklch(0_0_0/0.06)]">
              {team.map(m => (
                <tr key={m.e} className="hover:bg-background/60">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-display text-[11px] text-gold">{m.n.split(" ").map(s => s[0]).join("")}</div>
                      <div className="font-medium text-ink">{m.n}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{m.e}</td>
                  <td className="px-6 py-4 text-center"><span className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] ${rolePill[m.role]}`}>{m.role}</span></td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">{m.last}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-muted-foreground hover:text-destructive" disabled={m.role === "Owner"}><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-8 rounded-[20px] border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-6">
          <div className="flex items-start gap-3">
            <Shield className="mt-1 h-5 w-5 text-gold" />
            <div>
              <h3 className="font-display text-lg text-ink">Permission matrix</h3>
              <div className="mt-4 overflow-hidden rounded-[12px] border border-[oklch(0_0_0/0.06)] bg-surface">
                <table className="w-full text-sm">
                  <thead className="bg-background text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <tr><th className="px-4 py-2 text-left">Capability</th><th className="px-4 py-2 text-center">Owner</th><th className="px-4 py-2 text-center">Admin</th><th className="px-4 py-2 text-center">Operations</th><th className="px-4 py-2 text-center">Mentor</th></tr>
                  </thead>
                  <tbody className="divide-y divide-[oklch(0_0_0/0.06)] text-xs">
                    {[
                      ["Edit landing CMS", true, true, false, false],
                      ["View payments", true, true, true, false],
                      ["Issue refunds", true, true, false, false],
                      ["Manage candidates", true, true, true, false],
                      ["Run mock interviews", true, true, true, true],
                    ].map((r, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2 text-foreground">{r[0]}</td>
                        {r.slice(1).map((v, j) => <td key={j} className="px-4 py-2 text-center">{v ? "●" : "—"}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
