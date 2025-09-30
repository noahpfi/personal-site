'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

type UseInViewOptions = IntersectionObserverInit & {
  triggerOnce?: boolean;
};

export function useInView(options: UseInViewOptions = {}): [RefObject<any>, boolean] {
  const { triggerOnce = false, ...observerOptions } = options;
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<Element>(null);

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
      {
        threshold: 0.1,
        ...observerOptions,
      }
    );

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, [options]);
  return [ref, isInView];
};
