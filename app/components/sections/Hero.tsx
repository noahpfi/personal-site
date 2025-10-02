import { RefObject } from "react";

import Reveal from "@/app/components/sections/Reveal";

export default function Hero({ heroRef }: {
  heroRef: RefObject<HTMLElement | null>;
}) {
  return (
    <section ref={heroRef} id="hero" className="min-h-[60vh] md:min-h-[80vh] scroll-mt-2 md:scroll-mt-6 flex flex-col justify-center items-center px-6 md:px-12">
      <SpinningHero/>
      <Reveal notOnce>
        <p className="text-lg md:text-xl text-center max-w-2xl text-muted-foreground">
        Hi, I'm Noah. I'm driven by a fascination for how things work — and how to make them work
        <span className="italic">
          {" "}better
        </span>
        .
        </p>
      </Reveal>
    </section>
  );
}

const MAX_NUMBER_OF_ELEMENTS = 12;

function SpinningHero() {
  const elements = Array.from({ length: MAX_NUMBER_OF_ELEMENTS });

  return (
  <section id="hero" className="flex flex-col justify-center items-center overflow-hidden">
    <div className="spinning-text-container">
    <div className="spinning-text-world">
      {elements.map((_, i) => (
      <div
        key={i}
        className="spinning-text-element text-5xl md:text-6xl lg:text-7xl font-bold"
        style={{ '--i': i } as React.CSSProperties}
      >
        {"NP"}
      </div>
      ))}
    </div>
    </div>
  </section>
  );
}