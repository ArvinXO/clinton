"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
    return (
        <div className="pt-40 pb-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10" />
            <div className="max-w-7xl mx-auto px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-serif mb-6"
                >
                    {title}
                </motion.h1>
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted max-w-2xl leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
