"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2200); // Display for 2.2 seconds

        // Prevent scrolling while splash is active
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
                        backgroundColor: "rgba(1, 8, 22, 0)",
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[99999] bg-[#010816] flex items-center justify-center overflow-hidden"
                >
                    {/* Background Glows */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 0.3 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px]"
                    />

                    <div className="relative flex flex-col items-center">
                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                ease: [0.16, 1, 0.3, 1],
                                delay: 0.2
                            }}
                            className="relative w-24 h-24 md:w-32 md:h-32 mb-8"
                        >
                            <Image
                                src="/clinton.webp"
                                alt="Clinton & Co"
                                fill
                                className="object-contain"
                                priority
                            />

                            {/* Shimmer Effect */}
                            <motion.div
                                animate={{
                                    x: ["-100%", "100%"],
                                    opacity: [0, 0.5, 0]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: 0.5,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                            />
                        </motion.div>

                        {/* Text Animation */}
                        <div className="overflow-hidden">
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="text-center"
                            >
                                <h1 className="text-white text-2xl md:text-3xl font-serif font-bold tracking-[0.2em] mb-2">
                                    CLINTON <span className="text-accent">&</span> CO
                                </h1>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="h-[1px] w-8 bg-white/20" />
                                    <p className="text-accent text-[8px] md:text-[10px] uppercase font-black tracking-[0.4em]">
                                        Legal Intelligence
                                    </p>
                                    <div className="h-[1px] w-8 bg-white/20" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Progress Bar */}
                        <div className="absolute -bottom-24 w-48 h-[1px] bg-white/10 overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 2, ease: "linear" }}
                                className="w-full h-full bg-accent"
                            />
                        </div>
                    </div>

                    {/* Final Burst on Exit */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 1, scale: 2 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-white pointer-events-none mix-blend-overlay opacity-0"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
