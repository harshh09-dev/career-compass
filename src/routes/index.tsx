
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { RealityCheck } from "@/components/sections/reality-check";
import { Solution } from "@/components/sections/solution";
import { Tracks } from "@/components/sections/tracks";
import { Process } from "@/components/sections/process";
import { Partners } from "@/components/sections/partners";
import { ByTheNumbers } from "@/components/sections/by-the-numbers";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";


function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <RealityCheck />
        <Solution />
        <Tracks />
        <Process />
        <Partners />
        <ByTheNumbers />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}

export default Index;
