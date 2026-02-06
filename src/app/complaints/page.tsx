"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DynamicBackground from "@/components/DynamicBackground";
import { motion } from "framer-motion";

export default function Complaints() {
    return (
        <main className="relative min-h-screen">
            <DynamicBackground />
            <Navbar />
            <PageHeader
                title="Complaints Procedure"
                subtitle="We are committed to providing a high-quality service."
            />

            <section className="py-24 max-w-4xl mx-auto px-6 text-muted leading-relaxed space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-serif text-primary">Our Commitment</h2>
                    <p>
                        At Clinton & Co Advisors, we strive to provide the best possible support for our clients. If something goes wrong, we want to hear about it so we can put it right and improve our standards.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">How to Make a Complaint</h2>
                    <p>
                        If you have a complaint, please contact us by email at office@clintonandco.co.uk. Please provide as much detail as possible, including your contact information and the nature of the issue.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">Our Response Process</h2>
                    <ol className="list-decimal pl-6 space-y-4">
                        <li><strong>Acknowledgment:</strong> We will acknowledge your complaint within 3 working days.</li>
                        <li><strong>Investigation:</strong> We will investigate the matter thoroughly, which may involve reviewing case records and speaking with relevant staff members.</li>
                        <li><strong>Resolution:</strong> We aim to provide a full response and proposed resolution within 15 working days of receiving your complaint.</li>
                    </ol>

                    <h2 className="text-2xl font-serif text-primary">Further Action</h2>
                    <p>
                        If you are not satisfied with our initial response, you can request a review by a senior advisor. We will provide a final decision within a further 10 working days.
                    </p>

                    <h2 className="text-2xl font-serif text-primary">Regulated Partners</h2>
                    <p>
                        Please note that complaints regarding legal services provided by our regulated partners should be directed to the respective law firm's own complaints procedure.
                    </p>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
