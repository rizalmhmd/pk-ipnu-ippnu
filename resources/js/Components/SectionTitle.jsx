import React from 'react';

export default function SectionTitle({ children, centered = false, className = '' }) {
    return (
        <div className={`mb-10 ${centered ? 'text-center' : ''} ${className}`}>
            <h2 className="text-3xl font-bold text-slate-900 font-serif relative inline-block pb-4">
                {children}
                <div className={`absolute bottom-0 h-1.5 bg-emerald-600 rounded-full w-16 ${centered ? 'left-1/2 -translate-x-1/2' : 'left-0'}`}></div>
            </h2>
        </div>
    );
}
