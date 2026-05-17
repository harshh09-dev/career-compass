import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Tracks } from "@/components/sections/tracks";

export default function TracksPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Tracks />
      </main>
      <SiteFooter />
    </div>
  );
}
