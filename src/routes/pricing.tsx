import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Pricing />
        <FAQ />
      </main>
      <SiteFooter />
    </div>
  );
}
