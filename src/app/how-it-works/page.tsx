"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DynamicBackground from "@/components/DynamicBackground";
import Process from "@/components/Process";

export default function HowItWorks() {
    return (
        <main className="relative min-h-screen">
            <DynamicBackground />
            <Navbar />
            <PageHeader
                title="Our Process"
                subtitle="A transparent, four-step methodology designed to secure the justice and refunds you deserve."
            />
            <Process />

            <section className="py-24 max-w-4xl mx-auto px-6 text-center">
                <h3 className="text-3xl font-serif mb-6">Ready to take the first step?</h3>
                <p className="text-muted mb-10">
                    Our initial assessment is completely free and strictly confidential.
                    We'll review your case and let you know if you have a valid claim for recovery.
                </p>
                <a
                    href="/contact"
                    className="inline-block px-10 py-4 brand-button rounded-sm font-bold uppercase tracking-widest"
                >
                    Start Your Claim
                </a>
            </section>

            <Footer />
        </main>
    );
}
