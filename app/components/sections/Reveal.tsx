import { useInView } from "@/app/hooks/useInView";

/**
 * Reveal animation component that shows content when it comes into view
 * @param children - Content to animate
 * @param delay - Animation delay (default: 300ms)
 * @param threshold - Intersection threshold for triggering animation (default: 0.4)
 * @param notOnce - Whether to animate every time it comes into view (default: false)
 */
export default function Reveal({ children, delay, threshold=0.4, notOnce=false }: Readonly<{
  children: React.ReactNode;
  delay?: string;
  threshold?: number;
  notOnce?: boolean;
}>) {
  const [inViewRef, inView] = useInView<HTMLDivElement>({threshold: threshold, triggerOnce: !notOnce});
  return (
    <div ref={inViewRef} className={`
      transition duration-400 animate-reveal
      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-0.5 pointer-events-none"}
    `} style={{transitionDelay: delay || "300ms"}}>
      {children}
    </div>
  );
}
