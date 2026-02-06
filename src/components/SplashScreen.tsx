"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1800); // Fast but noticeable duration

        document.body.style.overflow = "hidden";

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.5, ease: "circIn" }
                    }}
                    className="fixed inset-0 z-[99999] bg-[#010816] flex items-center justify-center overflow-hidden"
                >
                    {/* Deep Ambient Glows */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0.15 }}
                        className="absolute w-[800px] h-[800px] bg-accent/20 rounded-full blur-[140px]"
                    />

                    <div className="relative flex flex-col items-center">
                        {/* Minimalist Logo focus */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="relative w-32 h-32 md:w-40 md:h-40"
                        >
                            <Image
                                src="/clinton.webp"
                                alt="Clinton & Co"
                                fill
                                className="object-contain brightness-110 drop-shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                                priority
                            />

                            {/* Prominent High-End Shimmer */}
                            <motion.div
                                animate={{
                                    x: ["-150%", "150%"],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    repeatDelay: 0.3,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[25deg] pointer-events-none"
                            />
                        </motion.div>

                        {/* Subtle loading line for "Next Page" feel */}
                        <div className="mt-12 w-32 h-[1px] bg-white/5 overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                                className="w-full h-full bg-accent"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
