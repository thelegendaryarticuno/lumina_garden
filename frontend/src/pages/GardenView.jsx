import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { Sprout, Box, Layers, Image as ImageIcon } from 'lucide-react';

const initialNodes = [
    { id: '1', data: { label: 'Corporate Social Responsibility' }, position: { x: 300, y: 50 }, style: { background: '#dcfce7', color: '#166534', border: '2px solid #22c55e', padding: 10, borderRadius: '50%', width: 180, textAlign: 'center' } },
    { id: '2', data: { label: 'Financial Risk' }, position: { x: 100, y: 200 }, style: { background: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', padding: 10, borderRadius: '50%', width: 120, textAlign: 'center' } },
    { id: '3', data: { label: 'ESG Performance' }, position: { x: 500, y: 200 }, style: { background: '#f0fdf4', color: '#15803d', border: '1px solid #86efac', padding: 10, borderRadius: '50%', width: 120, textAlign: 'center' } },
    { id: '4', data: { label: 'Cost of Capital' }, position: { x: 0, y: 350 }, style: { background: '#fff7ed', color: '#9a3412', border: '1px solid #fdba74', padding: 10, borderRadius: '50%', width: 110, textAlign: 'center' } },
    { id: '5', data: { label: 'Reputation' }, position: { x: 200, y: 350 }, style: { background: '#e0f2fe', color: '#075985', border: '1px solid #7dd3fc', padding: 10, borderRadius: '50%', width: 110, textAlign: 'center' } },
    { id: '6', data: { label: 'Stakeholder Theory' }, position: { x: 600, y: 350 }, style: { background: '#fdf4ff', color: '#86198f', border: '1px solid #f0abfc', padding: 10, borderRadius: '50%', width: 130, textAlign: 'center' } },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', label: 'mitigates', animated: true, style: { stroke: '#4ade80' } },
    { id: 'e1-3', source: '1', target: '3', label: 'enhances', animated: true, style: { stroke: '#4ade80' } },
    { id: 'e2-4', source: '2', target: '4', label: 'increases', animated: true, style: { stroke: '#f87171' } },
    { id: 'e2-5', source: '2', target: '5', label: 'damages', animated: true, style: { stroke: '#f87171' } },
    { id: 'e3-6', source: '3', target: '6', label: 'aligns with', animated: true, style: { stroke: '#4ade80' } },
];

// Isometric Garden Component
function IsometricGarden({ nodes, rotation }) {
    return (
        <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-sky-200 to-sky-100 flex items-center justify-center perspective-[1200px]">
            {/* Background Grass/Ground - simulated with CSS */}
            <div className="absolute inset-0 bg-[url('https://repo.sourcelink.com/npm/isometric-grass-pattern.png')] opacity-20 pointer-events-none"></div>

            {/* Central Island - Rotates based on prop */}
            <motion.div
                animate={{ rotateX: 60, rotateZ: rotation }}
                transition={{ duration: 0.8, type: "spring" }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-[800px] h-[800px] bg-emerald-500 rounded-full shadow-2xl border-4 border-emerald-600"
            >
                <div className="absolute inset-0 bg-emerald-400 opacity-50 rounded-full filter blur-xl"></div>

                {/* MOTHER TREE - Central Element */}
                <motion.div
                    className="absolute z-20 top-1/2 left-1/2 flex flex-col items-center"
                    style={{
                        transformStyle: 'preserve-3d',
                        x: '-50%',
                        y: '-50%'
                    }}
                    animate={{ rotateX: -60, rotateZ: -rotation }}
                >
                    <div className="w-10 h-32 bg-amber-800 rounded-lg shadow-xl relative z-10 mx-auto"></div>
                    <div className="w-56 h-56 bg-emerald-600 rounded-full -mt-24 flex items-center justify-center shadow-2xl border-4 border-emerald-400 relative z-20">
                        <span className="text-white font-bold text-xl drop-shadow-md">Core Knowledge</span>
                    </div>
                </motion.div>

                {/* Nodes/Plants */}
                {nodes.map((node, i) => {
                    // Map graph coordinates to the circle
                    // We need to offset them from center (400, 400)
                    // Assuming node positions are somewhat relative to top-left of graph 0-800

                    const centerX = 400;
                    const centerY = 400;

                    // Simple re-mapping: graph (0,0) -> island (-300, -300) relative to center?
                    // Let's just use their relative positions from the initialNodes logic (+100, +50) but centered
                    // To make them "stick" to the ground during rotation, they are children of the rotated plane.
                    // But to look 3D (billboard), they must counter-rotate.

                    const left = node.position.x + 100; // Adjust for island size
                    const top = node.position.y + 100;

                    return (
                        <motion.div
                            key={node.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="absolute z-10 flex flex-col items-center cursor-pointer group hover:z-50"
                            style={{
                                left: left,
                                top: top,
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {/* The Tree Container counters the plane rotation to stand up */}
                            <motion.div
                                animate={{ rotateX: -60, rotateZ: -rotation }}
                                transition={{ duration: 0.8 }} // Sync with plane
                                style={{ transformStyle: 'preserve-3d' }}
                                className="relative origin-bottom transform -translate-y-full"
                            >
                                {/* Trunk */}
                                <div className="w-4 h-16 bg-amber-700 mx-auto rounded-sm shadow-sm"></div>
                                {/* Foliage */}
                                <div className={`w-24 h-24 rounded-full -mt-12 shadow-xl flex items-center justify-center border-2 border-white/20 backdrop-blur-sm
                                    ${node.id === '2' ? 'bg-red-500' : 'bg-green-500'}
                                    transition-transform hover:scale-110
                                `}>
                                    <span className="text-white font-bold text-[10px] text-center px-2 pointer-events-none leading-tight drop-shadow-md">
                                        {node.data.label}
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>

            <div className="absolute bottom-8 left-8 bg-white/80 p-4 rounded-xl backdrop-blur text-sm text-slate-600 max-w-xs shadow-lg">
                <p><strong>Garden View:</strong> Rotate to explore your knowledge landscape. The central tree represents your core subject.</p>
            </div>
        </div>
    );
}

export default function GardenView() {
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('graph');
    const [rotation, setRotation] = useState(0);
    const [nodes, setNodes] = useState(initialNodes);

    useEffect(() => {
        const storedSession = localStorage.getItem('current_session');
        if (storedSession) {
            try {
                // If we implemented converting notes to nodes...
            } catch (e) { }
        }
        setTimeout(() => setLoading(false), 800);
    }, []);

    const rotateGarden = () => {
        setRotation(prev => prev + 90);
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
            <header className="flex justify-between items-end mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-nature-900">Your Knowledge Garden</h1>
                    <p className="text-slate-500">Visualize your mastery. Green = Strong, Faded/Red = Needs Review.</p>
                </div>

                <div className="flex items-center gap-4">
                    {viewMode === '3d' && (
                        <button
                            onClick={rotateGarden}
                            className="px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600 hover:text-nature-600 font-medium flex items-center gap-2"
                        >
                            <Box size={18} /> Rotate View ({rotation % 360}°)
                        </button>
                    )}

                    {/* View Toggle */}
                    <div className="glass-card p-1 flex items-center gap-1">
                        <button
                            onClick={() => setViewMode('graph')}
                            className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all
                                ${viewMode === 'graph' ? 'bg-nature-100 text-nature-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}
                            `}
                        >
                            <Layers size={16} /> Graph
                        </button>
                        <button
                            onClick={() => setViewMode('3d')}
                            className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all
                                ${viewMode === '3d' ? 'bg-nature-100 text-nature-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}
                            `}
                        >
                            <Box size={16} /> Garden 3D
                        </button>
                    </div>
                </div>
            </header>

            <div className={`flex-1 glass-card overflow-hidden shadow-inner relative ${viewMode === '3d' ? 'bg-sky-50' : 'bg-nature-50/50'}`}>
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="animate-pulse text-nature-600">Growing your garden...</span>
                    </div>
                ) : (
                    viewMode === 'graph' ? (
                        <ReactFlow
                            nodes={nodes}
                            edges={initialEdges}
                            fitView
                        >
                            <Background color="#bbf7d0" gap={16} />
                            <Controls />
                        </ReactFlow>
                    ) : (
                        <IsometricGarden nodes={nodes} rotation={rotation} />
                    )
                )}
            </div>
        </div>
    );
}
