import { Link } from "react-router-dom";
import { useState } from "react";
import { Download, Receipt, CreditCard, CheckCircle2, Clock3, AlertOctagon, ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";


const invoices = [
  { id: "INV-2025-014", date: "12 Aug 2025", desc: "Enrollment deposit · Cohort 14", amt: 29500, status: "paid" as const },
  { id: "INV-2025-013", date: "12 Aug 2025", desc: "ATS Resume Audit", amt: 4720, status: "paid" as const },
  { id: "INV-2025-012", date: "01 Sep 2025", desc: "Mid-program installment", amt: 88500, status: "due" as const },
  { id: "INV-2025-011", date: "15 Jul 2025", desc: "Career strategy call", amt: 5900, status: "paid" as const },
];

const transactions = [
  { ref: "TXN1755012003", date: "12 Aug · 11:42", method: "Card · •••• 4242", amt: 29500, status: "success" as const },
  { ref: "TXN1755012001", date: "12 Aug · 11:38", method: "Card · •••• 4242", amt: 29500, status: "failed" as const },
  { ref: "TXN1754920889", date: "15 Jul · 09:14", method: "UPI · janedoe@okhdfc", amt: 5900, status: "success" as const },
  { ref: "TXN1754920770", date: "10 Jul · 18:02", method: "Netbanking · HDFC", amt: 4720, status: "pending" as const },
];

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

const statusPill: Record<string, { c: string; t: string; icon: typeof CheckCircle2 }> = {
  paid: { c: "bg-success/10 text-success", t: "Paid", icon: CheckCircle2 },
  due: { c: "bg-gold/15 text-gold", t: "Due", icon: Clock3 },
  success: { c: "bg-success/10 text-success", t: "Success", icon: CheckCircle2 },
  pending: { c: "bg-gold/15 text-gold", t: "Pending", icon: Clock3 },
  failed: { c: "bg-destructive/10 text-destructive", t: "Failed", icon: AlertOctagon },
};

function BillingPage() {
  const [tab, setTab] = useState<"invoices" | "transactions" | "method">("invoices");
  const totalPaid = 40120;
  const totalDue = 88500;

  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="eyebrow">Billing</div>
        <h1 className="mt-3 font-display text-display-md text-ink">Payments & invoices</h1>
        <p className="mt-2 text-sm text-muted-foreground">Audit-grade receipts. Track every rupee through the program.</p>
      </Reveal>

      <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { l: "Lifetime paid", v: inr(totalPaid), d: "3 transactions cleared" },
          { l: "Outstanding", v: inr(totalDue), d: "Due 01 Sep 2025", danger: true },
          { l: "Post-placement ISA", v: "12% × 24m", d: "Triggered after offer" },
        ].map((c) => (
          <RevealItem key={c.l} className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-6 shadow-soft">
            <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{c.l}</div>
            <div className={`mt-4 font-display text-3xl ${c.danger ? "text-gold" : "text-ink"}`}>{c.v}</div>
            <div className="mt-1 text-xs text-muted-foreground">{c.d}</div>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-10 flex items-center gap-1 border-b border-[oklch(0_0_0/0.06)]">
        {([
          { k: "invoices", l: "Invoices", icon: Receipt },
          { k: "transactions", l: "Transactions", icon: ArrowUpRight },
          { k: "method", l: "Payment method", icon: CreditCard },
        ] as const).map((t) => {
          const active = tab === t.k;
          return (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm transition-colors ${
                active ? "border-ink text-ink" : "border-transparent text-muted-foreground hover:text-ink"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.l}
            </button>
          );
        })}
      </div>

      {tab === "invoices" && (
        <Reveal>
          <div className="mt-6 overflow-hidden rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface shadow-soft">
            <table className="w-full text-sm">
              <thead className="bg-background text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <tr><th className="px-6 py-3 text-left">Invoice</th><th className="px-6 py-3 text-left">Description</th><th className="px-6 py-3 text-left">Date</th><th className="px-6 py-3 text-right">Amount</th><th className="px-6 py-3 text-center">Status</th><th className="px-6 py-3"></th></tr>
              </thead>
              <tbody className="divide-y divide-[oklch(0_0_0/0.06)]">
                {invoices.map((i) => {
                  const p = statusPill[i.status];
                  return (
                    <tr key={i.id} className="hover:bg-background/60">
                      <td className="px-6 py-4 font-mono text-xs text-ink">{i.id}</td>
                      <td className="px-6 py-4 text-foreground">{i.desc}</td>
                      <td className="px-6 py-4 text-muted-foreground">{i.date}</td>
                      <td className="px-6 py-4 text-right font-display text-ink">{inr(i.amt)}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${p.c}`}>
                          <p.icon className="h-3 w-3" /> {p.t}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {i.status === "due" ? (
                          <Link to="/checkout" className="text-xs font-medium text-ink hover:underline">Pay now →</Link>
                        ) : (
                          <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-ink"><Download className="h-3.5 w-3.5" /> PDF</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
      )}

      {tab === "transactions" && (
        <Reveal>
          <div className="mt-6 overflow-hidden rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface shadow-soft">
            <table className="w-full text-sm">
              <thead className="bg-background text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <tr><th className="px-6 py-3 text-left">Reference</th><th className="px-6 py-3 text-left">Method</th><th className="px-6 py-3 text-left">Date</th><th className="px-6 py-3 text-right">Amount</th><th className="px-6 py-3 text-center">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-[oklch(0_0_0/0.06)]">
                {transactions.map((t) => {
                  const p = statusPill[t.status];
                  return (
                    <tr key={t.ref} className="hover:bg-background/60">
                      <td className="px-6 py-4 font-mono text-xs text-ink">{t.ref}</td>
                      <td className="px-6 py-4 text-foreground">{t.method}</td>
                      <td className="px-6 py-4 text-muted-foreground">{t.date}</td>
                      <td className="px-6 py-4 text-right font-display text-ink">{inr(t.amt)}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${p.c}`}>
                          <p.icon className="h-3 w-3" /> {p.t}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
      )}

      {tab === "method" && (
        <Reveal>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
              <h3 className="font-display text-xl text-ink">Saved methods</h3>
              <ul className="mt-5 space-y-3">
                <li className="flex items-center justify-between rounded-2xl border border-[oklch(0_0_0/0.06)] bg-background p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-14 items-center justify-center rounded-md bg-ink font-mono text-[10px] text-gold">VISA</div>
                    <div>
                      <div className="text-sm font-medium text-ink">Visa ending 4242</div>
                      <div className="text-xs text-muted-foreground">Expires 09/27 · Default</div>
                    </div>
                  </div>
                  <button className="text-xs text-muted-foreground hover:text-destructive">Remove</button>
                </li>
                <li className="flex items-center justify-between rounded-2xl border border-[oklch(0_0_0/0.06)] bg-background p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-14 items-center justify-center rounded-md bg-muted text-[10px] font-medium text-ink">UPI</div>
                    <div>
                      <div className="text-sm font-medium text-ink">janedoe@okhdfc</div>
                      <div className="text-xs text-muted-foreground">Linked 12 Aug 2025</div>
                    </div>
                  </div>
                  <button className="text-xs text-muted-foreground hover:text-destructive">Remove</button>
                </li>
              </ul>
              <button className="mt-6 inline-flex items-center gap-2 rounded-[14px] border border-dashed border-border px-4 py-2.5 text-sm hover:bg-muted">+ Add new method</button>
            </div>
            <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-ink p-8 text-primary-foreground shadow-soft">
              <div className="eyebrow text-primary-foreground/60">Billing address</div>
              <div className="mt-4 space-y-1 text-sm text-primary-foreground/80">
                <div>Jane Doe</div>
                <div>27, Indiranagar 100ft Rd</div>
                <div>Bangalore, KA 560038</div>
                <div>India · GSTIN 29AAAPL1234C1Z5</div>
              </div>
              <button className="mt-6 rounded-[12px] border border-primary-foreground/20 px-4 py-2 text-xs hover:bg-primary-foreground/10">Edit address</button>
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}

export default BillingPage;
