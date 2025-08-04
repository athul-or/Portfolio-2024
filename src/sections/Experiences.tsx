'use client'
import { FC, useRef, useState } from "react";
import aufaitlogo from "@/assets/images/aufaitlogo.png";
import nuevoscopelogo from "@/assets/images/nuevoscopelogo.png";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Experience from "@/components/Experience";

const experienceData = [
  {
    company: "Aufait Technologies",
    role: "Software Engineer",
    employmentType: "Full-time",
    startDate: "May 2023",
    endDate: "Sep 2024",
    location: "HSR Layout, Bangalore",
    description: "Developed high-performing web experiences and business applications using Microsoft Power Platform, including Power Apps, Power Automate, and Power BI.",
    techStack: ["Microsoft Power Platforms", "Dataverse"],
    logo: aufaitlogo,
  },
  {
    company: "Nuevoscope Technologies",
    role: "Fullstack Developer | Azure DevOps Engineer",
    employmentType: "Full-time",
    startDate: "Oct 2024",
    endDate: "Present",
    location: "Wework Salapuria Symbiosis, Bangalore",
    description: "Built and optimized scalable web experiences using the MERN stack, while leveraging Azure DevOps for source control, CI/CD pipelines, and deployment automation.",
    techStack: ["MERN", "Springboot", "Azure DevOps"],
    logo: nuevoscopelogo,
  },
];

const Experiences: FC = () => {
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ['start end', 'end start']
  });

  const transformTop = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const transformBottom = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  const [experienceIndex, setExperienceIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<number>(1);

  const handleClickPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setExperienceIndex(prev =>
      prev === 0 ? experienceData.length - 1 : prev - 1
    );
  };

  const handleClickNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setExperienceIndex(prev =>
      prev === experienceData.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="section" id="experience">
      <h2
        className="text-4xl md:text-7xl lg:text-8xl flex flex-col overflow-hidden"
        ref={titleRef}
      >
        <motion.span style={{ x: transformTop }} className="whitespace-nowrap">
          Now dive into my professional experience
        </motion.span>
        <motion.span
          style={{ x: transformBottom }}
          className="whitespace-nowrap self-end text-red-orange-500"
        >
          Now dive into my professional experience
        </motion.span>
      </h2>

      <div className="container">
        <div className="mt-20 relative min-h-[500px]">
          <AnimatePresence mode="wait" custom={direction}>
            <Experience
              key={experienceData[experienceIndex].company + experienceData[experienceIndex].role}
              company={experienceData[experienceIndex].company}
              role={experienceData[experienceIndex].role}
              startDate={experienceData[experienceIndex].startDate}
              endDate={experienceData[experienceIndex].endDate}
              description={experienceData[experienceIndex].description}
              location={experienceData[experienceIndex].location}
              techStack={experienceData[experienceIndex].techStack}
              image={experienceData[experienceIndex].logo}
              onAnimationComplete={() => setIsAnimating(false)}
              custom={direction}
            />
          </AnimatePresence>
        </div>

        <motion.div
          className="flex gap-4 mt-6 lg:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isAnimating ? 0.5 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={handleClickPrev}
            disabled={isAnimating}
            className="border border-stone-500 size-11 inline-flex items-center justify-center rounded-full hover:bg-red-orange-500 hover:text-white hover:border-red-orange-500 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>

          <button
            onClick={handleClickNext}
            disabled={isAnimating}
            className="border border-stone-500 size-11 inline-flex items-center justify-center rounded-full hover:bg-red-orange-500 hover:text-white hover:border-red-orange-500 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Experiences;