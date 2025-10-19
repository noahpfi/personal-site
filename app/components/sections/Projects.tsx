import React, { useState, useRef, useEffect } from "react";

import Reveal from "@/app/components/sections/Reveal";
import BottomSheet from "@/app/components/BottomSheet";
import { Project } from "@/app/data/Types";

import { PROJECTS_DATA } from "@/app/data/Data";

/**
 * Projects section component with project cards and details in modals
 */
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
      <div className="md:hidden">
        <BottomSheet isOpen={activeProject ? true : false} onClose={() => (setActiveProject(null))}>
          {activeProject?.blog}
        </BottomSheet>
      </div>
      <div className="hidden md:block">
        <DesktopModal isOpen={activeProject ? true : false} onClose={() => (setActiveProject(null))}>
          {activeProject?.blog}
        </DesktopModal>
      </div>
    </section>
  );
}

/**
 * Desktop modal component for project details
 * @param isOpen - Whether the modal is open
 * @param onClose - Function to close the modal
 * @param children - Content to display in the modal
 */
function DesktopModal({ isOpen, onClose, children }: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // lock body scroll without layout shift due to scrollbar
  useEffect(() => {
    if (!isOpen) return;
    if (window.innerWidth < 768) return;  // only pad on desktop
    
    // get scrollbar width from CSS variable
    const scrollbarWidth = getComputedStyle(document.documentElement).getPropertyValue('--scrollbar-width');
    
    document.body.style.overflow = "hidden";
    // add padding to compensate for scrollbar width
    document.body.style.paddingRight = scrollbarWidth;
    
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  const onTransitionEnd = () => {
    if (!isOpen) {
      setIsMounted(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      onTransitionEnd={onTransitionEnd}
      className={`
        fixed inset-0 z-10 bg-black/30 
        flex flex-col
        justify-center items-center
        touch-none
        transition-opacity duration-300
        ${isAnimating ? "opacity-100" : "opacity-0"}
      `}
      aria-hidden="true"
    >
      <div
        className="
          relative w-[70vw] h-[80vh] bg-background shadow-2xl
          rounded-2xl overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-0 left-0 z-20 px-4 py-2 text-xl hover:underline underline-offset-4"
        >
          {'<'}
        </button>
        
        <div className="h-full overflow-y-auto pt-16 px-12 pb-12">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Project card component
 * @param project - Project data
 * @param onClick - Function handling card click
 */
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
          ${!project.status ? "cursor-pointer hover:scale-[100.5%] hover:-translate-y-1 hover:shadow-xl dark:shadow-foreground/20" : "bg-foreground/5"}
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
