import React, { useState, useRef, useEffect } from "react";

import Reveal from "@/app/components/sections/Reveal";
import { Project } from "@/app/data/Types";

import { PROJECTS_DATA } from "@/app/data/Data";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="px-6 md:px-12 pt-16 pb-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS_DATA.map((project, i) => (
          <Reveal key={i} delay={`${i % 2 ? 150 : 100}ms`} threshold={i < 2 ? 0.1 : 0.4} notOnce>
            <ProjectCard
              project={project}
              onClick={() => setActiveProject(project)}
            />
          </Reveal>
        ))}
      </div>
      {activeProject && (
        <ProjectModal 
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}

function ProjectModal({ project, onClose }: Readonly<{
  project: Project;
  onClose: () => void;
}>) {
  const [dragY, setDragY] = useState(0);
  const dragStartRef = useRef(0);
  const movementContainerRef = useRef<HTMLDivElement>(null);
  const [swipeThreshold, setSwipeThreshold] = useState(200);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  useEffect(() => {
    const calculateThreshold = () => {
      if (movementContainerRef.current) {
        setSwipeThreshold(movementContainerRef.current.clientHeight * 0.4); // 40% modal height
      }
    };
    calculateThreshold();
    window.addEventListener('resize', calculateThreshold);
    return () => window.removeEventListener('resize', calculateThreshold);
  }, []);

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
      onClose();
    }
    else {
      setDragY(0);  // snap back if not closed
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-foreground/20 animate-fade-in md:justify-center md:items-center"
      onClick={onClose}
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
              onClick={onClose}
              className="absolute top-4 left-4 p-2 text-xl hover:underline underline-offset-4 pointer-events-auto hidden md:block"
            >
              {'<'}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pt-16 px-6 md:px-12 pb-12">
            <article className="prose prose-invert prose-lg max-w-none">
            {project.blog}
          </article>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }: Readonly<{
  project: Project;
  onClick: () => void;
}>) { 
  return (
    <>
      <div 
        className="cursor-pointer border border-foreground/20 rounded-xl p-6 transition duration-300 hover:scale-[100.5%] hover:-translate-y-1 hover:shadow-xl"
        onClick={onClick}
      >
        <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
        {project.description && <p className="text-muted-foreground mb-4">{project.description}</p>}
        <div className="flex flex-wrap gap-2">
          {project.stats.map((stat, i) => (
            <span key={i} className="px-3 py-1 bg-foreground/10 rounded-full text-sm">{stat}</span>
          ))}
          {status && <span className="px-3 py-1 bg-foreground/10 rounded-full text-sm">{status}</span>}
        </div>
        {project.images && (
          <div className="flex flex-wrap">
            {project.images}
          </div>
        )}
      </div>
    </>
  );
}
