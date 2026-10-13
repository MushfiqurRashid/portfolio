import { Footer } from "@/components/footer";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { Projects } from "@/components/sections/projects";
import { Recognition } from "@/components/sections/recognition";
import { Toolkit } from "@/components/sections/toolkit";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <MarqueeBand />
        <About />
        <Work />
        <Experience />
        <Projects />
        <Recognition />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
