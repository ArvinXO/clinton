"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, FileText, Plus, LogOut, Send, CheckCircle2 } from "lucide-react";

import { publishArticle } from "./actions";

export default function AdminPortal() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        category: "Legal Guide",
        summary: "",
        content: "",
        slug: ""
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Secure access key for the client
        if (password === "clinton-admin-2026") {
            setIsLoggedIn(true);
        } else {
            alert("Unauthorized. Please check your credentials.");
        }
    };

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const result = await publishArticle(formData);

        if (result && result.success) {
            setStatus("success");
            setMessage(result.message || "");
            setFormData({ title: "", category: "Legal Guide", summary: "", content: "", slug: "" });
        } else {
            setStatus("error");
            const errorMsg = result?.message || "Error";
            setMessage(errorMsg);
            alert("Error: " + errorMsg + "\n\nTip: Make sure GITHUB_TOKEN is set in Vercel.");
        }

        setTimeout(() => {
            setStatus("idle");
            setMessage("");
        }, 5000);
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-border max-w-md w-full"
                >
                    <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 mx-auto">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-serif text-center mb-2">Internal Access</h1>
                    <p className="text-center text-muted text-sm mb-8">Editorial and administrative control hub.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Administrative Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent"
                        />
                        <button className="w-full brand-button py-4 rounded-xl font-bold uppercase tracking-widest">
                            Authorize Access
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Admin Nav */}
            <nav className="bg-white border-b border-border py-4 px-8 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-[10px] font-bold">C&C</div>
                    <span className="font-bold text-primary uppercase tracking-widest text-xs">Knowledge Admin</span>
                </div>
                <button
                    onClick={() => setIsLoggedIn(false)}
                    className="flex items-center gap-2 text-xs font-bold text-muted hover:text-red-500 transition-colors"
                >
                    <LogOut className="w-4 h-4" /> Secure Logout
                </button>
            </nav>

            <main className="max-w-5xl mx-auto py-16 px-6">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-serif text-primary">Draft New Insight</h2>
                            <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${status === "idle" ? "bg-green-500" : "bg-orange-500 animate-pulse"}`} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted">{status === "idle" ? "System Live" : "Processing"}</span>
                            </div>
                        </div>

                        <form onSubmit={handlePublish} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted">Article Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-white border border-border rounded-xl p-4 outline-none focus:border-accent"
                                        placeholder="e.g. Challenging Global Offshore Jurisdictions"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-white border border-border rounded-xl p-4 outline-none focus:border-accent appearance-none"
                                    >
                                        <option>Legal Guide</option>
                                        <option>Case Study</option>
                                        <option>Regulation</option>
                                        <option>Player Rights</option>
                                        <option>Privacy & Data</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted">Editorial Summary (Short Excerpt)</label>
                                <textarea
                                    rows={3}
                                    required
                                    value={formData.summary}
                                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                    className="w-full bg-white border border-border rounded-xl p-4 outline-none focus:border-accent"
                                    placeholder="Brief summary used in the grid view..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted">URL Slug</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\\s+/g, '-') })}
                                    className="w-full bg-white border border-border rounded-xl p-4 outline-none focus:border-accent"
                                    placeholder="e.g. global-jurisdiction-challenge"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted">Full Article Content (HTML/MDX Supported)</label>
                                    <span className="text-[10px] text-accent font-bold italic">Typography is auto-styled</span>
                                </div>
                                <textarea
                                    rows={12}
                                    required
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full bg-white border border-border rounded-3xl p-6 outline-none focus:border-accent font-mono text-sm leading-relaxed"
                                    placeholder="<p>Write your detailed analysis here...</p>"
                                />
                            </div>

                            <button
                                disabled={status !== "idle"}
                                className="w-full brand-button py-6 rounded-2xl font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {status === "loading" ? "Publishing to Git..." : status === "success" ? "Published Successfully!" : "Publish to Live Site"}
                                {status === "idle" && <Plus className="w-5 h-5" />}
                                {status === "success" && <CheckCircle2 className="w-5 h-5" />}
                            </button>
                        </form>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-accent mb-6">Workflow Advice</h5>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-6 h-6 bg-accent/10 rounded flex items-center justify-center shrink-0">
                                        <span className="text-accent text-[10px] font-black">1</span>
                                    </div>
                                    <p className="text-xs text-muted leading-relaxed">Publishing will trigger an automated Git commit and Vercel rebuild.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-6 h-6 bg-accent/10 rounded flex items-center justify-center shrink-0">
                                        <span className="text-accent text-[10px] font-black">2</span>
                                    </div>
                                    <p className="text-xs text-muted leading-relaxed">Use &lt;h2&gt; tags for section headers to maintain premium styling.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-6 h-6 bg-accent/10 rounded flex items-center justify-center shrink-0">
                                        <span className="text-accent text-[10px] font-black">3</span>
                                    </div>
                                    <p className="text-xs text-muted leading-relaxed">Slugs are automatically hypenated for SEO compliance.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary p-8 rounded-[2.5rem] text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <FileText className="w-8 h-8 text-accent mb-4" />
                                <h6 className="font-serif text-xl mb-2">Live Sync</h6>
                                <p className="text-white/60 text-xs leading-relaxed">Your data is stored directly in the repository code, ensuring no database costs and maximum security.</p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
