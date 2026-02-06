"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQ = () => {
    const faqs = [
        {
            question: "Is it actually possible to recover money from Curaçao casinos?",
            answer: "Yes. While these casinos operate outside of direct UKGC regulation, they often use payment processors and infrastructure that must comply with international financial laws. By identifying systemic failures in their player protection duties (like ignoring GamStop), legal recourse is possible."
        },
        {
            question: "How long does the recovery process take?",
            answer: "Every case is unique, but typically the process takes between 3 to 6 months. This includes gathering evidence, formal legal engagement, and negotiation with the operators."
        },
        {
            question: "Do I need to pay any upfront fees?",
            answer: "Our initial evaluation is free. We connect you with legal partners who typically operate on a 'No Win, No Fee' basis, meaning you only pay a percentage of the recovered funds if the case is successful."
        },
        {
            question: "Is my case confidential?",
            answer: "Absolutely. We understand the sensitive nature of these claims. All data is handled in strict accordance with UK GDPR, and your privacy is our highest priority."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4">FAQ</h2>
                <h3 className="text-4xl md:text-5xl font-serif">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div
                        key={i}
                        className="bg-secondary border border-border rounded-xl overflow-hidden shadow-sm"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full p-6 text-left flex justify-between items-center group"
                        >
                            <span className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                                {faq.question}
                            </span>
                            {openIndex === i ? (
                                <Minus className="w-5 h-5 text-accent" />
                            ) : (
                                <Plus className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
                            )}
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="px-6 pb-6 text-muted leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
