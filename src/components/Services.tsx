"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, CreditCard, UserCheck, Scale } from "lucide-react";

const Services = () => {
    const services = [
        {
            title: "Curaçao Casino Refunds",
            description: "Recovering deposits from casinos that bypass player protections despite your self-exclusion.",
            icon: CreditCard,
        },
        {
            title: "Self-Exclusion Failure",
            description: "Legal recourse for when GamStop protections are ignored by offshore operators.",
            icon: UserCheck,
        },
        {
            title: "Gambling Abuse Claims",
            description: "Expert guidance for victims of manipulative tactics used by unlicensed casinos.",
            icon: ShieldAlert,
        },
        {
            title: "Full Account Audit",
            description: "Comprehensive review of your gambling history to identify all potential reclaim targets.",
            icon: Scale,
        },
    ];

    return (
        <section className="py-24 max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4">What We Handle</h2>
                <h3 className="text-4xl md:text-5xl font-serif">Tailored Legal Expertise</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 glass rounded-xl group hover:border-primary/40 transition-all cursor-default"
                    >
                        <service.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                        <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                        <p className="text-muted text-sm leading-relaxed">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Services;
