import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, GitBranch, CreditCard, FileEdit, ShieldCheck, ArrowLeft, Bell } from "lucide-react";


const adminNav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/candidates", label: "Candidates", icon: Users },
  { to: "/admin/pipeline", label: "Pipeline", icon: GitBranch },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/admin/cms", label: "CMS", icon: FileEdit },
  { to: "/admin/roles", label: "Roles & Access", icon: ShieldCheck },
] as const;

function AdminLayout() {
  const path = useLocation().pathname;
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-[oklch(0_0_0/0.06)] bg-ink lg:flex lg:flex-col">
        <div className="px-6 py-6">
          <Link to="/" className="font-display text-xl font-semibold text-primary-foreground">
            S<span className="text-gold">.</span>Nehra
          </Link>
          <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-gold">Admin Console</div>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {adminNav.map((n) => {
            const active = path === n.to;
            return (
              <Link key={n.to} to={n.to} className={`group flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm transition-colors ${
                active ? "bg-gold text-ink" : "text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground"
              }`}>
                <n.icon className={`h-4 w-4 ${active ? "text-ink" : "text-primary-foreground/50"}`} />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-primary-foreground/10 p-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-xs text-primary-foreground/60 hover:text-primary-foreground">
            <ArrowLeft className="h-3 w-3" /> Back to candidate view
          </Link>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[oklch(0_0_0/0.06)] bg-background/80 px-6 py-3 backdrop-blur-xl lg:px-10">
          <div className="text-xs text-muted-foreground">Internal · Admin · Cohort 14</div>
          <div className="flex items-center gap-3">
            <button className="rounded-[12px] border border-border bg-surface p-2.5"><Bell className="h-4 w-4" /></button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-display text-sm text-ink">SN</div>
          </div>
        </header>
        <main className="px-6 py-10 lg:px-10 lg:py-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
