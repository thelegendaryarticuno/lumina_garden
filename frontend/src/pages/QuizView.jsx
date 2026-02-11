import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const mockQuiz = {
    title: "Cellular Biology Checkpoint",
    questions: [
        {
            id: 1,
            text: "Which organelle is responsible for generating ATP?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi"],
            correct: 1
        },
        {
            id: 2,
            text: "What describes the semi-permeable nature of cell membranes?",
            options: ["Fluid Mosaic Model", "Rigid Wall Theory", "Osmotic Barrier", "Active Transport Only"],
            correct: 0
        }
    ]
};

export default function QuizView() {
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleSelect = (index) => {
        if (isSubmitted) return;
        setSelected(index);
    };

    const checkAnswer = () => {
        setIsSubmitted(true);
        if (selected === mockQuiz.questions[currentQ].correct) {
            setScore(s => s + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQ < mockQuiz.questions.length - 1) {
            setCurrentQ(c => c + 1);
            setSelected(null);
            setIsSubmitted(false);
        } else {
            setShowResults(true);
        }
    };

    if (showResults) {
        return (
            <div className="max-w-xl mx-auto text-center space-y-8 pt-12">
                <h1 className="text-4xl font-bold text-nature-900">Quiz Complete!</h1>
                <div className="glass-card p-12">
                    <span className="text-6xl font-bold text-nature-600 block mb-4">
                        {Math.round((score / mockQuiz.questions.length) * 100)}%
                    </span>
                    <p className="text-slate-500 text-lg mb-8">
                        {score === mockQuiz.questions.length ? "Perfect! Garden growing strong." : "Good effort. Review weak spots to grow your garden."}
                    </p>
                    <button className="glass-button w-full" onClick={() => window.location.href = '/dashboard'}>
                        Return to Garden
                    </button>
                </div>
            </div>
        );
    }

    const question = mockQuiz.questions[currentQ];

    return (
        <div className="max-w-2xl mx-auto space-y-8 pt-8">
            <header className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">{mockQuiz.title}</h2>
                <span className="text-slate-400 font-medium">Question {currentQ + 1} of {mockQuiz.questions.length}</span>
            </header>

            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-nature-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQ + 1) / mockQuiz.questions.length) * 100}%` }}
                />
            </div>

            <div className="glass-card p-8">
                <h3 className="text-xl font-semibold mb-6 text-slate-800">{question.text}</h3>

                <div className="space-y-3">
                    {question.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => handleSelect(i)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center
                    ${selected === i ? 'bg-nature-50 border-nature-500 shadow-sm' : 'bg-white border-slate-200 hover:border-nature-300'}
                    ${isSubmitted && i === question.correct ? 'bg-green-50 border-green-500 text-green-700' : ''}
                    ${isSubmitted && selected === i && i !== question.correct ? 'bg-red-50 border-red-500 text-red-700' : ''}
                  `}
                        >
                            <span className="font-medium">{opt}</span>
                            {isSubmitted && i === question.correct && <CheckCircle size={20} />}
                            {isSubmitted && selected === i && i !== question.correct && <XCircle size={20} />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                {!isSubmitted ? (
                    <button
                        onClick={checkAnswer}
                        disabled={selected === null}
                        className="glass-button px-8 disabled:opacity-50"
                    >
                        Check Answer
                    </button>
                ) : (
                    <button
                        onClick={nextQuestion}
                        className="glass-button px-8 flex items-center gap-2"
                    >
                        {currentQ < mockQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        <ArrowRight size={20} />
                    </button>
                )}
            </div>
        </div>
    );
}
