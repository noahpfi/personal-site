'use client';

import Link from "next/link";

import { useInView } from "@/app/hooks/useInView";

export default function Home() {
  const [heroInViewRef, heroInView] = useInView({threshold: 0.4});

  return (
    <div className="bg-background p-2 md:p-6">
      <div className="border-2 border-foreground rounded-2xl overflow-clip">
        
        <main>
          
          <section ref={heroInViewRef} id="hero" className="min-h-[60vh] md:min-h-[80vh] scroll-mt-2 md:scroll-mt-6 flex flex-col justify-center items-center px-6 md:px-12 py-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6">
              Noah Pfister.
            </h1>
            <p className="text-lg md:text-xl text-center max-w-2xl text-muted-foreground">
              Hi, I'm Noah. I'm driven by a fascination for how things work — and how to make them work{" "}
              <span className="
                bg-gradient-to-r from-cyan-400 to-blue-500
                bg-clip-text
                text-transparent
              ">
                better
              </span>
              .
            </p>
          </section>

          <section id="projects" className="px-6 md:px-12 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-foreground/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">This site</h3>
                <p className="text-muted-foreground mb-4">
                  A portfolio designed and built from scratch to showcase my process in one place.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-foreground/10 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-foreground/10 rounded-full text-sm">Next.js</span>
                  <span className="px-3 py-1 bg-foreground/10 rounded-full text-sm">Tailwind</span>
                </div>
              </div>
              <div className="border border-foreground/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Dev & Design of Industrial Printhead-Cleaning Software</h3>
                <p className="text-muted-foreground mb-4">
                  Made to be functional and intuitive in industrial environments.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-foreground/10 rounded-full text-sm">TypeScript</span>
                  <span className="px-3 py-1 bg-foreground/10 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-foreground/10 rounded-full text-sm">API</span>
                </div>
              </div>
              <div className="border border-foreground/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Personal Finance Management WebTool</h3>
                <p className="text-muted-foreground mb-4">
                  To visualize, track and plan spending, from the moment this month’s paycheck rolls in.                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-foreground/10 rounded-full text-sm">React Native</span>
                  <span className="px-3 py-1 bg-foreground/10 rounded-full text-sm">Firebase</span>
                </div>
              </div>
              <div className="border border-foreground/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">AI-Driven Daily Fitness Newsletter</h3>
                <p className="text-muted-foreground mb-4">
                  Get the most recent fitness news from multiple credible sources, condensed into a 5-minute read, right into your daily inbox.                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-foreground/10 rounded-full text-sm">D3.js</span>
                  <span className="px-3 py-1 bg-foreground/10 rounded-full text-sm">Charts</span>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" className="px-6 md:px-12 py-16 bg-foreground/5">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Frontend</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>React & Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Responsive Design</li>
                  <li>UI/UX Principles</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Backend</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Node.js</li>
                  <li>API Development</li>
                  <li>Database Design</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Tools</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Git & GitHub</li>
                  <li>Docker</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="about" className="px-6 md:px-12 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
            <div className="max-w-3xl">
              <p className="text-lg text-muted-foreground mb-6">
                I'm Noah.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                My journey.
              </p>
              <p className="text-lg text-muted-foreground">
                Other shit.
              </p>
            </div>
          </section>

          <section id="contact" className="px-6 md:px-12 py-16 bg-foreground/5">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Get In Touch</h2>
            <div className="max-w-2xl">
              <p className="text-lg text-muted-foreground mb-8">
                Interested in working together? I'd love to hear from you.
              </p>
              <div className="space-y-4">
                {/* <div className="flex items-center gap-3">
                  <span className="font-semibold">Email:</span>
                  <span className="text-muted-foreground">noah.pfister@outlook.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">Location:</span>
                  <span className="text-muted-foreground">Available worldwide</span>
                </div> */}
                <span>Contact form</span>
              </div>
            </div>
          </section>

          <div className="flex flex-col justify-center items-center py-4">
            <span>© Noah Pfister</span>
          </div>

        </main>

        <Footer showFooter={!heroInView}/>

      </div>
    </div>
  );
}

function Footer({ showFooter }: Readonly<{
  showFooter: boolean;
}>) {
  return (
    <footer className="sticky bottom-0">
      <div className={`
        border-t-2 border-foreground glass-effect
        transition-opacity duration-300
        ${showFooter ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <nav className="flex justify-around items-center py-2 px-2 md:py-2 md:px-48 lg:text-2xl">
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

