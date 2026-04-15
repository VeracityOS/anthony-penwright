import { Hero } from "@/components/sections/hero";
import { Profile } from "@/components/sections/profile";
import { Stats } from "@/components/sections/stats";
import { ValuePillars } from "@/components/sections/value-pillars";
import { Capabilities } from "@/components/sections/capabilities";
import { Frameworks } from "@/components/sections/frameworks";
import { SignatureMoments } from "@/components/sections/signature-moments";
import { CareerTimeline } from "@/components/sections/career-timeline";
import { Credentials } from "@/components/sections/credentials";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { ImageDivider } from "@/components/ui/image-divider";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <Profile />
      <ImageDivider src="/images/divider-washes.jpg" />
      <Stats />
      <ImageDivider src="/images/divider-topography.jpg" />
      <ValuePillars />
      <ImageDivider src="/images/divider-blueprint.jpg" />
      <Capabilities />
      <ImageDivider src="/images/divider-constellation.jpg" />
      <Frameworks />
      <ImageDivider src="/images/divider-topography.jpg" />
      <SignatureMoments />
      <ImageDivider src="/images/divider-blueprint.jpg" />
      <CareerTimeline />
      <ImageDivider src="/images/divider-washes.jpg" />
      <Credentials />
      <ImageDivider src="/images/divider-constellation.jpg" />
      <Contact />
      <Footer />
    </main>
  );
}
