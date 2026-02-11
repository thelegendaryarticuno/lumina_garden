import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle } from 'lucide-react';

const steps = [
    "Analyzing study material...",
    "Extracting key concepts...",
    "Building knowledge graph...",
    "Planting your garden..."
];

export default function Processing() {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev >= steps.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => navigate('/notes'), 1000);
                    return prev;
                }
                return prev + 1;
            });
        }, 1500); // 1.5s per step

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12">
            <div className="relative w-32 h-32">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full rounded-full border-4 border-nature-200 border-t-nature-600"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-nature-600 animate-spin" />
                </div>
            </div>

            <div className="space-y-4 w-full max-w-md">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                            opacity: index <= currentStep ? 1 : 0.4,
                            x: 0,
                            scale: index === currentStep ? 1.05 : 1
                        }}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-colors
                    ${index === currentStep ? 'bg-white shadow-md border border-nature-100' : ''}
                    ${index < currentStep ? 'text-nature-700' : 'text-slate-400'}
                `}
                    >
                        {index < currentStep ? (
                            <CheckCircle className="w-6 h-6 text-nature-600" />
                        ) : (
                            <div className={`w-6 h-6 rounded-full border-2 
                        ${index === currentStep ? 'border-nature-500 border-t-transparent animate-spin' : 'border-slate-300'}
                    `} />
                        )}
                        <span className="font-medium text-lg">{step}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
