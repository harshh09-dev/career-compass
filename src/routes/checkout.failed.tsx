import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertOctagon, RotateCw, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/checkout/failed")({
  head: () => ({ meta: [{ title: "Payment Failed — S.Nehra" }] }),
  component: FailedPage,
});

function FailedPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Reveal>
          <div className="rounded-[28px] border border-destructive/20 bg-surface p-12 shadow-elevated">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertOctagon className="h-8 w-8 text-destructive" />
            </div>
            <div className="mt-8 eyebrow text-destructive">Payment unsuccessful</div>
            <h1 className="mt-3 font-display text-display-md text-ink">We could not process your payment.</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Your card was declined by the issuing bank. No amount has been charged. You can retry, switch method, or talk to admissions.
            </p>

            <div className="mt-8 rounded-2xl border border-[oklch(0_0_0/0.06)] bg-background p-5">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Error code</div>
              <div className="mt-1 font-mono text-sm text-ink">RZP_CARD_DECLINED · 502.17</div>
              <p className="mt-3 text-xs text-muted-foreground">
                Common causes: insufficient balance, international card not enabled, or bank fraud check. Try a different card or UPI.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/checkout" className="inline-flex flex-1 items-center justify-center gap-2 rounded-[14px] bg-ink px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-ink/90">
                <RotateCw className="h-4 w-4" /> Retry payment
              </Link>
              <Link to="/contact" className="inline-flex flex-1 items-center justify-center gap-2 rounded-[14px] border border-border bg-background px-5 py-3 text-sm hover:bg-muted">
                <MessageCircle className="h-4 w-4" /> Talk to admissions
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
