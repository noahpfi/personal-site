import Image from "next/image";

import AudioPreview from "@/app/components/AudioPreview";

import projects_dipl_home from "@/public/projects/Home.jpg";
import projects_dipl_program from "@/public/projects/Program.jpg";
import projects_dipl_debug from "@/public/projects/Debug_3-2.jpg";

import projects_layro_light from "@/public/projects/logo_farbe_hintergrund_transparent.svg";
import projects_layro_dark from "@/public/projects/logo_weiß_hintergrund_transparent.svg";

import projects_sampleAI_wave808_1 from "@/public/projects/808_1.png";
import projects_sampleAI_wave808_3 from "@/public/projects/808_3.png";
import projects_sampleAI_waveSAIL_808 from "@/public/projects/SAIL_808.png";

import about_delight from "@/public/about/delight.jpg";
import about_sole from "@/public/about/sole.jpg";
import about_blank from "@/public/about/__.jpg";
import about_love from "@/public/about/love.jpg";
import about_personalProject from "@/public/about/personal_project.jpg";
import about_studio from "@/public/about/studio.jpg";

const AUDIO_SAMPLES = [
  {
    audioSrc: "/projects/808_1.mp3",
    waveformSrc: projects_sampleAI_wave808_1,
    alt: 'Waveform of a punchy 808 bass sound',
  },
  {
    audioSrc: "/projects/808_3.mp3",
    waveformSrc: projects_sampleAI_wave808_3,
    alt: 'Waveform of a clean 808 bass sound',
  },
  {
    audioSrc: "/projects/SAIL_808.mp3",
    waveformSrc: projects_sampleAI_waveSAIL_808,
    alt: 'Waveform of a distorted 808 bass sound',
  },
];

