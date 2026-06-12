import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Archive } from "@/components/sections/Archive";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { SectionDivider } from "@/components/ui/SectionHeader";

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <SectionDivider />
      <FeaturedWork />
      <SectionDivider />
      <Archive />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Stack />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Contact />
    </>
  );
}
