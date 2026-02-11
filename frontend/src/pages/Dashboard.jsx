import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

export default function Dashboard() {
    const [stats, setStats] = useState({ mastery: 0, weakTopics: [], recentQuizzes: [] });

    useEffect(() => {
        // Mock user ID for MVP
        const userId = "demo_user";
        api.getGarden(userId).then(data => {
            // Use real stats from backend (or defaults)
            const backendStats = data.stats || {};

            setStats({
                mastery: backendStats.mastery_score || 0,
                weakTopics: backendStats.weak_topics || [],
                recentQuizzes: backendStats.quizzes_taken > 0 ? [
                    // If we have quizzes, we'd fetch them properly. For now, show placeholder ONLY if verified
                    // But user asked to remove "direct results". So let's keep it empty if 0 quizzes.
                ] : []
            });
        });
    }, []);

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-nature-900 mb-2">Welcome back, Scholar</h1>
                <p className="text-slate-500 text-lg">Your knowledge garden is thriving today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mastery Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6 flex flex-col items-center justify-center text-center"
                >
                    <div className="w-32 h-32 rounded-full border-8 border-nature-200 flex items-center justify-center mb-4 relative">
                        <span className="text-4xl font-bold text-nature-700">{stats.mastery}%</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700">Overall Mastery</h3>
                </motion.div>

                {/* Weak Topics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6"
                >
                    <h3 className="text-xl font-semibold mb-4 text-slate-700">Focus Areas</h3>
                    <ul className="space-y-3">
                        {stats.weakTopics.map((topic, i) => (
                            <li key={i} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100 text-red-700">
                                <span className="w-2 h-2 rounded-full bg-red-400" />
                                {topic}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Quick Quiz */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 bg-gradient-to-br from-nature-50 to-white"
                >
                    <h3 className="text-xl font-semibold mb-4 text-slate-700">Ready for a challenge?</h3>
                    <p className="text-slate-500 mb-6">Strengthen your weak topics with a quick adaptive quiz.</p>
                    <button className="w-full glass-button text-center justify-center">Start Adaptive Quiz</button>
                </motion.div>
            </div>

            {/* Recent Activity */}
            <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Recent Activity</h2>
                <div className="glass-card p-6 divide-y divide-slate-100">
                    {stats.recentQuizzes.map((quiz) => (
                        <div key={quiz.id} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                            <div>
                                <h4 className="font-medium text-slate-800">Quiz: {quiz.topic}</h4>
                                <span className="text-sm text-slate-400">{quiz.date}</span>
                            </div>
                            <span className="font-bold text-nature-600">{quiz.score}%</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
