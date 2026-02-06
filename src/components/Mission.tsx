"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Scale, ShieldAlert, Zap } from "lucide-react";

const Mission = () => {
    const reasons = [
        {
            icon: ShieldAlert,
            title: "Player Protection Gap",
            desc: "When UK players self-exclude via GamStop, they expect to be protected. Offshore operators exploit this vulnerability by creating 'mirrors' and bypassed systems that ignore these life-saving protections."
        },
        {
            icon: Scale,
            title: "Systemic Accountability",
            desc: "The 'Wild West' of offshore gambling survives on the assumption that they are unreachable. We believe no operator, regardless of where they are licensed, is above the ethical duty of care owed to their customers."
        },
        {
            icon: Heart,
            title: "The Human Element",
            desc: "We've seen the devastation these operators cause to families and mental health. Our mission is to remove the shame from the situation and provide a professional, legal path to restoration."
        },
        {
            icon: Zap,
            title: "Levelling the Field",
            desc: "UK-regulated casinos play by strict rules. Offshore operators profit by breaking them. We fight to ensure that geography is no longer a loophole for predatory behavior."
        }
    ];

    return (
        <section className="py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-6">Our Purpose</h2>
                        <h3 className="text-4xl md:text-6xl font-serif text-primary mb-8 leading-tight">
                            Why We Do <br />
                            <span className="italic">What We Do.</span>
                        </h3>
                        <p className="text-lg text-muted leading-relaxed mb-8">
                            Clinton & Co was founded on a simple premise: **Justice shouldn't have borders.**
                            For too long, offshore operators have hidden behind distant licenses to avoid
                            their responsibilities toward UK players.
                        </p>
                        <div className="p-8 bg-primary rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-xl font-serif italic mb-4">
                                    "We don't just recover funds; we recover lives. Our work is about stopping the cycle of abuse that offshore casinos rely on for profit."
                                </p>
                                <p className="text-white/60 font-bold uppercase tracking-widest text-xs">
                                    — Our Founding Principle
                                </p>
                            </div>
                            <Heart className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5" />
                        </div>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {reasons.map((reason, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-white border border-border rounded-[2rem] shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="w-12 h-12 bg-background rounded-2xl flex items-center justify-center text-accent mb-6">
                                    <reason.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-lg font-bold text-primary mb-3">
                                    {reason.title}
                                </h4>
                                <p className="text-muted text-xs leading-relaxed">
                                    {reason.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
