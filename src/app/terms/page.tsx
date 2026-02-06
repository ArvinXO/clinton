"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DynamicBackground from "@/components/DynamicBackground";
import { motion } from "framer-motion";

export default function Terms() {
    return (
        <main className="relative min-h-screen">
            <DynamicBackground />
            <Navbar />
            <PageHeader
                title="Terms of Service"
                subtitle="Please read these terms carefully before using our services."
            />

            <section className="py-24 max-w-4xl mx-auto px-6 text-muted leading-relaxed space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-serif text-primary">1. Introduction</h2>
                    <p>
                        Welcome to Clinton & Co Advisors. These Terms of Service govern your use of our website and our services. By accessing or using our services, you agree to be bound by these terms.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">2. Our Services</h2>
                    <p>
                        Clinton & Co Advisors provides support and guidance for individuals seeking to reclaim funds from offshore gambling operators. We are not a law firm and do not provide legal advice. We connect clients with regulated legal partners who handle formal recovery actions.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">3. Use of Website</h2>
                    <p>
                        You may use our website for lawful purposes only. You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">4. Case Assessment</h2>
                    <p>
                        Our initial case assessment is provided free of charge and without obligation. We reserve the right to decline cases at our discretion based on our assessment of the feasibility of recovery.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">5. Limitation of Liability</h2>
                    <p>
                        Clinton & Co Advisors will not be liable for any loss or damage arising from your use of our website or services, to the extent permitted by law.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">6. Changes to Terms</h2>
                    <p>
                        We may update these Terms of Service from time to time. Your continued use of the website following any changes constitutes your acceptance of the new terms.
                    </p>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
