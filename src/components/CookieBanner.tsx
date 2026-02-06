"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X, Cookie, ChevronRight } from "lucide-react";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Short delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-xl z-[9999]"
                >
                    <div className="bg-primary p-6 md:p-8 rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden group">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/20 transition-colors" />

                        <div className="relative z-10">
                            <div className="flex items-start gap-6">
                                <div className="hidden sm:flex w-14 h-14 bg-white/5 rounded-2xl items-center justify-center shrink-0 border border-white/10 shadow-inner">
                                    <ShieldCheck className="w-7 h-7 text-accent" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-white font-serif text-xl italic flex items-center gap-2">
                                            <Cookie className="w-5 h-5 text-accent sm:hidden" />
                                            Privacy Intelligence
                                        </h4>
                                        <button
                                            onClick={declineCookies}
                                            className="text-white/40 hover:text-white transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <p className="text-white/60 text-xs leading-relaxed mb-8">
                                        We use analytical markers to enhance our legal intelligence platform. By accepting, you consent to our use of essential and performance cookies. Read our <a href="/privacy" className="text-accent hover:underline decoration-accent/30 underline-offset-4">Privacy Framework</a> for more details.
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <button
                                            onClick={acceptCookies}
                                            className="w-full sm:w-auto px-8 py-3.5 bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-accent/20 hover:bg-accent/80 transition-all flex items-center justify-center gap-2 group/btn"
                                        >
                                            Accept Intelligence <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                        <button
                                            onClick={declineCookies}
                                            className="w-full sm:w-auto px-8 py-3.5 bg-white/5 text-white/80 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                                        >
                                            Configure
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
