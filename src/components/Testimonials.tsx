"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonials = () => {
    const testimonials = [
        {
            text: "I felt completely hopeless after being targeted by an offshore casino despite my self-exclusion. Clinton & Co connected me with the right people to get a full refund of my deposits. I can't thank them enough.",
            author: "D. Smith",
            location: "Leicester, UK",
            amount: "£14,200 Recovered"
        },
        {
            text: "The professional approach and clear communication were exactly what I needed. They took the shame out of the process and treated my case with the seriousness it deserved.",
            author: "S. Thompson",
            location: "London, UK",
            amount: "£8,500 Recovered"
        },
        {
            text: "Fast, discrete, and incredibly effective. If you think you're stuck because a casino is based in Curacao, speak to these guys first. They know the loopholes.",
            author: "M. Ahmed",
            location: "Manchester, UK",
            amount: "£32,000 Recovered"
        }
    ];

    return (
        <section className="py-24 bg-primary text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/60 mb-4">Success Stories</h2>
                    <h3 className="text-4xl md:text-5xl font-serif">Trusted by Players</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl relative"
                        >
                            <Quote className="w-10 h-10 text-accent/20 absolute top-6 right-6" />
                            <p className="text-lg leading-relaxed mb-8 italic text-white/90">
                                "{t.text}"
                            </p>
                            <div>
                                <p className="font-bold text-lg">{t.author}</p>
                                <p className="text-accent text-sm font-bold uppercase tracking-widest">{t.amount}</p>
                                <p className="text-white/40 text-xs mt-1">{t.location}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
