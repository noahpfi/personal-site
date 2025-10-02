import Link from "next/link";

export default function Footer({ showFooter }: Readonly<{
  showFooter: boolean;
}>) {
  return (
    <footer className="sticky bottom-0">
      <div className={`
        border-t-2 border-foreground glass-effect
        transition-opacity duration-300
        ${showFooter ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <nav className="flex justify-around items-center py-2 px-2 md:py-2 md:px-48 lg:text-2xl underline-offset-4">
          <Link href="#hero" className="hover:underline">Top</Link>
          <Link href="#projects" className="hover:underline">Projects</Link>
          <Link href="#skills" className="hover:underline">Skills</Link>
          <Link href="#about" className="hover:underline">About</Link>
          <Link href="#contact" className="hover:underline">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
