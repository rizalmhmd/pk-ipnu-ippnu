import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (links.length <= 3) return null;

    return (
        <div className="mt-20 flex justify-center gap-2">
            {links.map((link, idx) => {
                if (link.url === null) {
                    return (
                        <span
                            key={idx}
                            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                return (
                    <Link
                        key={idx}
                        href={link.url}
                        className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg border transition-all duration-300 font-bold text-sm ${link.active
                                ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/20 scale-110'
                                : 'bg-white border-slate-100 text-slate-500 hover:border-emerald-200 hover:text-emerald-600'
                            }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}
