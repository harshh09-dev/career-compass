import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "../reveal";

export function Hero() {
  return (
    <section className="grain relative overflow-hidden border-b border-[oklch(0_0_0/0.06)]">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-12 lg:pb-32 lg:pt-28">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0_0_0/0.08)] bg-surface/70 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Cohort 14 · Now Enrolling
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-8 max-w-5xl font-display text-display-xl font-medium text-ink">
            Stop Applying.
            <span className="block italic text-muted-foreground">Start Getting Hired.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A 12-week placement consultancy for ambitious graduates. We train you, certify
            you, and place you in roles worth keeping — backed by a written outcome guarantee.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/apply"
              className="group inline-flex items-center gap-2 rounded-[14px] bg-ink px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold"
            >
              Begin Application
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/process"
              className="inline-flex items-center gap-2 rounded-[14px] border border-[oklch(0_0_0/0.12)] bg-surface/70 px-7 py-3.5 text-sm font-medium text-ink backdrop-blur transition-colors hover:bg-surface"
            >
              How the program works
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-20 grid max-w-4xl grid-cols-2 gap-y-10 border-t border-[oklch(0_0_0/0.08)] pt-10 sm:grid-cols-4">
            {[
              { v: "94%", l: "Placement rate" },
              { v: "₹7.2L", l: "Avg. package" },
              { v: "180+", l: "Hiring partners" },
              { v: "12 wk", l: "To get hired" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
              >
                <div className="font-display text-4xl font-medium text-ink lg:text-5xl">{s.v}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Decorative editorial accent */}
      <div className="pointer-events-none absolute -right-32 top-32 h-[480px] w-[480px] rounded-full bg-gold-muted/30 blur-3xl" aria-hidden />
    </section>
  );
}
