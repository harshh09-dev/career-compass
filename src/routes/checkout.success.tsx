import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Download, ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({ meta: [{ title: "Payment Confirmed — S.Nehra" }] }),
  validateSearch: (s: Record<string, unknown>) => ({ ref: typeof s.ref === "string" ? s.ref : "TXN" + Date.now() }),
  component: SuccessPage,
});

function SuccessPage() {
  const { ref } = Route.useSearch();
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Reveal>
          <div className="rounded-[28px] border border-[oklch(0_0_0/0.06)] bg-surface p-12 shadow-elevated">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <div className="mt-8 eyebrow">Payment confirmed</div>
            <h1 className="mt-3 font-display text-display-md text-ink">Welcome to Cohort 14, Jane.</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Your enrollment deposit is locked in. A senior partner will reach out within 24 hours to schedule your kickoff session.
            </p>

            <dl className="mt-10 grid gap-6 border-t border-[oklch(0_0_0/0.06)] pt-8 sm:grid-cols-3">
              <div><dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Reference</dt><dd className="mt-1 font-mono text-sm text-ink">{ref}</dd></div>
              <div><dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Amount</dt><dd className="mt-1 font-display text-xl text-gold">₹29,500</dd></div>
              <div><dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Method</dt><dd className="mt-1 text-sm text-ink">Card · •••• 4242</dd></div>
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/dashboard" className="inline-flex flex-1 items-center justify-center gap-2 rounded-[14px] bg-ink px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-ink/90">
                Go to dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-[14px] border border-border bg-background px-5 py-3 text-sm hover:bg-muted">
                <Download className="h-4 w-4" /> Download receipt
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-ink p-6 text-primary-foreground">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-4 w-4 text-gold" />
              <div>
                <div className="font-display text-lg">What happens next</div>
                <ul className="mt-3 space-y-2 text-xs text-primary-foreground/70">
                  <li>1. Mentor pairing email within 24 hours.</li>
                  <li>2. Cohort kickoff Monday, 9:00 AM IST.</li>
                  <li>3. ATS resume audit and pipeline blueprint shared by Wednesday.</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
