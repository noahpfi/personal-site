import { useState } from "react";

import Reveal from "@/app/components/sections/Reveal";
import { SKILLS_DATA } from "@/app/data/Data";

/**
 * Skills section component with categorized skills and expandable descriptions
 */
export default function Skills() {
  const [openSkill, setOpenSkill] = useState<string | null>(null);

  /**
   * Toggle skill description visibility
   * @param skillName - Name of the skill to toggle
   */
  const handleSkillClick = (skillName: string) => {
    setOpenSkill(openSkill === skillName ? null : skillName);
  };

  return (
    <section id="skills" className="px-6 md:px-12 py-24 bg-foreground/5">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
        {Object.entries(SKILLS_DATA).map(([category, skills]) => (
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
