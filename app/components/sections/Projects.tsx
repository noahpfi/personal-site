import React, { useState, useRef, useEffect } from "react";

import Reveal from "@/app/components/sections/Reveal";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
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

// the modal slides up and the project card below is visible fading out
// 'snappy', transitions are interfering
function ProjectModal({ project, onClose }: Readonly<{
  project: Project;
  onClose: () => void;
}>) {
  const [viewportHeight, setViewportHeight] = useState(0);

  const SNAP_POINTS = [25, 0]; // heights in vh from top of screen
  const [snapIndex, setSnapIndex] = useState(0);

  const scrollContentRef = useRef<HTMLDivElement>(null);
  const [scrolledToTop, setScrolledToTop] = useState(true);

  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const movementContainerRef = useRef<HTMLDivElement>(null);
  const [swipeThreshold, setSwipeThreshold] = useState(200);

  const [isClosing, setIsClosing] = useState(false);
  const isMinTailwindMd = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  useEffect(() => {
    const setHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    setHeight();
    window.addEventListener('resize', setHeight);
    return () => window.removeEventListener('resize', setHeight);
  }, []);

  useEffect(() => {
    const calculateThreshold = () => {
      if (movementContainerRef.current) {
        setSwipeThreshold(window.innerHeight * 0.01); // 1% vh
      }
    };
    calculateThreshold();
    window.addEventListener('resize', calculateThreshold);
    return () => window.removeEventListener('resize', calculateThreshold);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const isAtTop = e.currentTarget.scrollTop < e.currentTarget.scrollHeight * 0.5; // is above 50% part
    if (isAtTop !== scrolledToTop) {
      setScrolledToTop(isAtTop);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // match animation duration
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    dragStartRef.current = e.targetTouches[0].clientY;
    e.stopPropagation();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchY = e.targetTouches[0].clientY;
    const deltaY = touchY - dragStartRef.current;
    const contentEl = scrollContentRef.current;
    if (!contentEl) return;

    // drag down
    if (deltaY > 0 && contentEl.scrollTop === 0) {
      e.stopPropagation();
      setDragOffset(deltaY);
    }
    else {
      setDragOffset(0);
    }
  };

  const handleTouchEnd = () => {
    if (snapIndex === 0 && dragOffset > swipeThreshold) {
      handleClose();
      return;
    }
    const dragDistance = Math.abs(dragOffset);
    if (dragDistance > swipeThreshold) {
      if (dragOffset < 0 && snapIndex < SNAP_POINTS.length - 1) {
        setSnapIndex(snapIndex + 1); // snap up
      }
      else if (dragOffset > 0 && snapIndex > 0) {
        setSnapIndex(snapIndex - 1); // snap down
      }
    }
    setDragOffset(0);
  };
  
  const handleDragOnlyMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchY = e.targetTouches[0].clientY;
    const deltaY = touchY - dragStartRef.current;
    setDragOffset(deltaY);
    e.stopPropagation();
  };

  return (
    <div 
      className={`
        fixed inset-0 z-30 bg-black/30 
        md:flex md:justify-center md:items-center
        transition-opacity duration-300
        ${isClosing ? "opacity-0" : "opacity-100"}
        touch-none
      `}
      onClick={handleClose}
    >
      <div
        className="md:hidden absolute z-50 w-full"
        style={{
          bottom: isMinTailwindMd ? undefined : `${viewportHeight * ((100 - SNAP_POINTS[snapIndex] - 10) / 100)}px`,
          top: 0,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleDragOnlyMove}
        onTouchEnd={handleTouchEnd}
      />
      {/* draggable & resizable movement container */}
      <div
        ref={movementContainerRef}
        className={`
          absolute w-full bottom-0 
          md:relative md:w-[70vw] md:h-[80vh]
          ${isMinTailwindMd ? '' : (viewportHeight > 0 && !isClosing ? dragOffset !== 0 ? '' : 'transition-transform duration-300 ease-out translate-y-0' : 'transition-transform duration-300 ease-out translate-y-full')}
        `}
        style={{
          top: isMinTailwindMd ? undefined : `${viewportHeight * (SNAP_POINTS[snapIndex] / 100)}px`,
          transform: `translateY(${dragOffset}px)`,
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* floating back arrow (mobile only) */}
        <div className="md:hidden pointer-events-none absolute bottom-full left-4 mb-4 w-10 h-10 bg-background/75 dark:bg-foreground/10 rounded-full flex items-center justify-center text-xl shadow-lg">
          {'<'}
        </div>

        {/* main modal */}
        <div
          className="
            relative w-full h-full bg-background shadow-2xl flex flex-col
            rounded-t-2xl md:rounded-2xl overflow-clip
          "
        >
          {/* visual handle (mobile only) */}
          <div className="md:hidden absolute top-0 left-0 w-full h-4 flex items-center justify-center pointer-events-none bg-background border-b border-b-foreground/20">
            <div className="w-12 h-1.5 bg-foreground/20 rounded-full"/>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-4 left-4 p-2 text-xl hover:underline underline-offset-4 pointer-events-auto hidden md:block"
          >
            {'<'}
          </button>
          
          {/* scrollable content */}
          <div ref={scrollContentRef} onScroll={handleScroll} className={`
            flex-1 overflow-y-auto
            touch-pan-y md:touch-auto
            ${scrolledToTop ? "overscroll-y-none" : "overscroll-y-auto"} md:overscroll-auto
            pt-16 px-6 md:px-12 pb-12`
          }>
            <article>
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
        className={`
          border border-foreground/20 rounded-xl p-6
          transition duration-300
          ${!project.status && "cursor-pointer hover:scale-[100.5%] hover:-translate-y-1 hover:shadow-xl"}
        `}
        onClick={!project.status ? onClick : () => {return}}
      >
        <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
        {project.description && <p className="text-muted-foreground mb-4">{project.description}</p>}
        <div className="flex flex-wrap gap-2">
          {project.stats.map((stat, i) => (
            <span key={i} className="px-3 py-1 bg-foreground/10 rounded-full text-sm">{stat}</span>
          ))}
          {project.status && <span className="px-3 py-1 bg-foreground/10 rounded-full text-sm">{project.status}</span>}
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
