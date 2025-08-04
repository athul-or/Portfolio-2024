'use client'

import { FC, useEffect, MouseEvent, useRef } from "react";
import heroImage from "@/assets/images/my-image.jpg";
import Image from "next/image";
import Button from "@/components/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";

const Hero: FC = () => {
  const scrollingDiv = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollingDiv,
    offset: ['start end', 'end end']
  });

  const potraitWidth = useTransform(scrollYProgress, [0, 1], ['100%', '240%']);
  const { scope, entranceAnimation } = useTextRevealAnimation();

  useEffect(() => {
    entranceAnimation();
  }, [entranceAnimation]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = new URL(e.currentTarget.href);
    const hash = url.hash;

    const target = document.querySelector(hash);

    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
  }
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Athul_OR_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section>
      <div className="grid md:grid-cols-12 md:h-screen items-stretch sticky top-0">
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="container !max-w-full">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              ref={scope}
              className="text-5xl md:text-6xl lg:text-7xl  mt-40 md:mt-0">
              Crafting scalable web applications and streamlining CI/CD pipelines to bring ideas to life.
            </motion.h1>
            <div className="flex flex-col md:flex-row md:items-center mt-10 items-start gap-6">
              <motion.div
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.55
                }}
              >
                <a href="#projects" onClick={handleClick}>
                  <Button variant="secondary"
                    iconAfter={
                      <div className="overflow-hidden size-5">
                        <div className="h-5 w-10 flex group-hover/button:-translate-x-1/2 transition-transform duration-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                          </svg>
                        </div>
                      </div>
                    }>
                    <span>View My Works</span>
                  </Button>
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.55
                }}
              >
                <a onClick={handleDownload} download>
                  <Button variant="download">Resume</Button>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 relative">
          <motion.div
            className="mt-20 md:mt-0 md:size-full md:absolute md:right-0 max-md:!w-full"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              width: potraitWidth,
              transformOrigin: 'center' 
            }}
          >
            <Image
              src={heroImage}
              alt="Hero Image"
              className="size-full object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
      <div className="md:h-[200vh]" ref={scrollingDiv}></div>
    </section>
  );
};

export default Hero;