import { useState } from "react";

import Reveal from "@/app/components/Reveal";

const skillsData = {
  Frontend: [
    { 
      name: 'React & Next.js', 
      description: "Extensive experience in building dynamic and responsive user interfaces, including this site itself! I leverage features like server-side rendering, routing, and API routes to build fast and scalable web apps." 
    },
    { 
      name: 'TypeScript', 
      description: "My preferred language for larger web applications. I use it in all my React and Next.js projects to improve code quality, maintainability, and catch errors early." 
    },
    { 
      name: 'Tailwind CSS', 
      description: "I use Tailwind CSS in most of my projects to quickly create responsive designs with clean, semantic HTML and modern CSS techniques for efficient and scalable styling." 
    },
    {
      name: 'HTML/CSS',
      description: "Proficient in creating structured, semantic HTML and styling with modern CSS, including Flexbox, Grid, and responsive design principles."
    },
    { 
      name: 'Javascript', 
      description: "The core language for all my web development work, comfortable with modern ES6+ features and asynchronous programming."
    },
  ],

  'Backend & Mobile': [
    { 
      name: 'Node.js', 
      description: 'Use it for efficient and scalable server-side applications with JavaScript or TypeScript.' 
    },
    { 
      name: 'API Development', 
      description: 'I passively design convenient APIs to make my work easier as I go.' 
    },
    { 
      name: 'Database Design', 
      description: 'Used SQLite for lightweight, on-device database management in mobile applications.' 
    },
    {
      name: 'Flutter',
      description: "I’ve used Flutter to prototype a cross-platform mobile app to scan grocery store bills and know what I've got at home. Used built-in packages for camera and OCR, and interacted with a database via SQLite."
    },
    {
      name: 'React Native',
      description: "Starting out on mobile with React Native, I'm proficient with hooks, context API, state management strategies, and Expo for its streamlined workflow."
    },
    {
      name: 'Python',
      description: "Used Python in a wide range of applications for scripting, data analysis, and full-stack apps. Experimented with ML using PyTorch and TensorFlow for generative models (Text-to-Audio-Sample)."
    },
  ],

  'Low-Level & Systems': [
    {
      name: 'Java',
      description: "Solid foundation in object-oriented programming with Java, applied in various projects exploring multithreading, state machines, pathfinding algorithms (optimized A*), computer vision, and ML."
    },
    {
      name: 'C/C++',
      description: "Strong understanding of low-level memory management and system programming through academic coursework, embedded systems projects (ESP32, Arduino), and performance-critical applications like physics simulations and audio plugins."
    },
    {
      name: 'Rust',
      description: "Explored Rust for its promises of safety, performance, and modern syntax via audio and desktop app applications. C is dead."
    },
    {
      name: 'Embedded Systems',
      description: "Proficient in Raspberry Pi-based projects, hardware/software integration, and Linux operating systems. Also experienced with ESP32 and Arduino."
    },
  ],

  'Tools & Design': [
    { 
      name: 'Git & GitHub', 
      description: "Proficient in Git for version control, branch management, merging, and resolving conflicts." 
    },
    {
      name: 'Vite & Tauri',
      description: "Used Vite for its fast dev server and build process. Experimented with Tauri to build lightweight, secure, cross-platform desktop applications using web technologies."
    },
    { 
      name: 'Figma', 
      description: "I use Figma for designing intuitive and visually appealing user interfaces - with a good eye on layout, typography, and cohesive color schemes - this site was drafted in Figma!" 
    },
    {
      name: 'Graphic Design',
      description: "Passionate about creating visually compelling assets, with a focus on branding, layout, and user-centric design principles."
    },
    {
      name: 'Multimedia Production',
      description: "Experienced in audio production (recording, editing, mixing) and video production (filming, editing, post-production) to create polished content for diverse platforms."
    },
  ],
};

export default function Skills() {
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
              {skills.map((skill, i) => {
                const isOpen = openSkill === skill.name;
                return (
                  <Reveal delay={`${i * 20 + 50}ms`} notOnce key={skill.name}>
                    <li>
                      <div
                        className="flex gap-2 items-center cursor-pointer hover:bg-foreground/10 hover:underline underline-offset-4 rounded-xl py-1.5 px-2 -my-1.5 -mx-2"
                        onClick={() => handleSkillClick(skill.name)}
                      >
                        <p>{skill.name}</p>
                        <span className={`md:hidden delay- text-muted-foreground/70 transition-transform duration-300 ${isOpen ? '-rotate-270' : ''}`}>
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
                  </Reveal>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
