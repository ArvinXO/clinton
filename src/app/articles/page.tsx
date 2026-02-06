"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DynamicBackground from "@/components/DynamicBackground";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ChevronRight, Hash, TrendingUp } from "lucide-react";
import { articles, categories } from "@/data/articles";

export default function Articles() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState<"latest" | "oldest" | "az">("latest");

    const filteredArticles = useMemo(() => {
        let result = articles.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.summary.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        // Sorting Logic
        return result.sort((a, b) => {
            if (sortOrder === "az") return a.title.localeCompare(b.title);

            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            if (sortOrder === "latest") return dateB - dateA;
            if (sortOrder === "oldest") return dateA - dateB;
            return 0;
        });
    }, [searchQuery, selectedCategory, sortOrder]);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { All: articles.length };
        articles.forEach(article => {
            counts[article.category] = (counts[article.category] || 0) + 1;
        });
        return counts;
    }, []);

    return (
        <main className="relative min-h-screen">
            <DynamicBackground />
            <Navbar />
            <PageHeader
                title="Knowledge Hub"
                subtitle="Expert analysis on gambling law, legislative changes, and strategic recovery pathways."
            />

            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Sidebar / Filter (Left on Desktop) */}
                    <aside className="lg:col-span-3 space-y-10 order-2 lg:order-1">
                        {/* Search Card */}
                        <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm group">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">Search Hub</h5>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-background border border-border rounded-xl p-4 pr-12 outline-none focus:border-accent transition-all text-sm text-primary"
                                    placeholder="Search keywords..."
                                />
                                <Search className="w-5 h-5 text-muted absolute right-4 top-1/2 -translate-y-1/2 group-focus-within:text-accent transition-colors" />
                            </div>
                        </div>

                        {/* Categories List */}
                        <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">Explore by Category</h5>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-sm ${selectedCategory === category
                                            ? "bg-primary text-white font-bold px-4"
                                            : "text-muted hover:bg-background hover:text-primary"
                                            }`}
                                    >
                                        <span>{category}</span>
                                        <span className={`text-[10px] font-black ${selectedCategory === category ? "text-accent" : "text-primary/20"}`}>
                                            {categoryCounts[category] || 0}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sorting Card */}
                        <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm group">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">Sort Intel</h5>
                            <div className="flex flex-col gap-2">
                                {[
                                    { id: "latest", label: "Latest First", icon: TrendingUp },
                                    { id: "oldest", label: "Oldest First", icon: Calendar },
                                    { id: "az", label: "Alphabetical (A-Z)", icon: Hash }
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setSortOrder(option.id as any)}
                                        className={`flex items-center gap-3 p-3 rounded-xl transition-all text-xs font-bold ${sortOrder === option.id
                                            ? "bg-accent/10 text-accent"
                                            : "text-muted hover:bg-background hover:text-primary"
                                            }`}
                                    >
                                        <option.icon className="w-4 h-4" />
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Featured Quick Stats/Tags block */}
                        <div className="bg-primary p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <TrendingUp className="w-8 h-8 text-accent mb-4" />
                                <h6 className="text-white font-serif text-xl mb-2 italic">Legal Intelligence</h6>
                                <p className="text-white/60 text-xs leading-relaxed mb-6">
                                    Our analysts track global gambling regulations in real-time to provide tactical advantages.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["UKGC", "Chargebacks", "GDPR", "KYC"].map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white border border-white/20">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Articles Feed (Right on Desktop) */}
                    <div className="lg:col-span-9 space-y-12 order-1 lg:order-2">
                        <AnimatePresence mode="popLayout">
                            {filteredArticles.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-8">
                                    {filteredArticles.map((article, i) => (
                                        <motion.article
                                            key={article.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.4, delay: i * 0.05 }}
                                            onClick={() => window.location.href = `/articles/${article.slug}`}
                                            className="group bg-white rounded-[2.5rem] overflow-hidden border border-border shadow-sm hover:shadow-2xl transition-all h-full flex flex-col pt-4 cursor-pointer"
                                        >
                                            {/* Article Image Placeholder with Typography */}
                                            <div className="mx-4 h-48 bg-background rounded-[2rem] relative overflow-hidden flex items-center justify-center border border-border shadow-inner">
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--accent),0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <span className="text-[140px] font-black text-primary/5 absolute select-none italic">
                                                    {article.category.charAt(0)}
                                                </span>
                                                <div className="z-10 text-center px-8">
                                                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-accent mb-2 block opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                                                        Read Analysis
                                                    </span>
                                                </div>
                                                <div className="absolute top-4 left-6">
                                                    <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-border flex items-center gap-2 shadow-sm">
                                                        <Hash className="w-3 h-3 text-accent" />
                                                        <span className="text-[10px] font-black uppercase text-primary tracking-widest">{article.category}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-10 flex-grow flex flex-col">
                                                <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4">
                                                    <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-accent" /> {article.date}</span>
                                                    <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-accent" /> {article.readTime}</span>
                                                </div>
                                                <h4 className="text-2xl font-serif mb-4 group-hover:text-accent transition-colors text-primary leading-tight">
                                                    {article.title}
                                                </h4>
                                                <p className="text-muted text-sm leading-relaxed mb-8 line-clamp-3">
                                                    {article.summary}
                                                </p>
                                                <div className="mt-auto pt-4 flex items-center justify-between">
                                                    <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-primary group-hover:text-accent transition-all">
                                                        Learn More <ChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-32 text-center"
                                >
                                    <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Search className="w-8 h-8 text-primary/20" />
                                    </div>
                                    <h4 className="text-2xl font-serif text-primary">No Matching Intelligence</h4>
                                    <p className="text-muted max-w-xs mx-auto mt-2">We couldn't find any articles matching "{searchQuery}" in {selectedCategory}.</p>
                                    <button
                                        onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                                        className="mt-8 text-accent font-bold uppercase text-xs tracking-widest hover:underline"
                                    >
                                        Clear all filters
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
