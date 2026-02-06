"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DynamicBackground from "@/components/DynamicBackground";
import { motion } from "framer-motion";
import { Search, Calendar, User } from "lucide-react";

export default function Articles() {
    return (
        <main className="relative min-h-screen">
            <DynamicBackground />
            <Navbar />
            <PageHeader
                title="Articles & News"
                subtitle="Insights into gambling law, player protection, and the evolving landscape of offshore casino accountability."
            />

            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-12">
                        {[1, 2, 3].map((i) => (
                            <motion.article
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="glass rounded-2xl overflow-hidden group"
                            >
                                <div className="h-64 bg-secondary/80 relative">
                                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-all" />
                                    <div className="absolute inset-0 flex items-center justify-center text-primary/20 font-serif text-6xl select-none">
                                        CLINTON & CO
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-6 text-xs text-muted font-bold uppercase tracking-widest mb-4">
                                        <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> Coming Soon</span>
                                        <span className="flex items-center gap-2"><User className="w-3 h-3" /> Editorial Team</span>
                                    </div>
                                    <h4 className="text-3xl font-serif mb-4 group-hover:text-accent transition-colors cursor-pointer text-primary">
                                        Analysis: The Curaçao Licensing Loophole and Its Impact on UK Players
                                    </h4>
                                    <p className="text-muted leading-relaxed mb-6">
                                        Our team is currently preparing a series of in-depth articles regarding the legal
                                        complexities of recovering funds from offshore operators. Check back soon for
                                        expert analysis and case studies.
                                    </p>
                                    <span className="text-accent font-bold uppercase text-xs tracking-[0.2em] group-hover:gap-4 transition-all flex items-center gap-2 cursor-pointer">
                                        Stay Informed <span className="w-8 h-[1px] bg-accent" />
                                    </span>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-12">
                        <div className="bg-secondary p-8 rounded-2xl shadow-lg border border-border">
                            <h5 className="text-primary font-bold uppercase tracking-widest text-xs mb-6">Search Articles</h5>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full bg-background border border-border rounded-lg p-3 pr-10 outline-none focus:border-primary/50 transition-all text-sm text-primary"
                                    placeholder="Keywords..."
                                />
                                <Search className="w-4 h-4 text-muted absolute right-3 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        <div className="bg-secondary p-8 rounded-2xl shadow-lg border border-border">
                            <h5 className="text-primary font-bold uppercase tracking-widest text-xs mb-6">Categories</h5>
                            <ul className="space-y-4 text-sm text-muted">
                                <li className="hover:text-primary transition-colors cursor-pointer flex justify-between">
                                    <span>Gambling Law</span>
                                    <span className="text-primary/20">0</span>
                                </li>
                                <li className="hover:text-primary transition-colors cursor-pointer flex justify-between">
                                    <span>Player Rights</span>
                                    <span className="text-primary/20">0</span>
                                </li>
                                <li className="hover:text-primary transition-colors cursor-pointer flex justify-between">
                                    <span>Curaçao Regulations</span>
                                    <span className="text-primary/20">0</span>
                                </li>
                                <li className="hover:text-primary transition-colors cursor-pointer flex justify-between">
                                    <span>Case Studies</span>
                                    <span className="text-primary/20">0</span>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </section>

            <Footer />
        </main>
    );
}
