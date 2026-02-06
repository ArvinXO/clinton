"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, FileText, Plus, LogOut, Trash2, Edit3, CheckCircle2, AlertCircle, Loader2, ExternalLink, Eye, PenTool, HelpCircle, Bold, Heading2, Quote, Link as LinkIcon, List, Send } from "lucide-react";
import { publishArticle, deleteArticle, updateArticle } from "./actions";
import { articles as initialArticles } from "@/data/articles";
import { CONFIG } from "@/data/config";

// Enhanced Parser
const parseToHtml = (text: string) => {
    if (!text) return "";
    return text
        .split(/\n\s*\n/)
        .map(block => {
            block = block.trim();
            if (block.startsWith("##")) {
                return `<h2>${block.replace(/^##\s*/, "")}</h2>`;
            }
            if (block.startsWith(">")) {
                return `<blockquote>${block.replace(/^>\s*/, "")}</blockquote>`;
            }
            // Handle Bold
            let processed = block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
            return `<p>${processed}</p>`;
        })
        .join("\n");
};

const parseToVisual = (html: string) => {
    if (!html) return "";
    let text = html;
    text = text.replace(/<h2>(.*?)<\/h2>/gi, "## $1\n\n");
    text = text.replace(/<blockquote>(.*?)<\/blockquote>/gi, "> $1\n\n");
    text = text.replace(/<strong>(.*?)<\/strong>/gi, "**$1**");
    text = text.replace(/<p>(.*?)<\/p>/gi, "$1\n\n");
    return text.trim();
};

