"use client";

import React from "react";

const DynamicBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-[#F8FAFC]">
            {/* High-end ambient mesh gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full opacity-20 blur-[120px]"
                    style={{ background: 'radial-gradient(circle, #E0F2FE 0%, transparent 70%)' }}
                />
                <div
                    className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full opacity-15 blur-[150px]"
                    style={{ background: 'radial-gradient(circle, #EFF6FF 0%, transparent 70%)' }}
                />
                <div
                    className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]"
                    style={{ background: 'radial-gradient(circle, #F1F5F9 0%, transparent 70%)' }}
                />
            </div>

            {/* Subtle grain texture for premium feel - softened for light mode */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-white/40" />
        </div>
    );
};

export default DynamicBackground;
