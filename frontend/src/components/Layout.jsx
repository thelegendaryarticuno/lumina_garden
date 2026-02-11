import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sprout, BookOpen, BrainCircuit, Activity } from 'lucide-react';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-nature-50 flex flex-col font-sans text-slate-800">
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass-card m-4 mt-2">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold text-nature-800">
                        <Sprout className="w-8 h-8 text-nature-600" />
                        <span>Lumina Garden</span>
                    </NavLink>

                    <div className="hidden md:flex items-center gap-8">
                        <NavLink to="/dashboard" className={({ isActive }) => `nav-link flex items-center gap-2 ${isActive ? 'active text-nature-700' : ''}`}>
                            <Activity className="w-4 h-4" /> Dashboard
                        </NavLink>
                        <NavLink to="/garden" className={({ isActive }) => `nav-link flex items-center gap-2 ${isActive ? 'active text-nature-700' : ''}`}>
                            <Sprout className="w-4 h-4" /> Living Garden
                        </NavLink>
                        <NavLink to="/notes" className={({ isActive }) => `nav-link flex items-center gap-2 ${isActive ? 'active text-nature-700' : ''}`}>
                            <BookOpen className="w-4 h-4" /> Notes
                        </NavLink>
                    </div>

                    <div className="flex items-center gap-4">
                        <NavLink to="/upload" className="glass-button">
                            New Session
                        </NavLink>
                    </div>
                </div>
            </nav>

            <main className="flex-1 pt-24 px-4 pb-12 w-full max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}
