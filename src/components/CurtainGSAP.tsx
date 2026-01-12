"use client";

import { useRef, useState, ReactNode } from "react";
import gsap from "gsap";

export default function CurtainGSAP({ children }: { children: ReactNode }) {
    const left = useRef<HTMLDivElement>(null);
    const right = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openCurtain = () => {
        if (isOpen) return;

        gsap.to(left.current, {
            x: "-100%",
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                // Optional: Hide/remove curtains from DOM for performance or z-index
            }
        });

        gsap.to(right.current, {
            x: "100%",
            duration: 1.5,
            ease: "power2.inOut"
        });

        setIsOpen(true);
    };

    return (
        <div className="curtain-container">
            <div
                className={`curtain-overlay ${isOpen ? 'pointer-events-none' : ''}`}
                onClick={openCurtain}
            >
                <div ref={left} className="curtain left">
                    {/* You could add a "Click to Open" text or Logo here if needed */}
                    <div className="curtain-text">
                        <h1 className="text-white text-4xl font-bold">Welcome</h1>
                        <p className="text-white mt-2">Click to Inaugurate</p>
                    </div>
                </div>
                <div ref={right} className="curtain right">
                    {/* Mirror or empty */}
                </div>
            </div>
            <div className="content-layer">
                {children}
            </div>
        </div>
    );
}
