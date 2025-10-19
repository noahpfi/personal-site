'use client';

import { useInView } from "@/app/hooks/useInView";
import Reveal from "@/app/components/sections/Reveal";

import Hero from "@/app/components/sections/Hero";
import Projects from "@/app/components/sections/Projects";
import Skills from "@/app/components/Skills";
import Contact from "@/app/components/sections/Contact";
import About from "@/app/components/sections/About";
import Footer from "@/app/components/sections/Footer";

export default function Home() {
  // check if hero section is in view to trigger footer reveal
  const [heroInViewRef, heroInView] = useInView<HTMLElement>({ threshold: 0.4, initiallyTrue: true });

  return (
    <div className="bg-background p-2 md:p-6">
      <div className="border-2 border-foreground rounded-2xl overflow-clip">
        <main>
          <Hero heroRef={heroInViewRef}/>
          <Projects/>
          <Skills/>
          <About/>
          <Contact/>
          <div className="flex flex-col justify-center items-center bg-foreground/5 pt-16 md:pt-24 pb-4">
            <Reveal notOnce>
              <span className="text-xs md:text-base">© Noah Pfister</span>
            </Reveal>
          </div>
        </main>
        <Footer showFooter={!heroInView}/>
      </div>
    </div>
  );
}
