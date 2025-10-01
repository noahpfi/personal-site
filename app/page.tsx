'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { useInView } from "@/app/hooks/useInView";
import { sendEmail } from "@/app/actions";

import projects_layro from "@/public/projects/logo_farbe_hintergrund_transparent.svg";
import about_delight from "@/public/about/delight.jpg";
import about_sole from "@/public/about/sole.jpg";
import about_blank from "@/public/about/__.jpg";
import about_love from "@/public/about/love.jpg";
import about_personalProject from "@/public/about/personal_project.jpg";
import about_studio from "@/public/about/studio.jpg";


const MAX_NUMBER_OF_ELEMENTS = 12;

function SpinningHero() {
  const elements = Array.from({ length: MAX_NUMBER_OF_ELEMENTS });

  return (
    <section id="hero" className="flex flex-col justify-center items-center overflow-hidden">
      <div className="spinning-text-container">
        <div className="spinning-text-world">
          {elements.map((_, i) => (
            <div
              key={i}
              className="spinning-text-element text-5xl md:text-6xl lg:text-7xl font-bold"
              style={{ '--i': i } as React.CSSProperties}
            >
              {"NP"}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [heroInViewRef, heroInView] = useInView({threshold: 0.4});

  return (
    <div className="bg-background p-2 md:p-6">
      <div className="border-2 border-foreground rounded-2xl overflow-clip">
        
        <main>
          
          <section ref={heroInViewRef} id="hero" className="min-h-[60vh] md:min-h-[80vh] scroll-mt-2 md:scroll-mt-6 flex flex-col justify-center items-center px-6 md:px-12">
            {/* <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6">
              NP
            </h1> */}
            <SpinningHero/>
            <p className="text-lg md:text-xl text-center max-w-2xl text-muted-foreground">
              Hi, I'm Noah. I'm driven by a fascination for how things work — and how to make them work{" "}
              {/* <span className="
                bg-gradient-to-r from-cyan-400 to-blue-500
                bg-clip-text
                text-transparent
              ">
                better
              </span> */}
              <span className="italic">
                better
              </span>
              .
            </p>
          </section>

          <section id="projects" className="px-6 md:px-12 pt-16 pb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProjectCard
                title="This site"
                description="A portfolio designed and built from scratch to showcase my process in one place."
                stats={["Next.js", "React", "Tailwind"]}
              />
              <ProjectCard
                title="Dev & Design of Industrial Printhead-Cleaning Software"
                description="Made to be functional and intuitive in industrial environments."
                stats={["Raspberry Pi", "Python", "Kivy", "API"]}
              />
              <ProjectCard
                title="Logo design for industrial plotting robot"
                stats={["Affinity Suite"]}
                images={(
                  <Image
                    src={projects_layro}
                    alt="Logo LAYRO"
                    objectFit="contain"
                  />
                )}
              />
              <ProjectCard
                title="Calendar/Timetable optimization WebTool"
                description="Visualize event overlaps and find optimal combinations based on several user preferences."
                stats={["Next.js", "React", "SQLite", "API", "NP Optimization"]}
                status="In Dev"
              />
              <ProjectCard
                title="Personal Finance Management Tool"
                description="To visualize, track and plan spending, from the moment this month’s paycheck rolls in."
                stats={["Flutter", "SQLite"]}
                status="To Come"
              />
              <ProjectCard
                title="AI-Driven Daily Fitness Newsletter"
                description="Get the most recent fitness news from multiple credible sources, condensed into a 5-minute read, right into your daily inbox."
                stats={["n8n", "Docker"]}
                status="To Come"
              />
            </div>
          </section>

          <SkillsSection/>

          <AboutMeSection/>

          <section id="contact" className="px-6 md:px-12 py-24 bg-foreground/5">
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
                <ContactForm/>
              </div>
            </div>
          </section>

          <div className="flex flex-col justify-center items-center bg-foreground/5 pt-16 md:pt-24 pb-4">
            <span className="text-xs md:text-base">© Noah Pfister</span>
          </div>

        </main>

        <Footer showFooter={!heroInView}/>

      </div>
    </div>
  );
}

const skillsData = {
  Frontend: [
    { name: 'React & Next.js', description: 'Building fast, scalable, and modern web applications with the most popular React framework.' },
    { name: 'TypeScript', description: 'Ensuring code quality and maintainability with static typing for large-scale projects.' },
    { name: 'Tailwind CSS', description: 'Rapidly creating beautiful, custom user interfaces with a utility-first CSS framework.' },
    { name: 'Responsive Design', description: 'Crafting layouts that provide an optimal viewing experience across a wide range of devices.' },
    { name: 'UI/UX Principles', description: 'Focusing on user-centered design to create intuitive, accessible, and engaging interfaces.' },
  ],
  Backend: [
    { name: 'Node.js', description: 'Developing efficient and scalable server-side applications using JavaScript.' },
    { name: 'API Development', description: 'Designing and building robust RESTful and GraphQL APIs for seamless data communication.' },
    { name: 'Database Design', description: 'Structuring and managing relational and NoSQL databases for optimal performance and integrity.' },
  ],
  Tools: [
    { name: 'Git & GitHub', description: 'Utilizing version control for collaborative development, code management, and CI/CD workflows.' },
    { name: 'Docker', description: 'Containerizing applications to ensure consistent development and deployment environments.' },
  ],
};


function SkillsSection() {
  const [openSkill, setOpenSkill] = useState<string | null>(null);

  const handleSkillClick = (skillName: string) => {
    setOpenSkill(openSkill === skillName ? null : skillName);
  };

  return (
    <section id="skills" className="px-6 md:px-12 py-24 bg-foreground/5">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            <ul className="space-y-2 text-muted-foreground">
              {skills.map((skill) => {
                const isOpen = openSkill === skill.name;
                return (
                  <li key={skill.name}>
                    <div
                      className="flex gap-2 items-center cursor-pointer hover:bg-foreground/10 hover:underline underline-offset-4 rounded-xl py-1.5 px-2 -my-1.5 -mx-2"
                      onClick={() => handleSkillClick(skill.name)}
                    >
                      <p>{skill.name}</p>
                      <span className={`md:hidden text-muted-foreground/70 transition-transform duration-300 ${isOpen ? '-rotate-270' : ''}`}>
                        {">"}
                        {/* › */}
                      </span>
                    </div>
                    <div
                      className={`
                        grid overflow-hidden transition-all duration-300 ease-in-out
                        ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                      `}
                    >
                      <div className="overflow-hidden">
                         <div className="mt-3 p-3 bg-foreground/10 text-sm rounded-lg">
                           {skill.description}
                         </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ title, description, stats, status, images }: Readonly<{
  title: string;
  description?: string;
  stats: string[];
  status?: string;
  images?: React.ReactNode;
}>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const dragStartRef = useRef(0);
  const movementContainerRef = useRef<HTMLDivElement>(null);
  const [swipeThreshold, setSwipeThreshold] = useState(200);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [modalOpen]);

  useEffect(() => {
    const calculateThreshold = () => {
      if (movementContainerRef.current) {
        setSwipeThreshold(movementContainerRef.current.clientHeight * 0.4); // 40% modal height
      }
    };
    if (modalOpen) {
      calculateThreshold();
      window.addEventListener('resize', calculateThreshold);
      return () => window.removeEventListener('resize', calculateThreshold);
    }
  }, [modalOpen]);
  
  useEffect(() => {
    if (!modalOpen) {
      setDragY(0);
    }
  }, [modalOpen]);

  // gestures
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    dragStartRef.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchY = e.targetTouches[0].clientY;
    const deltaY = touchY - dragStartRef.current;
    if (deltaY > 0) { // only allow dragging down
      setDragY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (dragY > swipeThreshold) {
      setModalOpen(false);
    } else {
      setDragY(0);  // snap back if not closed
    }
  };

  return (
    <>
      <div 
        className="cursor-pointer border border-foreground/20 rounded-xl p-6 transition duration-300 hover:scale-[100.5%] hover:-translate-y-1 hover:shadow-xl"
        // onClick={() => setModalOpen(true)}
      >
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        {description && <p className="text-muted-foreground mb-4">{description}</p>}
        <div className="flex flex-wrap gap-2">
          {stats.map((stat, i) => (
            <span key={i} className="px-3 py-1 bg-foreground/10 rounded-full text-sm">{stat}</span>
          ))}
          {status && <span className="px-3 py-1 bg-foreground/10 rounded-full text-sm">{status}</span>}
        </div>
        {images && (
          <div className="flex flex-wrap">
            {images}
          </div>
        )}
      </div>

      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col bg-foreground/20 animate-fade-in md:justify-center md:items-center"
          onClick={() => setModalOpen(false)}
        >
          {/* drag handle (mobile only) */}
          <div
            className="flex-1 w-full md:hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />

          <div
            ref={movementContainerRef}
            className="
              relative w-full h-[70vh] md:w-[70vw] md:h-[80vh]
              transition-transform duration-300 ease-out
            "
            style={{ transform: `translateY(${dragY}px)` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* floating back arrow (mobile only) */}
            <div className="pointer-events-none absolute bottom-full left-4 mb-4 w-10 h-10 bg-background rounded-full flex items-center justify-center text-xl shadow-lg md:hidden">
              {'<'}
            </div>

            {/* modal */}
            <div
              className="
                relative w-full h-full bg-background shadow-2xl flex flex-col
                rounded-t-2xl md:rounded-2xl
              "
            >
              <div
                className="absolute top-0 left-0 w-full h-16 md:hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />

              <div className="absolute top-0 left-0 w-full h-8 flex items-center justify-center pointer-events-none">
                <div className="md:hidden w-12 h-1.5 bg-foreground/20 rounded-full" />
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 left-4 p-2 text-xl hover:underline underline-offset-4 pointer-events-auto hidden md:block"
                >
                  {'<'}
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pt-16 px-6 md:px-12 pb-12">
                <article className="prose prose-invert prose-lg max-w-none">
                <h1>{title}</h1>
                <p className="text-muted-foreground text-xl">
                  This is a detailed look into the project, its goals, challenges, and the solutions implemented.
                </p>
                <h2>The Challenge</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.</p>
                <blockquote>"This project was a turning point in our development strategy."</blockquote>
                <h2>Our Solution</h2>
                <p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.</p>
              </article>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const ROLES = [
  'Developer', 'Designer', 'Photographer', 
  'Musician', 'Producer', 'Athlete'
];

const BASE_HUES = [0, 30, 55, 175, 200, 240];

const generateColorPalette = (count: number): string[] => {
  const palette: string[] = [];

  // 1. Create a shuffled copy of the base hues to ensure variety on each load.
  const shuffledHues = [...BASE_HUES].sort(() => 0.5 - Math.random());

  for (let i = 0; i < count; i++) {
    // 2. Pick a hue, looping back if we run out of unique base hues.
    const hue = shuffledHues[i % shuffledHues.length];

    // 3. Adjust Saturation and Lightness for the "less intense" feel
    const saturation = 75; // % - Lower for more desaturation.
    const lightness = 60;  // % - Lower for darker, higher for lighter.

    // 4. Generate the HSL color string.
    // CSS variables will be used for light/dark mode adaptation.
    // The browser will compute the final color based on the CSS variable values.
    const color = `hsl(${hue}, ${saturation}%, var(--role-text-lightness, ${lightness}%))`;
    
    palette.push(color);
  }
  return palette;
};

const colorPalette = generateColorPalette(ROLES.length);

const aboutImages = [
  { src: about_delight, alt: "delight." },
  { src: about_blank, alt: "__" },
  { src: about_sole, alt: "sole." },
  { src: about_personalProject, alt: "personal project." },
  { src: about_studio, alt: "studio." },
  { src: about_love, alt: "love." },
];

const aboutData = [
  {
    trigger: "I'm Noah.",
    content: (
      <div className="space-y-4">
        <p>I don't know what you could describe me as. 'multi-faceted'? sounds stupid, but ig that gets it pretty close.</p>
        <p className="text-2xl font-medium pl-2 pt-16 md:pt-8 pb-8">
          By heart,
          <br/>
          <span>
            {ROLES.map((role, i) => (
              <React.Fragment key={role}>
                <span style={{ color: colorPalette[i] }}>{role},</span>
                <br/>
              </React.Fragment>
            ))}
            Dreamer.
          </span>
        </p>
      </div>
    ),
  },
  {
    trigger: "The journey.",
    content: (
      <div className="space-y-4">
        <p>
          My technical school background taught me the logic of
          <span className="italic"> 'how' </span>
          — how gears turn, how circuits connect. Computer science was the natural next step, translating that 'how' into the digital realm. But I’m the kind of person who gets restless with just knowing how.
        </p>
        <p>It led to a pretty stupid realization: the most brilliant engineering is a complete waste of time if it's solving the wrong problem.</p>
        <p>
          That's what pulled me towards the question of
          <span className="italic"> 'why' </span>
          . Why this product? Why would anyone care? That's why I'm now pairing my technical skills with business and economics.
          My goal is to answer the
          <span className="italic"> why </span>
          before we get lost in the
          <span className="italic"> how </span>
          , so I can actually use my technical skills to help build the right things.
        </p>
        {/* <p>- NP</p> */}
      </div>
    ),
  },
  {
    trigger: "Other shit.", // renamed for clarity
    // content: (
    //   <div className="space-y-4">
    //     <div className="flex h-[40vh] gap-4 overflow-x-auto">
    //       {aboutImages.map((image, index) => (
    //         <Image
    //           key={index}
    //           src={image.src}
    //           alt={image.alt}
    //           className="h-full w-auto rounded-md"
    //         />
    //       ))}
    //     </div>
    //   </div>
    // ),
    content: (
      <div className="space-y-4">
        <p>The 'art'</p>
        <div className="flex h-[40vh] gap-4 overflow-x-auto">
          {aboutImages.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              className="h-full w-auto rounded-md"
            />
          ))}
        </div>
        {/* <p>Aasdasd</p> */}
      </div>
    ),
    // content: (
    //   <div className="space-y-4">
    //     <div className="flex h-[40vh] gap-4 overflow-x-auto">
    //       {aboutImages.map((image, index) => (
    //         <div key={index} className="relative group flex-shrink-0">
    //           <Image
    //             src={image.src}
    //             alt={image.alt}
    //             className="h-full w-auto rounded-md"
    //           />
    //           <div 
    //             className="
    //               absolute inset-0 flex items-end justify-center p-4
    //               opacity-0 group-hover:opacity-100 
    //               transition-opacity duration-300
    //             "
    //           >
    //             <p className="text-background text-center text-sm py-2 px-4 rounded-full bg-foreground/50">
    //               {image.alt}
    //             </p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // ),
  },
];


function AboutMeSection() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleSectionClick = (sectionTrigger: string) => {
    setOpenSection(openSection === sectionTrigger ? null : sectionTrigger);
  };

  return (
    <section id="about" className="px-6 md:px-12 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
      <div className="space-y-4">
        {aboutData.map((item) => {
          const isOpen = openSection === item.trigger;
          return (
            <div key={item.trigger}>
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-foreground/5 hover:underline underline-offset-4 rounded-lg p-2 -m-2"
                onClick={() => handleSectionClick(item.trigger)}
              >
                <p className="text-lg text-muted-foreground">{item.trigger}</p>
                <span className={`md:hidden text-muted-foreground/70 transition-transform duration-300 ${isOpen ? '-rotate-270' : ''}`}>
                  {">"}
                </span>
              </div>
              
              <div
                className={`
                  grid overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                `}
              >
                <div className="overflow-hidden">
                  <div className="mt-4 p-4 bg-foreground/5 rounded-lg text-muted-foreground">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("Send >");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Sending..');

    const response = await sendEmail({ email, message });

    if (response.success) {
      setStatus(response.message);
      setEmail('');
      setMessage('');
    } else {
      setStatus(response.message || "Please try again >");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="w-full flex flex-col gap-1 md:gap-2">
          <label htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              p-2 bg-foreground/5
              border border-foreground/80 rounded-xl
              focus:outline-none focus:border-2 focus:m-[-1px]
            "
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 md:gap-2">
        <label htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="
            p-2 bg-foreground/5 
            border border-foreground/80 rounded-xl
            resize-none
            focus:outline-none focus:border-2 focus:m-[-1px]
          "
        />
      </div>
      <button
        type="submit" 
        className="
          self-start
          mt-4 text-xl font-semibold text-left 
          hover:underline underline-offset-4
        "
      >
        {status}
      </button>
    </form>
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

