"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DynamicBackground from "@/components/DynamicBackground";
import { motion } from "framer-motion";

export default function About() {
    return (
        <main className="relative min-h-screen">
            <DynamicBackground />
            <Navbar />
            <PageHeader
                title="About Our Mission"
                subtitle="We are a legal-led support initiative committed to helping people reclaim their money and rebuild their lives."
            />

            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-lg text-muted leading-relaxed"
                    >
                        <p>
                            Unlike UK-regulated operators, Curaçao-licensed casinos operate outside British law. They deliberately bypass player protections: there are no deposit limits, no self-exclusion enforcement, and no accountability when they refuse to pay out.
                        </p>
                        <p className="text-primary font-serif text-2xl">
                            This isn’t a grey area. It’s <span className="text-accent italic">gambling abuse</span>.
                        </p>
                        <p>
                            Many victims suffer in silence — ashamed, isolated, and unsure where to turn. Clinton & Co Advisors was founded by one of those victims: someone who fought back, recovered their losses, and now works with specialists to help others do the same.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 rounded-[2.5rem] border border-border shadow-2xl"
                    >
                        <h3 className="text-3xl font-serif mb-6 text-primary text-center">Our Commitment</h3>
                        <p className="text-muted text-center italic mb-8">
                            "We are not a casino claims mill. We provide the expertise and legal connections
                            needed to stand up to offshore operators who profit from your pain."
                        </p>
                        <div className="flex justify-center">
                            <div className="w-20 h-1 bg-accent" />
                        </div>
                    </motion.div>
                </div>

                <div className="mt-32 grid md:grid-cols-3 gap-12">
                    {[
                        { title: "Transparency", desc: "No hidden fees, no false promises. Just clear, honest legal guidance." },
                        { title: "Integrity", desc: "We prioritize your recovery and mental health over profit." },
                        { title: "Expertise", desc: "We work exclusively with specialists in offshore gambling law." }
                    ].map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h4 className="text-xl font-bold mb-4 text-primary">{value.title}</h4>
                            <p className="text-muted text-sm leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
