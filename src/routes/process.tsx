import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Process } from "@/components/sections/process";
import { Solution } from "@/components/sections/solution";

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Process />
        <Solution />
      </main>
      <SiteFooter />
    </div>
  );
}
