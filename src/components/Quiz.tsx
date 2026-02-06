"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    ArrowLeft,
    Send,
    ShieldCheck,
    ClipboardList,
    Database,
    CheckCircle2
} from "lucide-react";

const Quiz = () => {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        casino: "",
        gamstop: "",
        loss: "",
        name: "",
        email: "",
        phone: ""
    });

    const totalSteps = 4;
    const progress = (step / totalSteps) * 100;

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h4 className="text-2xl font-serif text-primary">Which casino operator were you using?</h4>
                            <p className="text-muted text-sm">List the main sites where you experienced issues with deposits or payouts.</p>
                        </div>
                        <input
                            type="text"
                            value={formData.casino}
                            onChange={(e) => setFormData({ ...formData, casino: e.target.value })}
                            className="w-full bg-background border border-border rounded-xl p-4 focus:border-accent outline-none transition-all text-primary text-lg"
                            placeholder="e.g. Stake, Roobet, Rollbit..."
                        />
                        <button
                            onClick={nextStep}
                            disabled={!formData.casino}
                            className="w-full brand-button py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            Next Step <ChevronRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h4 className="text-2xl font-serif text-primary">Were you registered with GamStop?</h4>
                            <p className="text-muted text-sm">Did you have an active self-exclusion at the time of gambling?</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {["Yes, I was active", "No / Not sure"].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        setFormData({ ...formData, gamstop: option });
                                        nextStep();
                                    }}
                                    className={`p-6 rounded-2xl border-2 transition-all text-left ${formData.gamstop === option
                                        ? "border-accent bg-accent/5 text-primary"
                                        : "border-border hover:border-accent/40"
                                        }`}
                                >
                                    <span className="font-bold">{option}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h4 className="text-2xl font-serif text-primary">Estimated recovery amount?</h4>
                            <p className="text-muted text-sm">What is the total amount of deposits you wish to reclaim?</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            {["Under £5,000", "£5,000 - £20,000", "£20,000 - £100,000", "Over £100,000"].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => {
                                        setFormData({ ...formData, loss: range });
                                        nextStep();
                                    }}
                                    className={`p-4 rounded-xl border transition-all text-left text-sm ${formData.loss === range
                                        ? "border-accent bg-accent/5 text-primary font-bold"
                                        : "border-border hover:border-accent/40"
                                        }`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h4 className="text-2xl font-serif text-primary">Where should we send your report?</h4>
                            <p className="text-muted text-sm">Provide your contact details for the full eligibility analysis.</p>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent"
                            />
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-accent"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={!formData.name || !formData.email}
                            className="w-full brand-button py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            Submit Assessment <Send className="w-4 h-4" />
                        </button>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
            >
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-3xl font-serif text-primary">Eligibility Quiz Submitted!</h3>
                    <p className="text-muted max-w-md mx-auto">
                        Thank you, {formData.name.split(' ')[0]}. Our senior advisors are reviewing your case against the provided details for {formData.casino}. We will reach out within 24 hours.
                    </p>
                </div>
                <button
                    onClick={() => {
                        setIsSubmitted(false);
                        setStep(1);
                    }}
                    className="text-accent font-bold uppercase text-xs tracking-widest hover:underline"
                >
                    Submit another case
                </button>
            </motion.div>
        );
    }

    return (
        <div className="bg-secondary p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-border relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-border/30">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-accent"
                />
            </div>

            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                        <ClipboardList className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Step {step} of {totalSteps}</span>
                        <p className="text-sm font-bold text-primary">Eligibility Evaluation</p>
                    </div>
                </div>
                {step > 1 && (
                    <button
                        onClick={prevStep}
                        className="flex items-center gap-2 text-xs font-bold text-muted hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-3 h-3" /> Back
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {renderStep()}
            </AnimatePresence>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-8 justify-center opacity-40">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">100% Confidential</span>
                </div>
                <div className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">GDPR Compliant</span>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
