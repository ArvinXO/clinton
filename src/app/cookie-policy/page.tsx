"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DynamicBackground from "@/components/DynamicBackground";
import { motion } from "framer-motion";

export default function CookiePolicy() {
    return (
        <main className="relative min-h-screen">
            <DynamicBackground />
            <Navbar />
            <PageHeader
                title="Cookie Policy"
                subtitle="Information about how we use cookies on our website."
            />

            <section className="py-24 max-w-4xl mx-auto px-6 text-muted leading-relaxed space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-serif text-primary">What are Cookies?</h2>
                    <p>
                        Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">How We Use Cookies</h2>
                    <p>
                        We use cookies to enhance your experience on our website, such as remembering your preferences and understanding how you use our site to improve its performance.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">Types of Cookies Used</h2>
                    <ul className="list-disc pl-6 space-y-4">
                        <li><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
                        <li><strong>Analytical Cookies:</strong> Help us understand website traffic and user behavior.</li>
                        <li><strong>Functional Cookies:</strong> Remember your choices and providing enhanced features.</li>
                    </ul>

                    <h2 className="text-2xl font-serif text-primary">Managing Cookies</h2>
                    <p>
                        You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or to delete existing ones. Please note that disabling cookies may affect the functionality of our website.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">Updates to this Policy</h2>
                    <p>
                        We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                    </p>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
