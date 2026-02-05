"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-background pt-24 pb-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-4 mb-6">
                            <div className="relative w-10 h-10 flex items-center justify-center">
                                <Image
                                    src="/clinton.webp"
                                    alt="Clinton & Co Logo"
                                    width={32}
                                    height={32}
                                    className="object-contain brightness-0 invert"
                                />
                            </div>
                            <span className="text-xl font-serif font-bold tracking-tight">
                                CLINTON <span className="text-primary">&</span> CO
                            </span>
                        </Link>
                        <p className="text-muted text-sm leading-relaxed mb-8">
                            Legal-led support initiative committed to helping UK victims of
                            offshore casino abuse reclaim their funds and rebuild their lives.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 glass rounded-full hover:border-primary/50 transition-all">
                                <Linkedin className="w-4 h-4 text-muted hover:text-primary" />
                            </a>
                            <a href="#" className="p-2 glass rounded-full hover:border-primary/50 transition-all">
                                <Twitter className="w-4 h-4 text-muted hover:text-primary" />
                            </a>
                            <a href="#" className="p-2 glass rounded-full hover:border-primary/50 transition-all">
                                <Facebook className="w-4 h-4 text-muted hover:text-primary" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/about" className="text-muted hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/how-it-works" className="text-muted hover:text-primary transition-colors">How It Works</Link></li>
                            <li><Link href="/articles" className="text-muted hover:text-primary transition-colors">Articles & News</Link></li>
                            <li><Link href="/contact" className="text-muted hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Legal</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/terms" className="text-muted hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-muted hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/cookie-policy" className="text-muted hover:text-primary transition-colors">Cookie Policy</Link></li>
                            <li><Link href="/complaints" className="text-muted hover:text-primary transition-colors">Complaints Procedure</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Stay Informed</h4>
                        <p className="text-muted text-sm mb-4">Latest news on gambling law and player protection.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none w-full focus:border-primary/50"
                            />
                            <button className="p-2 gold-button rounded-lg">
                                <Linkedin className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-muted text-xs">
                        © {new Date().getFullYear()} Clinton & Co Advisors. All rights reserved.
                    </p>
                    <p className="text-muted text-[10px] uppercase tracking-widest max-w-md text-center md:text-right">
                        *CLINTON & CO ARE NOT LAWYERS OR SOLICITORS. WE CONNECT CLIENTS WITH REGULATED LEGAL PARTNERS.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
