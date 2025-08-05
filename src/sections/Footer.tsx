'use client'

import Button from "@/components/Button";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
import { useInView } from "motion/react";
import { FC, MouseEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const navItems = [
  { href: '#intro', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' }
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/athul-or", icon: <FaLinkedin /> },
  { href: "https://github.com/athul-or", icon: <FaGithub /> },
  { href: "/", icon: <FaInstagram /> },
];

const Footer: FC = () => {
  const { scope, entranceAnimation } = useTextRevealAnimation();
  const inView = useInView(scope);

  useEffect(() => {
    if (inView) {
      entranceAnimation();
    }
  }, [inView, entranceAnimation]);

  const handleClickNavItem = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = new URL(e.currentTarget.href);
    const hash = url.hash;
    const target = document.querySelector(hash);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <footer className="bg-stone-900 text-white" id="contact">
      <div className="container">
        <div className="section">
          <div className="flex items-center gap-3">
            <div className="size-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="uppercase">HAVE A PROJECT IN MIND?</span>
          </div>

          <div className="grid md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h2
                className="text-4xl md:text-7xl lg:text-8xl mt-8 font-extralight"
                ref={scope}
              >
                Enough talk. Let&apos;s make something great together.
              </h2>
              <Button
                variant="secondary"
                className="mt-8"
                onClick={() => window.location.href = 'mailto:athulor452@gmail.com'}
                iconAfter={
                  <div className="overflow-hidden size-6">
                    <div className="h-6 w-12 flex group-hover/button:-translate-x-1/2 transition-transform duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                  </div>
                }
              >
                athulor452@gmail.com
              </Button>

              <div className="flex gap-6 mt-8">
                {socialLinks.map(({ href, icon }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-white/70 hover:text-white transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <nav className="flex flex-col md:items-end gap-8 mt-16 md:mt-0">
                {navItems.map(({ href, label }) => (
                  <a href={href} key={label} onClick={handleClickNavItem}>
                    <Button variant="text" className="text-lg">{label}</Button>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <p className="py-16 text-white/30 text-sm">
          Copyright &copy; Athul OR &bull; All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
