"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, FileText, Plus, LogOut, Trash2, Edit3, CheckCircle2, AlertCircle, Loader2, ExternalLink } from "lucide-react";
import { publishArticle, deleteArticle, updateArticle } from "./actions";
import { articles as initialArticles } from "@/data/articles";

export default function AdminPortal() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    // For editing
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        category: "Legal Guide",
        summary: "",
        content: "",
        slug: "",
        readTime: "8 min read"
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Updated password as requested
        if (password === "namana") {
            setIsLoggedIn(true);
        } else {
            alert("Unauthorized. Please check your credentials.");
        }
    };

    const resetForm = () => {
        setFormData({ title: "", category: "Legal Guide", summary: "", content: "", slug: "", readTime: "8 min read" });
        setEditingId(null);
    };

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const result = editingId
            ? await updateArticle(editingId, formData)
            : await publishArticle(formData);

        if (result && result.success) {
            setStatus("success");
            setMessage(result.message || "Success");
            resetForm();
        } else {
            setStatus("error");
            const errorMsg = result?.message || "Action failed.";
            setMessage(errorMsg);
        }

        setTimeout(() => {
            setStatus("idle");
            setMessage("");
        }, 5000);
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;

        setStatus("loading");
        const result = await deleteArticle(id);

        if (result && result.success) {
            setStatus("success");
            setMessage("Article Deleted. Rebuilding site...");
        } else {
            setStatus("error");
            setMessage(result?.message || "Delete failed.");
        }

        setTimeout(() => {
            setStatus("idle");
            setMessage("");
        }, 5000);
    };

    const startEdit = (article: any) => {
        setEditingId(article.id);
        setFormData({
            title: article.title,
            category: article.category,
            summary: article.summary,
            content: article.content,
            slug: article.slug,
            readTime: article.readTime || "8 min read"
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
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
                    <h1 className="text-3xl font-serif text-center mb-2 text-primary">Admin Access</h1>
                    <p className="text-center text-muted text-sm mb-8">Editorial and administrative console.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Secured Access Key"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent font-mono"
                        />
                        <button className="w-full brand-button py-4 rounded-xl font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary-hover transition-colors">
                            Authorize
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Admin Nav */}
            <nav className="bg-white border-b border-border py-4 px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-[10px] font-bold">C&C</div>
                    <span className="font-bold text-primary uppercase tracking-widest text-xs">Knowledge Management</span>
                </div>
                <button
                    onClick={() => setIsLoggedIn(false)}
                    className="flex items-center gap-2 text-xs font-bold text-muted hover:text-red-500 transition-colors"
                >
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </nav>

            <main className="max-w-7xl mx-auto py-16 px-6">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Editor Section */}
                    <div className="lg:col-span-12 xl:col-span-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-serif text-primary">
                                {editingId ? "Edit Article" : "Draft New Insight"}
                            </h2>
                            {status === "loading" && (
                                <div className="flex items-center gap-3 text-accent">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Committing to GitHub...</span>
                                </div>
                            )}
                            {status === "success" && (
                                <div className="flex items-center gap-3 text-green-500">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{message}</span>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handlePublish} className="space-y-8 bg-white p-10 rounded-[2.5rem] border border-border shadow-sm">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted">Title</label>
                                    <input
                                        type="text" required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent"
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
                                <label className="text-xs font-black uppercase tracking-widest text-muted">Summary</label>
                                <textarea rows={2} required
                                    value={formData.summary}
                                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted">Slug (Generated)</label>
                                    <input type="text" required
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted">Read Time</label>
                                    <input type="text"
                                        value={formData.readTime}
                                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                        className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted">Content (HTML)</label>
                                <textarea rows={10} required
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl p-6 outline-none focus:border-accent font-mono text-sm"
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit" disabled={status === "loading"}
                                    className="flex-1 bg-primary text-white py-6 rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-primary-hover disabled:opacity-50 flex items-center justify-center gap-3 transition-all"
                                >
                                    {editingId ? "Update Live Article" : "Publish to Live Site"}
                                    {editingId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </button>
                                {editingId && (
                                    <button
                                        type="button" onClick={resetForm}
                                        className="px-8 border border-border rounded-2xl text-muted font-bold uppercase text-[10px] tracking-widest hover:bg-background transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Article Management List */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
                            <h3 className="text-xl font-serif text-primary mb-6">Existing Articles</h3>
                            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                                {initialArticles.map((article) => (
                                    <div key={article.id} className="p-4 bg-background border border-border rounded-2xl group">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-black text-accent uppercase tracking-tighter">{article.category}</span>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => startEdit(article)}
                                                    className="p-1.5 bg-white border border-border rounded-lg text-primary hover:border-accent transition-colors"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(article.id, article.title)}
                                                    className="p-1.5 bg-white border border-border rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                        <h4 className="text-sm font-bold text-primary mb-1 line-clamp-2">{article.title}</h4>
                                        <p className="text-[10px] text-muted uppercase tracking-widest">{article.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-primary p-8 rounded-[2.5rem] text-white relative overflow-hidden">
                            <h5 className="font-serif text-lg mb-2 relative z-10">GitHub Live Sync</h5>
                            <p className="text-xs text-white/60 leading-relaxed mb-6 relative z-10">
                                This CMS is serverless and free. Your data lives in your code, keeping the site lightning fast and maintenance-free.
                            </p>
                            <div className="flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest relative z-10">
                                <ExternalLink className="w-3 h-3" /> API Status: Healthy
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

