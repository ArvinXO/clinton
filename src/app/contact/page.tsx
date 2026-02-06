"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DynamicBackground from "@/components/DynamicBackground";
import Contact from "@/components/Contact";

export default function ContactPage() {
    return (
        <main className="relative min-h-screen">
            <DynamicBackground />
            <Navbar />
            <PageHeader
                title="Get in Touch"
                subtitle="Start your recovery journey today. Our initial consultation is free, confidential, and without obligation."
            />

            <div className="-mt-12 relative z-20">
                <Contact />
            </div>

            <section className="pb-24 max-w-7xl mx-auto px-6">
                <div className="glass p-12 rounded-3xl grid md:grid-cols-3 gap-12 text-center border-primary/5 shadow-2xl">
                    <div>
                        <h5 className="font-serif text-xl mb-2 text-primary">Main Office</h5>
                        <p className="text-muted text-sm">Central London<br />United Kingdom</p>
                    </div>
                    <div>
                        <h5 className="font-serif text-xl mb-2 text-primary">Working Hours</h5>
                        <p className="text-muted text-sm">Monday – Friday<br />09:00 AM – 06:00 PM</p>
                    </div>
                    <div>
                        <h5 className="font-serif text-xl mb-2 text-primary">Direct Response</h5>
                        <p className="text-muted text-sm">We aim to respond to all<br />enquiries within 24 hours.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
