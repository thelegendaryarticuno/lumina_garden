import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, Youtube } from 'lucide-react';
import { api } from '../services/api';

export default function GuestUpload() {
    const [isDragOver, setIsDragOver] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) processFile(files[0]);
    };

    const processFile = async (file) => {
        setIsLoading(true);
        // Simulate upload delay for effect
        // Navigate to processing page immediately to show animation
        // Ideally we pass the file to processing page or start upload here

        // For MVP, lets navigate then "mock" the upload in processing or pass state
        // But better to just call API here and show loading state

        try {
            const userId = "guest_user"; // Or generate UUID
            const res = await api.uploadFile(file, userId);

            // Pass result to notes view (or store in context/localstorage)
            localStorage.setItem('current_session', JSON.stringify(res));

            navigate('/processing');
        } catch (err) {
            console.error("Upload failed", err);
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
            <h1 className="text-4xl font-bold text-nature-900">What do you want to master today?</h1>
            <p className="text-slate-500 text-lg">Upload a video, PDF, or paste text to generate your personalized study garden.</p>

            <div
                className={`glass-card p-12 border-2 border-dashed transition-all cursor-pointer
            ${isDragOver ? 'border-nature-500 bg-nature-50' : 'border-slate-300 hover:border-nature-400'}
            ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-nature-100 rounded-full text-nature-600">
                        <UploadCloud size={48} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700">Drag & Drop your source</h3>
                    <p className="text-slate-400">or click to browse</p>
                    <input
                        type="file"
                        className="hidden"
                        onChange={(e) => e.target.files.length > 0 && processFile(e.target.files[0])}
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="glass-button cursor-pointer">
                        Select File
                    </label>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-nature-600 transition-colors">
                    <Youtube size={20} /> YouTube Link
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-nature-600 transition-colors">
                    <FileText size={20} /> Paste Text
                </button>
            </div>
        </div>
    );
}
