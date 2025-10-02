'use client';

import { useInView } from "@/app/hooks/useInView";
import Reveal from "@/app/components/Reveal";

import Hero from "@/app/components/Hero";
import Projects from "@/app/components/Projects";
import Skills from "@/app/components/Skills";
import Contact from "@/app/components/Contact";
import About from "@/app/components/About";
import Footer from "@/app/components/Footer";

export default function Home() {
  const [heroInViewRef, heroInView] = useInView<HTMLElement>({threshold: 0.4});

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
