import { useInView } from "@/app/hooks/useInView";

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
