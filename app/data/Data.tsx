import Image from "next/image";

import projects_layro_light from "@/public/projects/logo_farbe_hintergrund_transparent.svg";
import projects_layro_dark from "@/public/projects/logo_weiß_hintergrund_transparent.svg";

import about_delight from "@/public/about/delight.jpg";
import about_sole from "@/public/about/sole.jpg";
import about_blank from "@/public/about/__.jpg";
import about_love from "@/public/about/love.jpg";
import about_personalProject from "@/public/about/personal_project.jpg";
import about_studio from "@/public/about/studio.jpg";

export const PROJECTS_DATA = [
  {
    title: "This site",
    description: "A portfolio designed and built from scratch to showcase my process in one place.",
    stats: ["Next.js", "React", "Tailwind"],
    blog: (
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">This project Deep Dive hasn't yet been written :{"("}</h1>
        <p className="text-lg text-muted-foreground">
          Damn it, where did all my time go?
        </p>
      </div>
    )
  },
  {
    title: "Dev & Design of Industrial Printhead-Cleaning Software",
    description: "Made to be functional and intuitive in industrial environments.",
    stats: ["Raspberry Pi", "Python", "Kivy", "API"],
    blog: (
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">This project Deep Dive hasn't yet been written :{"("}</h1>
        <p className="text-lg text-muted-foreground">
          Damn it, where did all my time go?
        </p>
      </div>
    )
  },
  {
    title: "Logo design for industrial plotting robot",
    stats: ["Affinity Suite"],
    images: (
      <>
        <Image
          src={projects_layro_light}
          alt="Logo LAYRO"
          className="dark:hidden object-contain"
        />
        <Image
          src={projects_layro_dark}
          alt="Logo LAYRO"
          className="not-dark:hidden object-contain opactiy-95"
        />
      </>
    ),
    blog: (
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">This project Deep Dive hasn't yet been written :{"("}</h1>
        <p className="text-lg text-muted-foreground">
          Damn it, where did all my time go?
        </p>
      </div>
    )
  },
  {
    title: "Calendar/Timetable optimization WebTool",
    description: "Visualize event overlaps and find optimal combinations based on several user preferences.",
    stats: ["Next.js", "React", "SQLite", "API", "NP Optimization"],
    status: "In Dev",
    blog: (
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">This project Deep Dive hasn't yet been written :{"("}</h1>
        <p className="text-lg text-muted-foreground">
          Damn it, where did all my time go?
        </p>
      </div>
    )
  },
  {
    title: "Personal Finance Management Tool",
    description: "To visualize, track and plan spending, from the moment this month’s paycheck rolls in.",
    stats: ["Flutter", "SQLite"],
    status: "To Come",
    blog: (
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">This project Deep Dive hasn't yet been written :{"("}</h1>
        <p className="text-lg text-muted-foreground">
          Damn it, where did all my time go?
        </p>
      </div>
    )
  },
  {
    title: "AI-Driven Daily Fitness Newsletter",
    description: "Get the most recent fitness news from multiple credible sources, condensed into a 5-minute read, right into your daily inbox.",
    stats: ["n8n", "Docker"],
    status: "To Come",
    blog: (
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">This project Deep Dive hasn't yet been written :{"("}</h1>
        <p className="text-lg text-muted-foreground">
          Damn it, where did all my time go?
        </p>
      </div>
    )
  }
]

export const SKILLS_DATA = {
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

export const ABOUT_ROLES = [
  'Developer', 'Designer', 'Photographer', 
  'Musician', 'Producer', 'Athlete'
];

export const ABOUT_IMAGES = [
  { src: about_delight, alt: "delight." },
  { src: about_blank, alt: "__" },
  { src: about_sole, alt: "sole." },
  { src: about_personalProject, alt: "personal project." },
  { src: about_studio, alt: "studio." },
  { src: about_love, alt: "love." },
];
