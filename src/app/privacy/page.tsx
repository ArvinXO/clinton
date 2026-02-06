"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DynamicBackground from "@/components/DynamicBackground";
import { motion } from "framer-motion";

export default function Privacy() {
    return (
        <main className="relative min-h-screen">
            <DynamicBackground />
            <Navbar />
            <PageHeader
                title="Privacy Policy"
                subtitle="Your privacy is important to us. Learn how we handle your data."
            />

            <section className="py-24 max-w-4xl mx-auto px-6 text-muted leading-relaxed space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-serif text-primary">1. Data Collection</h2>
                    <p>
                        We collect personal information that you provide to us when you contact us or submit a case assessment form. This may include your name, email address, phone number, and details regarding your gambling history.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">2. Use of Information</h2>
                    <p>
                        We use the information we collect to assess your case, communicate with you, and, with your consent, connect you with our legal partners.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">3. Data Sharing</h2>
                    <p>
                        We do not share your personal information with third parties except as necessary to provide our services, such as sharing your details with our legal partners after you have agreed to proceed with a claim.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">4. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or destruction.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">5. Your Rights</h2>
                    <p>
                        You have the right to access, correct, or delete your personal data. You may also object to the processing of your data or request a restriction of processing.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">6. Contact Us</h2>
                    <p>
                        If you have any questions about our Privacy Policy or how we handle your data, please contact us at office@clintonandco.co.uk.
                    </p>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
