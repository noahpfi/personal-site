import React, { useState } from "react";
import Image from "next/image";

import Reveal from "@/app/components/sections/Reveal";

import { ABOUT_ROLES } from "@/app/data/Data";
import { ABOUT_IMAGES } from "@/app/data/Data";

const BASE_HUES = [0, 30, 55, 175, 200, 240];

/**
 * Generate a randomized color palette for role text styling
 * @param count - Number of colors to generate
 * @returns Array of HSL color strings
 */
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

const colorPalette = generateColorPalette(ABOUT_ROLES.length);

const ABOUT_DATA = [
  {
    trigger: "I'm Noah.",
    content: (
      <div className="space-y-4">
        <p>I don't know what you could describe me as. 'multi-faceted'? sounds stupid, but ig that gets it pretty close.</p>
        <p className="text-2xl font-medium pl-2 pt-16 md:pt-8 pb-8">
          By heart,
          <br/>
          <span>
            {ABOUT_ROLES.map((role, i) => (
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
          — how gears turn, how circuits connect. That entire time I was equally/if not more interested in software, which led me to learn multiple languages (Java, C, C++, Python, JS/TS, ..) via small projects next to that - Computer science was the natural next step, making the full transition into the digital realm. But I’m also the kind of person who gets restless with just knowing how.
        </p>
        <p>This led to a realization that the most brilliant engineering is a complete waste of time if it's solving the wrong problem.</p>
        <p>
          That's what pulled me towards the question of
          <span className="italic"> 'why'</span>
          . Why this product? Why would anyone care? I'm now pairing my technical skills with business and economics.
          My goal is to answer the
          <span className="italic"> why </span>
          before we get lost in the
          <span className="italic"> how</span>
          , and then use my technical skills to help build the right things.
        </p>
        {/* <p>- NP</p> */}
      </div>
    ),
  },
  {
    trigger: "Other shit.", // renamed for clarity
    content: (
      <div className="space-y-4">
        <p>The 'art'</p>
        <div className="flex h-[40vh] gap-4 overflow-x-auto">
          {ABOUT_IMAGES.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              className="h-full w-auto rounded-md"
              priority
            />
          ))}
        </div>
        {/* <p>Aasdasd</p> */}
      </div>
    ),
  },
];

/**
 * About section component with expandable content sections
 */
export default function About() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  /**
   * Toggle section content visibility
   * @param sectionTrigger - Trigger text for the section to toggle
   */
  const handleSectionClick = (sectionTrigger: string) => {
    setOpenSection(openSection === sectionTrigger ? null : sectionTrigger);
  };

  return (
    <section id="about" className="px-6 md:px-12 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
      <div data-morph-target className="space-y-4">
        {ABOUT_DATA.map((item, i) => {
          const isOpen = openSection === item.trigger;
          return (
            <Reveal delay={`${i * 20 + 50}ms`} notOnce key={item.trigger}>
              <div>
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
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
