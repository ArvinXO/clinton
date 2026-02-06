"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";

import Quiz from "./Quiz";

const Contact = () => {
    return (
        <section className="py-24 max-w-7xl mx-auto px-6" id="contact">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Start Your Recovery</h2>
                    <h3 className="text-4xl md:text-6xl font-serif mb-8 whitespace-pre-line leading-tight">
                        Check Your {"\n"}Eligibility Instantly
                    </h3>
                    <p className="text-muted text-lg mb-12 max-w-lg leading-relaxed">
                        Answer a few questions regarding your gambling history and self-exclusion status.
                        Our specialists will analyze your case and provide a preliminary recovery estimate.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6 group">
                            <div className="p-4 bg-white border border-border rounded-2xl group-hover:border-accent/40 transition-colors shadow-sm">
                                <Mail className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-black">Direct Email</p>
                                <p className="text-lg text-primary font-bold">office@clintonandco.co.uk</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="p-4 bg-white border border-border rounded-2xl group-hover:border-accent/40 transition-colors shadow-sm">
                                <Phone className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-black">Case Support</p>
                                <p className="text-lg text-primary font-bold">020 8123 4567</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <Quiz />
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
