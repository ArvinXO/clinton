"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { articles } from "@/data/articles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, ShieldCheck, ListOrdered } from "lucide-react";

export default function ArticleDetail() {
    const params = useParams();
    const router = useRouter();
    const article = articles.find(a => a.slug === params.slug);

    // Auto-generate Table of Contents and inject IDs into content
    const { processedContent, toc } = useMemo(() => {
        if (!article) return { processedContent: "", toc: [] };

        const tempToc: { id: string; text: string }[] = [];
        let content = article.content;

        // Find all h2 tags and add unique IDs
        const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
        let match;
        let processed = content;
        let offset = 0;

        while ((match = h2Regex.exec(content)) !== null) {
            const text = match[1];
            const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
            tempToc.push({ id, text });

            const startTag = `<h2 id="${id}">`;
            const endTag = `</h2>`;
            const replacement = `${startTag}${text}${endTag}`;

            processed = processed.slice(0, match.index + offset) + replacement + processed.slice(match.index + offset + match[0].length);
            offset += replacement.length - match[0].length;
        }

        return { processedContent: processed, toc: tempToc };
    }, [article]);

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

            <section className="pt-32 pb-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16">
                {/* Left Column: Article content */}
                <div className="lg:col-span-8">
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
                        dangerouslySetInnerHTML={{ __html: processedContent }}
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
                </div>

                {/* Right Column: Sidebar (Table of Contents) */}
                <aside className="lg:col-span-4 hidden lg:block">
                    <div className="sticky top-32 space-y-8">
                        {toc.length > 0 && (
                            <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <ListOrdered className="w-4 h-4 text-accent" />
                                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">In This Article</h5>
                                </div>
                                <nav className="space-y-4">
                                    {toc.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            className="block text-sm text-muted hover:text-accent transition-colors leading-relaxed border-l-2 border-transparent hover:border-accent pl-4"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const element = document.getElementById(item.id);
                                                if (element) {
                                                    const navHeight = 100; // Offset for navbar
                                                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                                    window.scrollTo({
                                                        top: elementPosition - navHeight,
                                                        behavior: "smooth"
                                                    });
                                                }
                                            }}
                                        >
                                            {item.text}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        )}

                        <div className="bg-background p-8 rounded-[2.5rem] border border-border shadow-inner">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Reading Strategy</h5>
                            <p className="text-xs text-muted leading-relaxed italic">
                                "This analysis focuses on legal patterns rather than specific operators to ensure broad applicability to jurisdictional disputes."
                            </p>
                        </div>
                    </div>
                </aside>
            </section>

            <Footer />
        </main>
    );
}
