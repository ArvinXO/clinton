"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
    return (
        <section className="py-24 max-w-7xl mx-auto px-6" id="contact">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4">Contact Us</h2>
                    <h3 className="text-4xl md:text-5xl font-serif mb-8 whitespace-pre-line">
                        Let’s Discuss {"\n"}Your Recovery Case
                    </h3>
                    <p className="text-muted text-lg mb-12">
                        The first step toward justice is a confidential conversation.
                        Reach out to our specialists today.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-6 group">
                            <div className="p-4 glass rounded-full group-hover:border-primary/50 transition-colors">
                                <Mail className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-muted font-bold">Email</p>
                                <p className="text-lg">office@clintonandco.co.uk</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="p-4 glass rounded-full group-hover:border-primary/50 transition-colors">
                                <Phone className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-muted font-bold">Phone</p>
                                <p className="text-lg">020 8123 4567</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="p-4 glass rounded-full group-hover:border-primary/50 transition-colors">
                                <MapPin className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-muted font-bold">Location</p>
                                <p className="text-lg">London, United Kingdom</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass p-10 rounded-2xl relative"
                >
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold text-muted">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary/50 outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold text-muted">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary/50 outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-muted">Estimated Loss</label>
                            <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary/50 outline-none transition-all appearance-none cursor-pointer">
                                <option className="bg-background">Under £5,000</option>
                                <option className="bg-background">£5,000 - £20,000</option>
                                <option className="bg-background">£20,000 - £100,000</option>
                                <option className="bg-background">Over £100,000</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-muted">Your Message</label>
                            <textarea
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary/50 outline-none transition-all"
                                placeholder="Briefly describe your situation..."
                            />
                        </div>
                        <button className="w-full gold-button py-4 rounded-lg font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                            Submit Case <Send className="w-4 h-4" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
