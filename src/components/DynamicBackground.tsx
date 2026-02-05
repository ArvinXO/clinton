"use client";

import React from "react";

const DynamicBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-[#050505]">
            {/* High-end ambient mesh gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px]"
                    style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
                />
                <div
                    className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full opacity-10 blur-[150px]"
                    style={{ background: 'radial-gradient(circle, #2C3E50 0%, transparent 70%)' }}
                />
                <div
                    className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full opacity-10 blur-[120px]"
                    style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
                />
            </div>

            {/* Subtle grain texture for premium feel */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
        </div>
    );
};

export default DynamicBackground;
