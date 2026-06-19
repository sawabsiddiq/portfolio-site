import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Archive } from "@/components/sections/Archive";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { SectionDivider } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/JsonLd";
import { personSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd schema={[personSchema(), websiteSchema()]} />
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
