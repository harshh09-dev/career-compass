import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Lock, Shield, CheckCircle2, ArrowLeft, CreditCard, Wallet, Building2 } from "lucide-react";
import { Reveal } from "@/components/reveal";


const plans: Record<string, { name: string; tag: string; price: number; deposit: number; isa: string }> = {
  signature: { name: "Signature Placement", tag: "Cohort 14 · Sales", price: 185000, deposit: 25000, isa: "12% of CTC for 24 months" },
  fellowship: { name: "Fellowship Track", tag: "Cohort 14 · Engineering", price: 245000, deposit: 35000, isa: "14% of CTC for 24 months" },
  audit: { name: "Career Audit", tag: "1:1 with senior partner", price: 18000, deposit: 18000, isa: "One-time" },
};

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

function CheckoutPage() {
  const nav = useNavigate();
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const planKey = (search.get("plan") || "signature") as keyof typeof plans;
  const plan = plans[planKey] ?? plans.signature;
  const [method, setMethod] = useState<"card" | "upi" | "netbanking">("card");
  const [submitting, setSubmitting] = useState(false);

  const subtotal = plan.deposit;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const seed = Math.random();
      if (seed < 0.7) nav("/checkout/success?ref=" + encodeURIComponent("TXN" + Date.now()));
      else if (seed < 0.9) nav("/checkout/pending");
      else nav("/checkout/failed");
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-[oklch(0_0_0/0.06)] bg-surface/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-xl font-semibold text-ink">
            S<span className="text-gold">.</span>Nehra
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> Encrypted · PCI-DSS · Razorpay secured
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <Link to="/pricing" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-ink">
            <ArrowLeft className="h-3 w-3" /> Back to pricing
          </Link>
          <h1 className="mt-4 font-display text-display-md text-ink">Secure your seat</h1>
          <p className="mt-2 text-sm text-muted-foreground">Refundable enrollment deposit. Balance billed only after placement.</p>

          <form onSubmit={handlePay} className="mt-10 space-y-8">
            <section className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-7 shadow-soft">
              <h2 className="font-display text-xl text-ink">Candidate details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  { l: "Full name", t: "text", v: "Jane Doe" },
                  { l: "Email", t: "email", v: "jane.doe@gmail.com" },
                  { l: "Phone", t: "tel", v: "+91 98765 43210" },
                  { l: "City", t: "text", v: "Bangalore" },
                ].map((f) => (
                  <label key={f.l} className="block">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{f.l}</span>
                    <input
                      required
                      type={f.t}
                      defaultValue={f.v}
                      className="mt-2 w-full rounded-[12px] border border-border bg-background px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-7 shadow-soft">
              <h2 className="font-display text-xl text-ink">Payment method</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "card" as const, l: "Card", icon: CreditCard, d: "Visa · Mastercard · Amex" },
                  { k: "upi" as const, l: "UPI", icon: Wallet, d: "GPay · PhonePe · Paytm" },
                  { k: "netbanking" as const, l: "Netbanking", icon: Building2, d: "All major banks" },
                ].map((m) => {
                  const active = method === m.k;
                  return (
                    <button
                      type="button"
                      key={m.k}
                      onClick={() => setMethod(m.k)}
                      className={`flex flex-col items-start gap-2 rounded-[14px] border p-4 text-left transition-all ${
                        active ? "border-ink bg-ink text-primary-foreground" : "border-border bg-background hover:border-ink/30"
                      }`}
                    >
                      <m.icon className={`h-4 w-4 ${active ? "text-gold" : "text-muted-foreground"}`} />
                      <div className="text-sm font-medium">{m.l}</div>
                      <div className={`text-[10px] uppercase tracking-[0.14em] ${active ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                        {m.d}
                      </div>
                    </button>
                  );
                })}
              </div>

              {method === "card" && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Card number</span>
                    <input required placeholder="4242 4242 4242 4242" className="mt-2 w-full rounded-[12px] border border-border bg-background px-3.5 py-2.5 text-sm font-mono tracking-wider focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Expiry</span>
                    <input required placeholder="MM / YY" className="mt-2 w-full rounded-[12px] border border-border bg-background px-3.5 py-2.5 text-sm font-mono focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">CVV</span>
                    <input required placeholder="•••" className="mt-2 w-full rounded-[12px] border border-border bg-background px-3.5 py-2.5 text-sm font-mono focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" />
                  </label>
                </div>
              )}
              {method === "upi" && (
                <label className="mt-6 block">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">UPI ID</span>
                  <input required placeholder="janedoe@okhdfc" className="mt-2 w-full rounded-[12px] border border-border bg-background px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" />
                </label>
              )}
              {method === "netbanking" && (
                <label className="mt-6 block">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Select bank</span>
                  <select required className="mt-2 w-full rounded-[12px] border border-border bg-background px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20">
                    <option>HDFC Bank</option><option>ICICI Bank</option><option>Axis Bank</option><option>SBI</option><option>Kotak Mahindra</option>
                  </select>
                </label>
              )}
            </section>

            <button
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-ink py-4 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold disabled:opacity-60"
            >
              {submitting ? "Processing securely…" : `Pay ${inr(total)} now`}
              <Lock className="h-4 w-4" />
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="sticky top-8 rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-7 shadow-elevated">
            <div className="eyebrow">Order summary</div>
            <div className="mt-4 rounded-2xl bg-ink p-5 text-primary-foreground">
              <div className="text-xs uppercase tracking-[0.18em] text-primary-foreground/60">{plan.tag}</div>
              <div className="mt-2 font-display text-2xl">{plan.name}</div>
              <div className="mt-3 text-xs text-primary-foreground/70">Program fee {inr(plan.price)}</div>
              <div className="text-xs text-primary-foreground/70">Post-placement: {plan.isa}</div>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Enrollment deposit</dt><dd className="text-ink">{inr(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">GST (18%)</dt><dd className="text-ink">{inr(tax)}</dd></div>
              <div className="flex justify-between border-t border-[oklch(0_0_0/0.06)] pt-3 font-display text-lg">
                <dt className="text-ink">Pay today</dt>
                <dd className="text-gold">{inr(total)}</dd>
              </div>
            </dl>

            <ul className="mt-6 space-y-2.5 border-t border-[oklch(0_0_0/0.06)] pt-5 text-xs text-muted-foreground">
              {["7-day refund window", "Mentor matched within 48h", "Audit-grade payment receipts", "Bank-grade encryption"].map((t) => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> {t}</li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <Shield className="h-3 w-3" /> Powered by Razorpay
            </div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}

export default CheckoutPage;
