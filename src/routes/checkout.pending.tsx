import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock3, RefreshCw } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/checkout/pending")({
  head: () => ({ meta: [{ title: "Payment Processing — S.Nehra" }] }),
  component: PendingPage,
});

function PendingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Reveal>
          <div className="rounded-[28px] border border-gold/30 bg-surface p-12 shadow-elevated">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
              <Clock3 className="h-8 w-8 text-gold animate-pulse" />
            </div>
            <div className="mt-8 eyebrow text-gold">Awaiting bank confirmation</div>
            <h1 className="mt-3 font-display text-display-md text-ink">Your payment is being verified.</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Banks typically settle UPI mandates within 5–10 minutes. You'll receive an email and SMS the moment it clears. No need to retry.
            </p>

            <dl className="mt-10 grid gap-6 border-t border-[oklch(0_0_0/0.06)] pt-8 sm:grid-cols-3">
              <div><dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Status</dt><dd className="mt-1 text-sm text-ink">Awaiting bank</dd></div>
              <div><dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Reference</dt><dd className="mt-1 font-mono text-sm text-ink">TXN{Date.now()}</dd></div>
              <div><dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Amount</dt><dd className="mt-1 text-sm text-ink">₹29,500</dd></div>
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-[14px] bg-ink px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-ink/90">
                <RefreshCw className="h-4 w-4" /> Refresh status
              </button>
              <Link to="/dashboard" className="inline-flex flex-1 items-center justify-center gap-2 rounded-[14px] border border-border bg-background px-5 py-3 text-sm hover:bg-muted">
                Continue to dashboard
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
