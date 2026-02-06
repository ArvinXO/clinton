"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Scale, Gavel, MousePointer2 } from "lucide-react";
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                        Protecting UK Players
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-[1.1] tracking-tight text-primary">
                        Recovering <br />
                        <span className="brand-gradient">Your Assets.</span>
                    </h1>
                    <p className="text-xl text-muted mb-10 max-w-xl leading-relaxed">
                        Expert guided recovery for victims of offshore gambling abuse.
                        If GamStop failed to protect you, we will.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5">
                        <Link
                            href="/contact"
                            className="px-10 py-5 brand-button rounded-lg text-center font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                        >
                            Get Started <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/how-it-works"
                            className="px-10 py-5 bg-white text-primary border border-border rounded-lg text-center font-bold uppercase tracking-widest hover:border-accent/40 hover:shadow-lg transition-all"
                        >
                            The Process
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative hidden md:block"
                >
                    <div className="absolute inset-0 bg-accent/5 blur-[120px] rounded-full" />
                    <div className="relative bg-white border border-border p-12 rounded-[2.5rem] shadow-2xl">
                        <div className="grid grid-cols-2 gap-10">
                            {[
                                { icon: Scale, label: "Legal Basis", value: "Success-Oriented" },
                                { icon: Gavel, label: "Advocacy", value: "Player-First" },
                                { icon: ShieldCheck, label: "Security", value: "Fully Encrypted" },
                                { icon: ArrowRight, label: "Fees", value: "Performance-Based" },
                            ].map((stat, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="w-12 h-12 bg-background rounded-2xl flex items-center justify-center text-accent">
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest font-black text-muted">{stat.label}</p>
                                        <p className="text-lg font-serif font-bold text-primary">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent/50 to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
