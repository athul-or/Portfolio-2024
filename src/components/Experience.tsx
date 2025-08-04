import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
import { motion, usePresence } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { HTMLAttributes, useEffect, useCallback } from "react";
import { twMerge } from "tailwind-merge";

interface ExperienceProps extends HTMLAttributes<HTMLDivElement> {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
    location: string;
    techStack: string[];
    image: string | StaticImport;
    className?: string;
    onAnimationComplete?: () => void;
    custom?: number;
}

const Experience = (props: ExperienceProps) => {
    const {
        company,
        role,
        startDate,
        endDate,
        description,
        location,
        techStack,
        image,
        className,
        onAnimationComplete,
        custom = 1,
        ...rest
    } = props;

    const { scope: companyScope, entranceAnimation: companyIn, exitAnimation: companyOut } = useTextRevealAnimation();
    const { scope: roleScope, entranceAnimation: roleIn, exitAnimation: roleOut } = useTextRevealAnimation();
    const { scope: dateScope, entranceAnimation: dateIn, exitAnimation: dateOut } = useTextRevealAnimation();
    const { scope: locScope, entranceAnimation: locIn, exitAnimation: locOut } = useTextRevealAnimation();
    const { scope: descScope, entranceAnimation: descIn, exitAnimation: descOut } = useTextRevealAnimation();
    const { scope: techScope, entranceAnimation: techIn, exitAnimation: techOut } = useTextRevealAnimation();

    const [isPresent, safeToRemove] = usePresence();

    const runAnimations = useCallback(async () => {
        if (isPresent) {
            try {
                await companyIn();
                await roleIn();
                await dateIn();
                await locIn();
                await descIn();
                await techIn();
                onAnimationComplete?.();
            } catch (error) {
                console.error('Animation error:', error);
                onAnimationComplete?.();
            }
        } else {
            try {
                await Promise.all([
                    techOut(),
                    descOut(),
                    locOut(),
                    dateOut(),
                    roleOut(),
                    companyOut(),
                ]);
            } catch (error) {
                console.error('Exit animation error:', error);
            } finally {
                safeToRemove();
            }
        }
    }, [
        isPresent,
        companyIn, companyOut,
        roleIn, roleOut,
        dateIn, dateOut,
        locIn, locOut,
        descIn, descOut,
        techIn, techOut,
        onAnimationComplete,
        safeToRemove
    ]);

    useEffect(() => {
        runAnimations();
    }, [runAnimations]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: "easeIn"
            }
        })
    };

    return (
        <motion.div
            className={twMerge("grid md:grid-cols-5 md:gap-8 lg:gap-16 md:items-center", className)}
            custom={custom}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            key={company + role}
            {...(rest as any)}
        >
            <div className="aspect-square md:aspect-[3/4] md:col-span-2 relative overflow-hidden">
                <Image
                    src={image}
                    alt={company}
                    className="size-full object-cover object-center"
                    priority
                />
                <motion.div
                    className="absolute inset-0 bg-stone-900"
                    initial={{ x: '0%' }}
                    animate={{ x: '100%' }}
                    exit={{ x: '0%' }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                />
            </div>

            <blockquote className="md:col-span-3 space-y-4 md:space-y-6 lg:space-y-8 mt-8 md:mt-0">
                <div
                    ref={companyScope}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold"
                >
                    {company}
                </div>

                <div
                    ref={roleScope}
                    className="text-xl md:text-2xl lg:text-3xl text-red-orange-500"
                >
                    {role}
                </div>

                <div
                    ref={dateScope}
                    className="text-lg md:text-xl text-stone-500"
                >
                    {startDate} – {endDate}
                </div>

                <div
                    ref={locScope}
                    className="text-lg md:text-xl text-stone-500"
                >
                    📍 {location}
                </div>

                <div
                    ref={descScope}
                    className="list-disc text-lg md:text-xl space-y-2"
                >
                    {description}
                </div>

                <div
                    ref={techScope}
                    className="text-lg md:text-xl text-stone-700"
                >
                    <span className="font-semibold">Tech Stack:</span> {techStack.join(", ")}
                </div>
            </blockquote>
        </motion.div>
    );
};

export default Experience;