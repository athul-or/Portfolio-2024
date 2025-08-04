'use client'

import { projects } from "@/data/projectsData";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
import { useEffect } from "react";
import { motion } from "motion/react";

interface ProjectPageProps {
    params: { slug: string };
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) return notFound();

    const { scope: titleScope, entranceAnimation: titleEntranceAnimation } = useTextRevealAnimation();
    const { scope: descScope, entranceAnimation: descEntranceAnimation } = useTextRevealAnimation();

    useEffect(() => {
        titleEntranceAnimation();
        descEntranceAnimation();
    }, [titleEntranceAnimation, descEntranceAnimation]);

    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 py-16">

            <div className="absolute top-6 left-6 z-10">
                <Link href="/">
                    <button className="back-button">
                        <div className="back-button-box">
                            <span className="back-button-elem">
                                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                                    ></path>
                                </svg>
                            </span>
                            <span className="back-button-elem">
                                <svg viewBox="0 0 46 40">
                                    <path
                                        d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                                    ></path>
                                </svg>
                            </span>
                        </div>
                    </button>
                </Link>
            </div>

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">

                <motion.div
                    className="w-full flex justify-center"
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src={project.image}
                            alt={project.name}
                            width={800}
                            height={500}
                            className="w-full max-w-lg rounded-2xl shadow-xl"
                        />
                    </motion.div>
                </motion.div>

                <div className="space-y-6">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        ref={titleScope}
                        className="text-4xl lg:text-7xl font-extrabold text-white">
                        {project.name}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        ref={descScope}
                        className="text-xl lg:text-3xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                        {project.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3.8, duration: 0.5 }}
                            className="text-2xl font-semibold mb-4 text-white"
                        >
                            Tech Stack
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 4.1, duration: 0.7 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-2">
                            {project.techStack.map((tech, index) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20
                                             text-white text-sm font-medium rounded-full
                                             hover:bg-white/20 hover:border-white/30 hover:scale-105
                                             transition-all duration-200 cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 4.3, duration: 0.5 }}>
                        <a
                            href={project.siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600
                                   text-white font-semibold rounded-xl shadow-md
                                   hover:scale-105 hover:shadow-lg transition-transform duration-300"
                        >
                            Visit Site 
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}