export default function AdminPortal() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [previewMode, setPreviewMode] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
        if (password === "namana") setIsLoggedIn(true);
        else alert("Unauthorized access.");
    };

    const injectFormatting = (prefix: string, suffix: string = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = formData.content;
        const selection = text.substring(start, end);

        const newContent = text.substring(0, start) + prefix + selection + suffix + text.substring(end);
        setFormData({ ...formData, content: newContent });

        // Refocus and set selection after state update
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };

    const resetForm = () => {
        setFormData({ title: "", category: "Legal Guide", summary: "", content: "", slug: "", readTime: "8 min read" });
        setEditingId(null);
        setPreviewMode(false);
    };

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        const payload = { ...formData, content: parseToHtml(formData.content) };
        const result = editingId ? await updateArticle(editingId, payload) : await publishArticle(payload);
        if (result && result.success) {
            setStatus("success");
            setMessage(result.message || "Success");
            resetForm();
        } else {
            setStatus("error");
            setMessage(result?.message || "Action failed.");
        }
        setTimeout(() => { setStatus("idle"); setMessage(""); }, 5000);
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Delete "${title}"?`)) return;
        setStatus("loading");
        const result = await deleteArticle(id);
        if (result && result.success) {
            setStatus("success");
            setMessage("Asset Removed.");
        } else {
            setStatus("error");
            setMessage(result?.message || "Delete failed.");
        }
        setTimeout(() => { setStatus("idle"); setMessage(""); }, 5000);
    };

    const startEdit = (article: any) => {
        setEditingId(article.id);
        setFormData({
            title: article.title,
            category: article.category,
            summary: article.summary,
            content: parseToVisual(article.content),
            slug: article.slug,
            readTime: article.readTime || "8 min read"
        });
        setPreviewMode(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-6 text-primary">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-border max-w-md w-full">
                    <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 mx-auto"><Lock className="w-8 h-8" /></div>
                    <h1 className="text-3xl font-serif text-center mb-2">Auth Required</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input type="password" placeholder="Access Key" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent font-mono" />
                        <button className="w-full brand-button py-4 rounded-xl font-bold uppercase tracking-widest bg-primary text-white">Unlock Console</button>
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
                    <div className="flex flex-col">
                        <span className="font-bold text-primary uppercase tracking-widest text-[10px]">Administrative Hub</span>
                        <span className="text-[8px] text-muted font-mono">{CONFIG.version}</span>
                    </div>
                </div>
                <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 text-xs font-bold text-muted hover:text-red-500 transition-colors"><LogOut className="w-4 h-4" /> Exit</button>
            </nav>

            <main className="max-w-7xl mx-auto py-16 px-6">
                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-12 xl:col-span-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-serif text-primary">{editingId ? "Modify Insight" : "Draft Intelligence"}</h2>
                            <AnimatePresence>
                                {status !== "idle" && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className={`flex items-center gap-3 ${status === "success" ? "text-green-500" : status === "error" ? "text-red-500" : "text-accent"}`}>
                                        {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                        <span className="text-[10px] font-black uppercase tracking-widest">{status === "loading" ? "Syncing..." : message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <form onSubmit={handlePublish} className="space-y-8 bg-white p-10 rounded-[2.5rem] border border-border shadow-sm">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted">Headline</label>
                                    <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent text-primary font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted">Field</label>
                                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent font-bold text-primary text-sm">
                                        <option>Legal Guide</option>
                                        <option>Case Study</option>
                                        <option>Regulation</option>
                                        <option>Player Rights</option>
                                        <option>Privacy & Data</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted">Intelligence Abstract (Preview)</label>
                                <textarea rows={2} required value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent italic text-sm text-primary" />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-border pb-4">
                                    <div className="flex items-center gap-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted">Full Intelligence Body</label>
                                        {!previewMode && (
                                            <div className="flex items-center bg-background rounded-lg border border-border p-1 gap-1">
                                                <button type="button" onClick={() => injectFormatting("## ", "")} className="p-1.5 hover:bg-white rounded transition-colors text-primary" title="Add Heading"><Heading2 className="w-4 h-4" /></button>
                                                <button type="button" onClick={() => injectFormatting("**", "**")} className="p-1.5 hover:bg-white rounded transition-colors text-primary" title="Make Bold"><Bold className="w-4 h-4" /></button>
                                                <button type="button" onClick={() => injectFormatting("> ", "")} className="p-1.5 hover:bg-white rounded transition-colors text-primary" title="Add Expert Quote"><Quote className="w-4 h-4" /></button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex bg-background p-1 rounded-lg border border-border">
                                        <button type="button" onClick={() => setPreviewMode(false)} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${!previewMode ? "bg-white text-primary shadow-sm" : "text-muted hover:text-primary"}`}><PenTool className="w-3 h-3" /> Edit</button>
                                        <button type="button" onClick={() => setPreviewMode(true)} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${previewMode ? "bg-white text-primary shadow-sm" : "text-muted hover:text-primary"}`}><Eye className="w-3 h-3" /> Preview</button>
                                    </div>
                                </div>

                                {previewMode ? (
                                    <div className="min-h-[400px] p-10 bg-white border border-border rounded-3xl article-content shadow-inner overflow-y-auto">
                                        <div dangerouslySetInnerHTML={{ __html: parseToHtml(formData.content) }} />
                                    </div>
                                ) : (
                                    <textarea ref={textareaRef} rows={15} required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full bg-background border border-border rounded-3xl p-8 outline-none focus:border-accent text-lg leading-relaxed text-primary" placeholder="## Title\n\nIntelligence content goes here..." />
                                )}
                            </div>

                            <button type="submit" disabled={status === "loading"} className="w-full bg-primary text-white py-6 rounded-2xl font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all hover:shadow-2xl disabled:opacity-50">
                                {editingId ? "Update Intelligence" : "Broadcast to Live Site"}
                                {editingId ? <CheckCircle2 className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-12 xl:col-span-4 space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
                            <h3 className="text-xl font-serif text-primary mb-6">Insight Inventory</h3>
                            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                                {initialArticles.map((article) => (
                                    <div key={article.id} className="p-4 bg-background border border-border rounded-2xl group flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <span className="text-[8px] font-black text-accent uppercase tracking-widest block mb-1">{article.category}</span>
                                            <h4 className="text-xs font-bold text-primary mb-1 line-clamp-1">{article.title}</h4>
                                            <p className="text-[10px] text-muted uppercase tracking-tighter">{article.date}</p>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                            <button onClick={() => startEdit(article)} className="p-2 bg-white border border-border rounded-lg text-primary hover:border-accent hover:text-accent transition-colors"><Edit3 className="w-3 h-3" /></button>
                                            <button onClick={() => handleDelete(article.id, article.title)} className="p-2 bg-white border border-border rounded-lg text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="w-3 h-3" /></button>
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
