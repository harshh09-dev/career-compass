
import { Download, RefreshCcw } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";


const txns = [
  { ref: "TXN1755012003", c: "Aarav Kapoor", inv: "INV-2025-014", amt: 29500, m: "Card", s: "Success", d: "12 Aug · 11:42" },
  { ref: "TXN1755012001", c: "Aarav Kapoor", inv: "INV-2025-014", amt: 29500, m: "Card", s: "Failed", d: "12 Aug · 11:38" },
  { ref: "TXN1754920889", c: "Meera Iyer", inv: "INV-2025-013", amt: 88500, m: "UPI", s: "Success", d: "11 Aug · 09:14" },
  { ref: "TXN1754920770", c: "Rohan Shah", inv: "INV-2025-012", amt: 88500, m: "Netbanking", s: "Pending", d: "10 Aug · 18:02" },
  { ref: "TXN1754920650", c: "Sneha Reddy", inv: "INV-2025-011", amt: 29500, m: "UPI", s: "Success", d: "10 Aug · 12:09" },
  { ref: "TXN1754920640", c: "Priya Nair", inv: "INV-2025-010", amt: 29500, m: "Card", s: "Failed", d: "09 Aug · 16:55" },
];

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

function AdminPayments() {
  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <div className="eyebrow">Finance</div>
            <h1 className="mt-3 font-display text-display-md text-ink">Payments</h1>
            <p className="mt-2 text-sm text-muted-foreground">Reconciliation across Razorpay · Stripe · Bank transfers</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-[12px] border border-border bg-surface px-4 py-2.5 text-sm hover:bg-muted"><RefreshCcw className="h-4 w-4" /> Sync</button>
            <button className="inline-flex items-center gap-2 rounded-[12px] bg-ink px-4 py-2.5 text-sm text-primary-foreground hover:bg-ink/90"><Download className="h-4 w-4" /> GST report</button>
          </div>
        </div>
      </Reveal>

      <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Collected MTD", v: "₹42.8L" },
          { l: "Pending", v: "₹2.4L" },
          { l: "Refunded", v: "₹38K" },
          { l: "Failure rate", v: "3.2%" },
        ].map(c => (
          <RevealItem key={c.l} className="rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface p-5 shadow-soft">
            <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{c.l}</div>
            <div className="mt-3 font-display text-3xl text-ink">{c.v}</div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal>
        <div className="mt-8 overflow-hidden rounded-[20px] border border-[oklch(0_0_0/0.06)] bg-surface shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-background text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <tr><th className="px-6 py-3 text-left">Reference</th><th className="px-6 py-3 text-left">Candidate</th><th className="px-6 py-3 text-left">Invoice</th><th className="px-6 py-3 text-left">Method</th><th className="px-6 py-3 text-left">Date</th><th className="px-6 py-3 text-right">Amount</th><th className="px-6 py-3 text-center">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-[oklch(0_0_0/0.06)]">
              {txns.map(t => (
                <tr key={t.ref} className="hover:bg-background/60">
                  <td className="px-6 py-4 font-mono text-xs text-ink">{t.ref}</td>
                  <td className="px-6 py-4 font-medium text-ink">{t.c}</td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{t.inv}</td>
                  <td className="px-6 py-4 text-foreground">{t.m}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t.d}</td>
                  <td className="px-6 py-4 text-right font-display text-ink">{inr(t.amt)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] ${
                      t.s === "Success" ? "bg-success/10 text-success" : t.s === "Pending" ? "bg-gold/15 text-gold" : "bg-destructive/10 text-destructive"
                    }`}>{t.s}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  );
}

export default AdminPayments;