export const PROJECTS_DATA = [
  {
    title: "This site",
    description: "A portfolio designed and built from scratch to showcase my process in one place.",
    stats: ["Next.js", "React", "Tailwind"],
    blog: (
      <div className="space-y-8">
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
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold">Bringing Industrial Printheads Back to Life</h1>
        <p className="text-lg text-muted-foreground">
          This was my collegue and I's Diplomarbeit, the final thesis project for HTL.
          The task was to take an unfinished, bare-bones prototype from an industrial printing company (aeoon) and turn it into a fully functional,
          user-friendly machine that could save them a small fortune.
        </p>
        
        <div>
          <h2 className="text-2xl font-semibold mb-3">The Problem</h2>
          <p className="text-muted-foreground">
            Industrial printheads, worth about €5000 a piece, get clogged with ink and become expensive paperweights.
            The company had a rough mechanical concept for a flushing unit,
            but the electrical and software side was a blank slate.
            Our job was to bring it to life—my collegue did the mechanical part, i did the software part.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Core Technologies</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong className="font-semibold text-foreground">Raspberry Pi:</strong> The brain.
              Powerful enough to run a modern UI and control all the hardware,
              but small and simple enough for an embedded system.
            </p>
            <p>
              <strong className="font-semibold text-foreground">Python:</strong> The perfect fit for a device that needed solid logic without crazy performance demands.
              It let me focus on the 'what' (the cleaning process) instead of spending all my time in the low-level 'how' of C++.
            </p>
            <p>
              <strong className="font-semibold text-foreground">Kivy:</strong> A Python GUI library that's honestly great for building custom touch interfaces.
              It's cross-platform, so it runs smoothly on the Pi, and its open-source license meant the company could actually use it commercially.
            </p>
            <p>
              <strong className="font-semibold text-foreground">GPIO & MOSFETs:</strong> The nuts and bolts.
              I wrote the API to control the pumps and a complex array of valves directly from the Raspberry Pi's GPIO pins,
              using MOSFETs for reliable electronic switching.
            </p>
          </div>
        </div>
        
        <blockquote className="border-l-4 border-foreground/30 pl-4 italic text-muted-foreground">
          In an industrial setting, 'fancy' doesn't matter. 'Works every single time' and 'is dead simple to use'
          are the things that do. That was the entire design philosophy.
        </blockquote>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Task-Oriented Touch UI:</strong> Designed from the ground up for operators in a loud,
                busy environment. Big buttons, clear iconography, and a straightforward flow—no training required.
              </li>
              <li><strong>On-the-Fly Program Control:</strong> Users can adjust the
                flushing duration and pulse frequency in real-time
                <span className="italic"> while a program is running</span>, 
                allowing them to react to how a specific printhead is responding.
              </li>
              <li><strong>Live Diagnostic View:</strong> A graphical 'debug' screen that visualizes
                the entire valve and pump system in real-time.
                It made troubleshooting during development a breeze and serves as an expert tool for maintenance.
              </li>
              <li><strong>Complex State & Logic Management:</strong> The software manages eight different
                flushing programs, each with unique valve combinations for reversing flow,
                pulsing, and waste management, all handled by a robust state machine.
              </li>
          </ul>
        </div>
        
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
          <div className="bg-muted rounded-md aspect-video flex items-center justify-center text-muted-foreground">
            <Image
              src={projects_dipl_home}
              alt="Homescreen"
              className="dark:hidden object-contain"
            />
          </div>
          <div className="bg-muted rounded-md aspect-video flex items-center justify-center text-muted-foreground">
            <Image
              src={projects_dipl_program}
              alt="Running program"
              className="dark:hidden object-contain"
            />
          </div>
          <div className="bg-muted rounded-md aspect-video flex items-center justify-center text-muted-foreground">
            <Image
              src={projects_dipl_debug}
              alt="Debug view"
              className="dark:hidden object-contain"
            />
          </div>
        </div> */}
        
        <div>
          <h2 className="text-2xl font-semibold mb-3">What I Learned</h2>
          <p className="text-muted-foreground">
            This project was a crash course in bridging the gap between hardware and software.
            The biggest lesson? Sometimes the best move is to throw out the initial plan and start clean.
            We scrapped the company's original, overly complex valve concept for a simpler,
            more robust system that ultimately worked better. It was a massive lesson in pragmatic,
            real-world engineering over theoretical perfection.
          </p>
        </div>
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
      <div className="space-y-8">
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
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold">This project Deep Dive hasn't yet been written :{"("}</h1>
        <p className="text-lg text-muted-foreground">
          Damn it, where did all my time go? 
        </p>
      </div>
    )
  },
  {
    title: "AI Audio Sample-pack Generator",
    description: "Commandline tool for creating unique audio samples using a built-from-scratch AI model.",
    stats: ["Python", "Tensorflow", "Keras", "Audio Production"],
    blog: (
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold">An AI to generate new Sounds</h1>
        <p className="text-lg text-muted-foreground">
          This was a deep dive from some time back, born from a personal itch—as a musician,
          I was tired of using the same old 808 samples.
          So, why not build an AI that could create entirely new ones?
          This became a command-line tool built around a generative model I designed and trained from scratch.
        </p>
        
        <div>
          <h2 className="text-2xl font-semibold mb-3">Goals & Objectives</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>To go beyond just using AI, and actually build and understand a generative model from the ground up.</li>
            <li>To build a practical tool that could create unique, usable audio samples for my own music projects.</li>
            <li>To create the end-to-end machine learning pipeline: from raw data to a finished, processed output.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Core Technologies</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong className="font-semibold text-foreground">Python:</strong> First choice for this kind of work—for everything from data processing to model training.
            </p>
            <p>
              <strong className="font-semibold text-foreground">Tensorflow & Keras:</strong> Used these to design and build the neural network.
              The model itself: a Variational Autoencoder (VAE) with Inverse Autoregressive Flows (IAF), to help it learn more complex and detailed sound structures.
            </p>
            <p>
              <strong className="font-semibold text-foreground">Librosa:</strong> An incredible library for audio analysis.
              I used it to handle the crucial first step: convert all the raw audio into Mel Spectrograms—basically, turning sound into 'images' so the AI could 'see' it.
            </p>
          </div>
        </div>
        
        <blockquote className="border-l-4 border-foreground/30 pl-4 italic text-muted-foreground">
          Let&apos;s be real: the final code is lost to a hard drive failure somewhere. The dataset is gone. What remains is the process, the proof of concept, and the lessons learned.
        </blockquote>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Key Features & Process</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Custom Data Pipeline:</strong> I curated a dataset of about 1000 of 808 bass samples.
                The pipeline loads, normalizes, trims or pads, and converts each one into a Mel Spectrogram for training.
              </li>
              <li><strong>Generative VAE Model:</strong> The core of the project.
                The model learned the 'essence' of what makes an 808 sound like an 808,
                allowing it to generate entirely new spectrograms from a random point in its latent space.
              </li>
              <li><strong>Audio Post-Processing Chain:</strong> Raw AI output is almost always messy.
                I built a pipeline to convert the generated spectrogram back into an audio wave,
                then automatically upsample, filter, EQ, and saturate it to make it sound clean and usable in a real track.
              </li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-3">Generated Samples</h2>
          <p className="text-muted-foreground mb-4">A few of the 808s the model generated that I managed to save:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {AUDIO_SAMPLES.map((sample) => (
            <AudioPreview
              key={sample.audioSrc}
              audioSrc={sample.audioSrc}
              waveformSrc={sample.waveformSrc}
              alt={sample.alt}
            />
          ))}
        </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-3">What I Learned (And What's Left)</h2>
          <p className="text-muted-foreground">
            This project was my hands-on deep dive into the entire ML workflow.
            The biggest takeaway was just how crucial the 'last mile' is—raw AI output is one thing,
            but building the processing pipeline to make it genuinely useful was where most of the work happened.
            It also taught me a brutal lesson in backups, lol.
            The <a href="https://github.com/noahpfi/SamplePackVAE" target="blank" className="underline underline-offset-4">Github repo</a> is incomplete,
            an artifact of what's left, but the core model and the process remain.
          </p>
        </div>
      </div>
    )
  },
  {
    title: "Personal Finance Management Tool",
    description: "To visualize, track and plan spending, from the moment this month’s paycheck rolls in.",
    stats: ["Flutter", "SQLite"],
    status: "To Come",
    blog: (
      <div className="space-y-8">
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
      <div className="space-y-8">
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
