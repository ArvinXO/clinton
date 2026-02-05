"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Scale, Gavel } from "lucide-react";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        <ShieldCheck className="w-4 h-4" />
                        Justice for Players
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
                        Recovering Losses from <br />
                        <span className="gold-gradient">Offshore Operators.</span>
                    </h1>
                    <p className="text-lg text-muted mb-8 max-w-xl leading-relaxed">
                        Specialist legal support for UK victims of offshore casino abuse.
                        If you were self-excluded via GamStop but allowed to gamble at
                        Curaçao-licensed casinos, we can help you reclaim what is rightfully yours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/contact"
                            className="px-8 py-4 gold-button rounded-sm text-center font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            Start Free Assessment <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/how-it-works"
                            className="px-8 py-4 glass text-white rounded-sm text-center font-bold uppercase tracking-widest hover:border-primary/40 transition-all"
                        >
                            Our Process
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative hidden md:block"
                >
                    <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full" />
                    <div className="relative glass border border-white/5 p-12 rounded-2xl">
                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { icon: Scale, label: "Legal Expertise", value: "100%" },
                                { icon: Gavel, label: "Case Success", value: "High-Rate" },
                                { icon: ShieldCheck, label: "Protected", value: "Secure" },
                                { icon: ArrowRight, label: "No Win No Fee*", value: "Risk-Free" },
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col">
                                    <stat.icon className="w-8 h-8 text-primary mb-3" />
                                    <span className="text-2xl font-serif font-bold text-white">{stat.value}</span>
                                    <span className="text-xs uppercase tracking-wider text-muted font-bold">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
