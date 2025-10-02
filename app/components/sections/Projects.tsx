import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import Reveal from "@/app/components/sections/Reveal";

import projects_layro_light from "@/public/projects/logo_farbe_hintergrund_transparent.svg";
import projects_layro_dark from "@/public/projects/logo_weiß_hintergrund_transparent.svg";

export default function Projects() {
  return (
    <section id="projects" className="px-6 md:px-12 pt-16 pb-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Reveal delay="200ms" threshold={0.1} notOnce>
          <ProjectCard
            title="This site"
            description="A portfolio designed and built from scratch to showcase my process in one place."
            stats={["Next.js", "React", "Tailwind"]}
          />
        </Reveal>
        <Reveal delay="200ms" threshold={0.1} notOnce>
        <ProjectCard
          title="Dev & Design of Industrial Printhead-Cleaning Software"
          description="Made to be functional and intuitive in industrial environments."
          stats={["Raspberry Pi", "Python", "Kivy", "API"]}
        />
        </Reveal>
        <Reveal delay="100ms" notOnce>
        <ProjectCard
          title="Logo design for industrial plotting robot"
          stats={["Affinity Suite"]}
          images={(
            <>
              <Image
                src={projects_layro_light}
                alt="Logo LAYRO"
                className="dark:hidden object-contain"
              />
              <Image
                src={projects_layro_dark}
                alt="Logo LAYRO"
                className="not-dark:hidden object-contain opactiy-95"
              />
            </>
          )}
        />
        </Reveal>
        <Reveal delay="100ms" notOnce>
        <ProjectCard
          title="Calendar/Timetable optimization WebTool"
          description="Visualize event overlaps and find optimal combinations based on several user preferences."
          stats={["Next.js", "React", "SQLite", "API", "NP Optimization"]}
          status="In Dev"
        />
        </Reveal>
        <Reveal delay="0" notOnce>
        <ProjectCard
          title="Personal Finance Management Tool"
          description="To visualize, track and plan spending, from the moment this month’s paycheck rolls in."
          stats={["Flutter", "SQLite"]}
          status="To Come"
        />
        </Reveal>
        <Reveal delay="100ms" notOnce>
        <ProjectCard
          title="AI-Driven Daily Fitness Newsletter"
          description="Get the most recent fitness news from multiple credible sources, condensed into a 5-minute read, right into your daily inbox."
          stats={["n8n", "Docker"]}
          status="To Come"
        />
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({ title, description, stats, status, images }: Readonly<{
  title: string;
  description?: string;
  stats: string[];
  status?: string;
  images?: React.ReactNode;
}>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const dragStartRef = useRef(0);
  const movementContainerRef = useRef<HTMLDivElement>(null);
  const [swipeThreshold, setSwipeThreshold] = useState(200);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [modalOpen]);

  useEffect(() => {
    const calculateThreshold = () => {
      if (movementContainerRef.current) {
        setSwipeThreshold(movementContainerRef.current.clientHeight * 0.4); // 40% modal height
      }
    };
    if (modalOpen) {
      calculateThreshold();
      window.addEventListener('resize', calculateThreshold);
      return () => window.removeEventListener('resize', calculateThreshold);
    }
  }, [modalOpen]);
  
  useEffect(() => {
    if (!modalOpen) {
      setDragY(0);
    }
  }, [modalOpen]);

  // gestures
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    dragStartRef.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchY = e.targetTouches[0].clientY;
    const deltaY = touchY - dragStartRef.current;
    if (deltaY > 0) { // only allow dragging down
      setDragY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (dragY > swipeThreshold) {
      setModalOpen(false);
    } else {
      setDragY(0);  // snap back if not closed
    }
  };

  return (
    <>
      <div 
        className="cursor-pointer border border-foreground/20 rounded-xl p-6 transition duration-300 hover:scale-[100.5%] hover:-translate-y-1 hover:shadow-xl"
        // onClick={() => setModalOpen(true)}
      >
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        {description && <p className="text-muted-foreground mb-4">{description}</p>}
        <div className="flex flex-wrap gap-2">
          {stats.map((stat, i) => (
            <span key={i} className="px-3 py-1 bg-foreground/10 rounded-full text-sm">{stat}</span>
          ))}
          {status && <span className="px-3 py-1 bg-foreground/10 rounded-full text-sm">{status}</span>}
        </div>
        {images && (
          <div className="flex flex-wrap">
            {images}
          </div>
        )}
      </div>

      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col bg-foreground/20 animate-fade-in md:justify-center md:items-center"
          onClick={() => setModalOpen(false)}
        >
          {/* drag handle (mobile only) */}
          <div
            className="flex-1 w-full md:hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />

          <div
            ref={movementContainerRef}
            className="
              relative w-full h-[70vh] md:w-[70vw] md:h-[80vh]
              transition-transform duration-300 ease-out
            "
            style={{ transform: `translateY(${dragY}px)` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* floating back arrow (mobile only) */}
            <div className="pointer-events-none absolute bottom-full left-4 mb-4 w-10 h-10 bg-background rounded-full flex items-center justify-center text-xl shadow-lg md:hidden">
              {'<'}
            </div>

            {/* modal */}
            <div
              className="
                relative w-full h-full bg-background shadow-2xl flex flex-col
                rounded-t-2xl md:rounded-2xl
              "
            >
              <div
                className="absolute top-0 left-0 w-full h-16 md:hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />

              <div className="absolute top-0 left-0 w-full h-8 flex items-center justify-center pointer-events-none">
                <div className="md:hidden w-12 h-1.5 bg-foreground/20 rounded-full" />
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 left-4 p-2 text-xl hover:underline underline-offset-4 pointer-events-auto hidden md:block"
                >
                  {'<'}
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pt-16 px-6 md:px-12 pb-12">
                <article className="prose prose-invert prose-lg max-w-none">
                <h1>{title}</h1>
                <p className="text-muted-foreground text-xl">
                  This is a detailed look into the project, its goals, challenges, and the solutions implemented.
                </p>
                <h2>The Challenge</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.</p>
                <blockquote>"This project was a turning point in our development strategy."</blockquote>
                <h2>Our Solution</h2>
                <p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.</p>
              </article>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
