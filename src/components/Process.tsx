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
        <section className="py-24 bg-secondary/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div className="max-w-xl">
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4">Our Methodology</h2>
                        <h3 className="text-4xl md:text-5xl font-serif">The Roadmap to Recovery</h3>
                    </div>
                    <p className="text-muted max-w-xs text-sm">
                        A transparent, professional approach designed to secure the justice you deserve.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative"
                        >
                            <div className="text-7xl font-serif font-black text-white/5 absolute -top-10 -left-4">
                                {step.number}
                            </div>
                            <div className="pt-8">
                                <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-primary" />
                                    {step.title}
                                </h4>
                                <p className="text-muted text-sm leading-relaxed pl-11">
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
