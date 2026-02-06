"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, FileText, Plus, LogOut, Trash2, Edit3, CheckCircle2, AlertCircle, Loader2, ExternalLink, Eye, PenTool, HelpCircle } from "lucide-react";
import { publishArticle, deleteArticle, updateArticle } from "./actions";
import { articles as initialArticles } from "@/data/articles";

// Simple Parser to convert user-friendly text to HTML
const parseToHtml = (text: string) => {
    if (!text) return "";
    return text
        .split(/\n\s*\n/) // Split by double newlines
        .map(block => {
            block = block.trim();
            if (block.startsWith("##")) {
                return `<h2>${block.replace(/^##\s*/, "")}</h2>`;
            }
            if (block.startsWith(">")) {
                return `<blockquote>${block.replace(/^>\s*/, "")}</blockquote>`;
            }
            return `<p>${block}</p>`;
        })
        .join("\n");
};

// Simple Un-parser to convert HTML back to user-friendly text
const parseToVisual = (html: string) => {
    if (!html) return "";
    let text = html;
    text = text.replace(/<h2>(.*?)<\/h2>/gi, "## $1\n\n");
    text = text.replace(/<blockquote>(.*?)<\/blockquote>/gi, "> $1\n\n");
    text = text.replace(/<p>(.*?)<\/p>/gi, "$1\n\n");
    return text.trim();
};

export default function AdminPortal() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [previewMode, setPreviewMode] = useState(false);

    // For editing
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        category: "Legal Guide",
        summary: "",
        content: "", // This will hold the VISUAL format
        slug: "",
        readTime: "8 min read"
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "namana") {
            setIsLoggedIn(true);
        } else {
            alert("Unauthorized. Please check your credentials.");
        }
    };

    const resetForm = () => {
        setFormData({ title: "", category: "Legal Guide", summary: "", content: "", slug: "", readTime: "8 min read" });
        setEditingId(null);
        setPreviewMode(false);
    };

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // Convert visual content to HTML before sending to server
        const payload = {
            ...formData,
            content: parseToHtml(formData.content)
        };

        const result = editingId
            ? await updateArticle(editingId, payload)
            : await publishArticle(payload);

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
            content: parseToVisual(article.content), // Convert HTML to Visual for the client
            slug: article.slug,
            readTime: article.readTime || "8 min read"
        });
        setPreviewMode(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const htmlPreview = useMemo(() => parseToHtml(formData.content), [formData.content]);

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
                    <div className="lg:col-span-12 xl:col-span-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-serif text-primary">
                                {editingId ? "Edit Article" : "Draft New Insight"}
                            </h2>
                            <div className="flex items-center gap-4">
                                {status === "loading" && (
                                    <div className="flex items-center gap-3 text-accent transition-all">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Saving to Cloud...</span>
                                    </div>
                                )}
                                {status === "success" && (
                                    <div className="flex items-center gap-3 text-green-500 transition-all">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{message}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <form onSubmit={handlePublish} className="space-y-8 bg-white p-10 rounded-[2.5rem] border border-border shadow-sm">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted">Headline</label>
                                    <input
                                        type="text" required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent text-primary font-bold"
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
                                <label className="text-xs font-black uppercase tracking-widest text-muted">Article Excerpt (Short Preview)</label>
                                <textarea rows={2} required
                                    value={formData.summary}
                                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent italic text-sm"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-border pb-4">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted">Article Intelligence Body</label>
                                    <div className="flex bg-background p-1 rounded-lg border border-border">
                                        <button
                                            type="button"
                                            onClick={() => setPreviewMode(false)}
                                            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${!previewMode ? "bg-white text-primary shadow-sm" : "text-muted hover:text-primary"}`}
                                        >
                                            <PenTool className="w-3 h-3" /> Write
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPreviewMode(true)}
                                            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${previewMode ? "bg-white text-primary shadow-sm" : "text-muted hover:text-primary"}`}
                                        >
                                            <Eye className="w-3 h-3" /> Preview
                                        </button>
                                    </div>
                                </div>

                                {previewMode ? (
                                    <div className="min-h-[400px] p-10 bg-white border border-border rounded-3xl overflow-y-auto article-content shadow-inner">
                                        <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
                                    </div>
                                ) : (
                                    <div className="relative group">
                                        <textarea rows={15} required
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            className="w-full bg-background border border-border rounded-3xl p-8 outline-none focus:border-accent text-lg leading-relaxed text-primary placeholder:text-muted/30"
                                            placeholder="## Your Section Header\n\nStart typing your analysis here...\n\n> Use a chevron for expert quotes."
                                        />
                                        <div className="absolute right-6 bottom-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="bg-white p-4 rounded-2xl border border-border shadow-2xl space-y-3 w-48">
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-accent border-b border-border pb-2">
                                                    <HelpCircle className="w-3 h-3" /> Shortcuts
                                                </div>
                                                <div className="space-y-2 text-[10px] text-muted">
                                                    <p><span className="text-primary font-bold">##</span> Header</p>
                                                    <p><span className="text-primary font-bold">&gt;</span> Expert Quote</p>
                                                    <p><span className="text-primary font-bold">[Enter x2]</span> New Paragraph</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit" disabled={status === "loading"}
                                    className="flex-1 bg-primary text-white py-6 rounded-2xl font-bold uppercase tracking-[0.2em] hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 transition-all"
                                >
                                    {editingId ? "Save Changes" : "Commit to Live Hub"}
                                    {editingId ? <CheckCircle2 className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                                </button>
                                {editingId && (
                                    <button
                                        type="button" onClick={resetForm}
                                        className="px-8 border border-border rounded-2xl text-muted font-bold uppercase text-[10px] tracking-widest hover:bg-background transition-colors"
                                    >
                                        Discard
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-12 xl:col-span-4 space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
                            <h3 className="text-xl font-serif text-primary mb-6">Article Intelligence Inventory</h3>
                            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                                {initialArticles.map((article) => (
                                    <div key={article.id} className="p-4 bg-background border border-border rounded-2xl group flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <span className="text-[9px] font-black text-accent uppercase tracking-widest block mb-1">{article.category}</span>
                                            <h4 className="text-sm font-bold text-primary mb-1 line-clamp-1">{article.title}</h4>
                                            <p className="text-[10px] text-muted uppercase tracking-widest">{article.date}</p>
                                        </div>
                                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => startEdit(article)}
                                                className="p-2 bg-white border border-border rounded-lg text-primary hover:border-accent hover:text-accent transition-colors"
                                            >
                                                <Edit3 className="w-3 h-3" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(article.id, article.title)}
                                                className="p-2 bg-white border border-border rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
