'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

type UseInViewOptions = IntersectionObserverInit & {
  triggerOnce?: boolean;
  initiallyTrue?: boolean;
};

/**
 * Custom hook for checking if an element is in view
 * @param options - IntersectionObserverInit options + triggerOnce and initiallyTrue options
 * @returns [ref, isInView] - Ref object and boolean indicating if element is in view
 */
export function useInView<T extends HTMLElement>(
  options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] {
  const { 
    triggerOnce = false, 
    initiallyTrue = false,
    root, 
    rootMargin, 
    threshold = 0.1
  } = options;

  const [isInView, setIsInView] = useState(initiallyTrue);
  const ref = useRef<T>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        }
        else {
          if (!triggerOnce) {
            setIsInView(false);
          }
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [triggerOnce, root, rootMargin, threshold]);

  return [ref, isInView];
}