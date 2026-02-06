"use client";

import React from "react";
import { motion } from "framer-motion";

const Process = () => {
    const steps = [
        {
            number: "01",
            title: "Case Review & Assessment",
            description: "We begin by carefully reviewing your situation, identifying which offshore operators were involved and how they failed to protect you.",
        },
        {
            number: "02",
            title: "Strategy & Evidence Gathering",
            description: "Our team works with you to gather all necessary documentation, transaction history, and correspondence to build a robust case.",
        },
        {
            number: "03",
            title: "Legal Engagement",
            description: "We connect you with specialist legal partners who understand the complexities of offshore gambling law to initiate formal recovery actions.",
        },
        {
            number: "04",
            title: "Outcome & Ongoing Support",
            description: "We stay by your side throughout the process, fighting for the return of your funds and providing resources for long-term protection.",
        },
    ];

    return (
        <section className="py-24 bg-secondary" id="methodology">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div className="max-w-xl">
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Our Methodology</h2>
                        <h3 className="text-4xl md:text-5xl font-serif text-primary">The Roadmap to Recovery</h3>
                    </div>
                    <p className="text-muted max-w-xs text-sm">
                        A transparent, professional approach designed to secure the justice you deserve.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group p-8 bg-white border border-border rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all h-full pt-20"
                        >
                            {/* Refined Step Indicator */}
                            <div className="absolute top-8 left-8 flex items-center gap-3">
                                <span className="text-[10px] font-black text-accent tracking-[0.3em] uppercase">Phase</span>
                                <span className="text-2xl font-serif font-bold text-primary">{step.number}</span>
                            </div>

                            {/* Animated Visuals for each step */}
                            <div className="mb-10 h-32 flex items-center justify-center relative">
                                {i === 0 && (
                                    <div className="relative w-20 h-28 border-2 border-primary/20 rounded-lg overflow-hidden bg-background/50">
                                        <motion.div
                                            animate={{ y: [0, 112, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="w-full h-1 bg-accent/60 shadow-[0_0_15px_rgba(37,99,235,0.8)] relative z-10"
                                        />
                                        <div className="p-3 space-y-2 opacity-20">
                                            <div className="h-2 w-full bg-primary rounded" />
                                            <div className="h-2 w-3/4 bg-primary rounded" />
                                            <div className="h-2 w-full bg-primary rounded" />
                                            <div className="h-2 w-1/2 bg-primary rounded" />
                                        </div>
                                    </div>
                                )}
                                {i === 1 && (
                                    <div className="relative w-32 h-32 flex items-center justify-center">
                                        {[0, 1, 2, 3, 4].map((dot) => (
                                            <motion.div
                                                key={dot}
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.2, 0.5, 0.2],
                                                    x: [0, Math.cos(dot * 72) * 40, 0],
                                                    y: [0, Math.sin(dot * 72) * 40, 0]
                                                }}
                                                transition={{ duration: 4, repeat: Infinity, delay: dot * 0.5 }}
                                                className="absolute w-3 h-3 bg-accent rounded-full blur-[1px]"
                                            />
                                        ))}
                                        <div className="w-12 h-12 rounded-xl border-2 border-accent bg-accent/5 flex items-center justify-center">
                                            <div className="w-4 h-4 bg-accent rounded-sm animate-pulse" />
                                        </div>
                                    </div>
                                )}
                                {i === 2 && (
                                    <div className="relative flex items-center justify-center">
                                        <motion.div
                                            animate={{ rotate: [0, -15, 15, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="relative z-10"
                                        >
                                            <div className="w-1 bg-primary/20 h-16 mx-auto rounded-full" />
                                            <div className="w-20 h-4 bg-primary rounded-full -mt-1 shadow-lg" />
                                        </motion.div>
                                        <motion.div
                                            animate={{ scale: [1, 1.5, 1], opacity: [0, 0.1, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute w-32 h-32 bg-accent rounded-full"
                                        />
                                    </div>
                                )}
                                {i === 3 && (
                                    <div className="relative flex items-center justify-center">
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            className="w-24 h-24 rounded-full border-4 border-accent/20 flex items-center justify-center"
                                        >
                                            <motion.div
                                                animate={{ scale: [1, 0.8, 1], opacity: [0.2, 0.4, 0.2] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-accent animate-pulse" />
                                            </motion.div>
                                        </motion.div>
                                        <motion.div
                                            animate={{ scale: [1, 2], opacity: [0.2, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute w-24 h-24 border border-accent rounded-full"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                                    {step.title}
                                </h4>
                                <p className="text-muted text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
