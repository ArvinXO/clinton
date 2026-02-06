"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck } from "lucide-react";
import Link from "next/link";

const FloatingCTA = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 800);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    className="fixed bottom-8 right-8 z-40 hidden md:block"
                >
                    <Link
                        href="/contact"
                        className="brand-button flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform"
                    >
                        <ClipboardCheck className="w-5 h-5" />
                        <span className="font-bold uppercase tracking-widest text-xs">Check Eligibility</span>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingCTA;
