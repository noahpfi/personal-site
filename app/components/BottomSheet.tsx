import React, { useEffect, useRef, useState } from 'react';

export default function BottomSheet({ isOpen, onClose, children, snapPoints = [75, 100, 0] }: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: number[];
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const openSnapPoints = snapPoints.filter(p => p > 0);
  const [y, setY] = useState(snapPoints[0]);

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ y: 0, modalHeight: 0, startY: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  // lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {document.body.style.overflow = ""};
  }, [isOpen]);

  // mount/unmount and enter/exit animations
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

  // unmount the component after animation
  const onTransitionEnd = () => {
    if (!isOpen) {
      setIsMounted(false);
      setY(snapPoints[0]);
    }
  };

  // drag handlers for touch start and move
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    setIsDragging(true);
    dragStartRef.current = {
      y: e.touches[0].clientY,
      modalHeight: modalRef.current.offsetHeight,
      startY: y,
    };
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const currentTouchY = e.touches[0].clientY;
    const deltaY = currentTouchY - dragStartRef.current.y;
    const newHeightPx = dragStartRef.current.modalHeight - deltaY;
    const newHeightPercent = (newHeightPx / window.innerHeight) * 100;
    setY(Math.max(0, Math.min(100, newHeightPercent)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const { startY } = dragStartRef.current;

    // if no 'open' snap points, close
    if (openSnapPoints.length === 0) {
      onClose();
      return;
    }

    const lowestOpenPoint = Math.min(...openSnapPoints);
    // drag start at lowest snap point
    if (startY === lowestOpenPoint) {
      const closeThreshold = lowestOpenPoint * 0.8; // 20% drag below closes
      if (y < closeThreshold) {
        setY(0);
        onClose();
        return;
      }
    }
    // else find closest point to snap to (if lowest (0), close)
    const closestPoint = snapPoints.reduce((prev, curr) => {
      return (Math.abs(curr - y) < Math.abs(prev - y) ? curr : prev);
    });
    if (closestPoint == 0) {
      onClose();
    }
    else {
      setY(closestPoint);
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
        touch-none
        transition-opacity duration-300
        ${isAnimating ? "opacity-100" : "opacity-0"}
      `}
      aria-hidden="true"
    >
      {/* drag zone (covers visual drag handle and top part of content area) */}
      <div
        className="flex-1 z-20 -m-20"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      {/* main modal */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{ height: isAnimating ? `${y}%` : "0%" }}
        className={`
          w-full bottom-0 bg-background shadow-2xl flex flex-col
          rounded-t-2xl overflow-hidden
          ${!isDragging && "transition-[height] duration-300"}
        `}
      >
        <div className="flex-shrink-0 relative top-0 left-0 w-full h-4 flex items-center justify-center touch-none border-b border-foreground/20">
          <div className="w-12 h-1.5 bg-foreground/20 rounded-full"/>
        </div>
        
        {/* scrollable content */}
        <div className={`
          flex-grow overflow-y-auto
          touch-pan-y
          px-6 pt-6 pb-12`
        }>
          {children}
        </div>
      </div>
    </div>
  );
};