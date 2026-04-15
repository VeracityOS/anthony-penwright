import { Hero } from "@/components/sections/hero";
import { Profile } from "@/components/sections/profile";
import { Stats } from "@/components/sections/stats";
import { ValuePillars } from "@/components/sections/value-pillars";
import { Frameworks } from "@/components/sections/frameworks";
import { SignatureMoments } from "@/components/sections/signature-moments";
import { CareerTimeline } from "@/components/sections/career-timeline";
import { Credentials } from "@/components/sections/credentials";
import { Competencies } from "@/components/sections/competencies";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <Profile />
      <Stats />
      <ValuePillars />
      <Frameworks />
      <SignatureMoments />
      <CareerTimeline />
      <Credentials />
      <Competencies />
      <Contact />
      <Footer />
    </main>
  );
}
