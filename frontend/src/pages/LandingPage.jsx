import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSession } from '../context/SessionContext';

const LandingPage = () => {
    const navigate = useNavigate();
    const { startSession } = useSession();

    const handleStart = () => {
        startSession();
        navigate('/upload');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold text-green-600 mb-6">Welcome to Lumina Garden</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Your personal space for growth and learning.
                </p>
                <div className="space-x-4">
                    <button
                        onClick={handleStart}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                    >
                        Get Started
                    </button>
                    {/* Dashboard button removed as it requires active session found elsewhere */}
                </div>
            </motion.div>
        </div>
    );
};

export default LandingPage;
