"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { articles } from "@/data/articles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, ShieldCheck } from "lucide-react";

export default function ArticleDetail() {
    const params = useParams();
    const router = useRouter();
    const article = articles.find(a => a.slug === params.slug);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center">
                <div>
                    <h1 className="text-4xl font-serif text-primary mb-4">Insight Not Found</h1>
                    <p className="text-muted mb-8">The legal analysis you are looking for may have been moved or archived.</p>
                    <button
                        onClick={() => router.push("/articles")}
                        className="brand-button px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs"
                    >
                        Back to Hub
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="relative min-h-screen">
            <DynamicBackground />
            <Navbar />

            <section className="pt-32 pb-24 max-w-4xl mx-auto px-6">
                <motion.button
                    onClick={() => router.push("/articles")}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-muted hover:text-primary mb-12 group transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Knowledge Hub
                </motion.button>

                <div className="space-y-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-border rounded-full shadow-sm"
                    >
                        <ShieldCheck className="w-4 h-4 text-accent" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">{article.category}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif text-primary leading-tight"
                    >
                        {article.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap items-center gap-8 py-8 border-y border-border"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-xs font-serif">
                                C&C
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-primary">Editorial Team</p>
                                <p className="text-xs text-muted">Legal Analysts</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-black uppercase text-muted tracking-widest">
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> {article.date}</span>
                            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> {article.readTime}</span>
                        </div>
                        <div className="ml-auto flex items-center gap-4">
                            <button className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-border">
                                <Share2 className="w-4 h-4 text-muted" />
                            </button>
                            <button className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-border">
                                <Bookmark className="w-4 h-4 text-muted" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-12 bg-primary rounded-[3rem] text-white overflow-hidden relative"
                >
                    <div className="relative z-10 max-w-xl">
                        <h3 className="text-3xl font-serif mb-4">Affected by a similar situation?</h3>
                        <p className="text-white/70 mb-8 leading-relaxed">
                            Our legal specialists can provide a complimentary assessment of your case based on the patterns identified in this article.
                        </p>
                        <button
                            onClick={() => router.push("/#contact")}
                            className="bg-accent text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                        >
                            Verify Your Eligibility
                        </button>
                    </div>
                    <ShieldCheck className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
