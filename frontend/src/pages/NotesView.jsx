import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Share2 } from 'lucide-react';

const mockNotes = {
    title: "Introduction to Cellular Biology",
    summary: "This session covers the fundamental unit of life, the cell, including its structure, organelles, and energy production mechanisms.",
    sections: [
        {
            heading: "Cell Structure",
            content: "Cells are the basic building blocks of all living things. The human body is composed of trillions of cells. They provide structure for the body, take in nutrients from food, convert those nutrients into energy, and carry out specialized functions."
        },
        {
            heading: "Key Organelles",
            bullets: [
                "Nucleus: Contains genetic material (DNA).",
                "Mitochondria: Generates most of the chemical energy needed to power the cell's biochemical reactions.",
                "Ribosomes: Responsible for protein synthesis."
            ]
        }
    ]
};

export default function NotesView() {
    const [notes, setNotes] = useState(null);

    useEffect(() => {
        // Load from local storage if available (simulating data passing)
        const storedSession = localStorage.getItem('current_session');
        if (storedSession) {
            try {
                const sessionData = JSON.parse(storedSession);
                if (sessionData.notes) {
                    setNotes(sessionData.notes);
                    return;
                }
            } catch (e) {
                console.error("Failed to parse session data", e);
            }
        }

        // Fallback to mock if no session data
        console.log("No session data found, loading mock notes");
        setTimeout(() => setNotes(mockNotes), 500);
    }, []);

    if (!notes) return <div className="p-12 text-center text-slate-400">Loading notes...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="flex justify-between items-start">
                <div className="space-y-4">
                    <span className="px-3 py-1 bg-nature-100 text-nature-700 text-sm font-semibold rounded-full">Biology 101</span>
                    <h1 className="text-4xl font-bold text-nature-900">{notes.title}</h1>
                    <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">{notes.summary}</p>
                </div>
                <button className="p-2 hover:bg-white rounded-full transition-colors text-slate-500 hover:text-nature-600">
                    <Share2 size={20} />
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {notes.sections.map((sec, i) => (
                        <motion.section
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8"
                        >
                            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-nature-100 flex items-center justify-center text-nature-600 text-sm font-bold">{i + 1}</span>
                                {sec.heading}
                            </h2>
                            {sec.content && <p className="text-slate-600 leading-relaxed text-lg">{sec.content}</p>}
                            {sec.bullets && (
                                <ul className="space-y-3 mt-4">
                                    {sec.bullets.map((b, j) => (
                                        <li key={j} className="flex items-start gap-3 text-slate-600">
                                            <span className="mt-2 w-1.5 h-1.5 bg-nature-400 rounded-full flex-shrink-0" />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.section>
                    ))}
                </div>

                <aside className="space-y-6">
                    <div className="glass-card p-6 sticky top-24">
                        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <BookOpen size={18} /> Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <button onClick={() => window.location.href = '/quiz'} className="w-full glass-button bg-nature-600 text-white">
                                Take Quiz
                            </button>
                            <button onClick={() => window.location.href = '/garden'} className="w-full py-2 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors">
                                View Concept Graph
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
