'use client';

import { useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MorphValues {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: string;
}


/**
 * Mouse tracking circle/shape-morph animation overlay
 * Shape-morphs to elements with the 'data-morph-target' prop
 */
export default function AnimationOverlay() {
  const cursorRef = useRef<HTMLDivElement>(null);
	const hoveredElementRef = useRef<HTMLElement | null>(null);
  const mousePos = useRef<MousePosition>({ x: -100, y: -100 });
  const defaultPadding = 20;    // px
  
  const currentValues = useRef<Omit<MorphValues, 'borderRadius'>>({
    x: -100,
    y: -100,
    width: 20,
    height: 20,
  });

  const targetValues = useRef<MorphValues>({
    x: -100,
    y: -100,
    width: 20,
    height: 20,
    borderRadius: '50%',
  });
  
  const isHovering = useRef<boolean>(false);

  // easing function that accelerates with larger differences
  const customEase = (current: number, target: number): number => {
      const diff = target - current;
      // speed is proportional to the distance
      const speed = 0.1 + Math.abs(diff) * 0.001; 
      return current + diff * Math.min(speed, 0.3); // cap speed
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = { x: event.clientX, y: event.clientY };
      // follow mouse mode
      if (!isHovering.current) {
          targetValues.current.x = event.clientX;
          targetValues.current.y = event.clientY;
      }
    };

    const animate = () => {
			// scroll correction
      if (isHovering.current && hoveredElementRef.current) {
        const rect = hoveredElementRef.current.getBoundingClientRect();
      	const styles = window.getComputedStyle(hoveredElementRef.current);

				targetValues.current = {
					width: styles.padding == "0px" ? rect.width + defaultPadding : rect.width,
					height: styles.padding == "0px" ? rect.height + defaultPadding : rect.height,
					x: rect.left + rect.width / 2,
					y: rect.top + rect.height / 2,
					borderRadius: styles.borderRadius == "0px" ? "12px" : styles.borderRadius,
				};
      }
    
      currentValues.current.x = customEase(currentValues.current.x, targetValues.current.x);
      currentValues.current.y = customEase(currentValues.current.y, targetValues.current.y);
      currentValues.current.width = customEase(currentValues.current.width, targetValues.current.width);
      currentValues.current.height = customEase(currentValues.current.height, targetValues.current.height);

      if (cursorRef.current) {
        cursorRef.current.style.width = `${currentValues.current.width}px`;
        cursorRef.current.style.height = `${currentValues.current.height}px`;
        cursorRef.current.style.borderRadius = targetValues.current.borderRadius;
        
        cursorRef.current.style.transform = `translate(${currentValues.current.x - currentValues.current.width / 2}px, ${currentValues.current.y - currentValues.current.height / 2}px)`;
      }
      
      requestAnimationFrame(animate);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      isHovering.current = true;
      const target = e.currentTarget as HTMLElement;
			hoveredElementRef.current = target;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
			hoveredElementRef.current = null; 
      // reset to default circle shape
      targetValues.current = {
        width: 20,
        height: 20,
        x: mousePos.current.x,
        y: mousePos.current.y,
        borderRadius: '50%',
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationFrameId = requestAnimationFrame(animate);

    // find all elements with the data-morph-target attribute and attach event listeners
    const morphTargets = document.querySelectorAll('[data-morph-target]');
    morphTargets.forEach(target => {
      target.addEventListener('mouseenter', handleMouseEnter as EventListener);
      target.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      morphTargets.forEach(target => {
        target.removeEventListener('mouseenter', handleMouseEnter as EventListener);
        target.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none border z-10"
      style={{
        transition: 'border-radius 0.3s ease-out',
        willChange: 'transform, width, height, border-radius',
      }}
    />
  );
};
