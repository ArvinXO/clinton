"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1800);

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
                    className="fixed inset-0 z-[99999] bg-[#FFFFFF] flex items-center justify-center overflow-hidden"
                >
                    {/* Soft Minimalist Glow */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0.3 }}
                        className="absolute w-[800px] h-[800px] bg-accent/5 rounded-full blur-[140px]"
                    />

                    <div className="relative flex flex-col items-center">
                        {/* Enlarged Logo Focus */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="relative w-48 h-48 md:w-64 md:h-64"
                        >
                            <Image
                                src="/clinton.webp"
                                alt="Clinton & Co"
                                fill
                                className="object-contain"
                                priority
                            />

                            {/* Refined Shimmer for White Background */}
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
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[25deg] pointer-events-none mix-blend-overlay"
                            />
                        </motion.div>

                        {/* Subtle loading line for "Next Page" feel */}
                        <div className="mt-12 w-32 h-[1px] bg-primary/5 overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                                className="w-full h-full bg-primary/20"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
