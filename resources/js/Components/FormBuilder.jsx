import React from 'react';
import { Plus, Trash2, GripVertical, Settings } from 'lucide-react';
import { motion, Reorder } from 'framer-motion';

export default function FormBuilder({ schema, onChange }) {
    const addField = () => {
        const newField = {
            id: 'field_' + Date.now(),
            label: 'Pertanyaan Baru',
            type: 'text',
            required: true,
            options: []
        };
        onChange([...schema, newField]);
    };

    const updateField = (id, key, value) => {
        onChange(schema.map(field => field.id === id ? { ...field, [key]: value } : field));
    };

    const removeField = (id) => {
        onChange(schema.filter(field => field.id !== id));
    };

    const addOption = (fieldId) => {
        onChange(schema.map(field => {
            if (field.id === fieldId) {
                return { ...field, options: [...(field.options || []), 'Opsi Baru'] };
            }
            return field;
        }));
    };

    const updateOption = (fieldId, optionIndex, value) => {
        onChange(schema.map(field => {
            if (field.id === fieldId) {
                const newOptions = [...field.options];
                newOptions[optionIndex] = value;
                return { ...field, options: newOptions };
            }
            return field;
        }));
    };

    const removeOption = (fieldId, optionIndex) => {
        onChange(schema.map(field => {
            if (field.id === fieldId) {
                const newOptions = field.options.filter((_, idx) => idx !== optionIndex);
                return { ...field, options: newOptions };
            }
            return field;
        }));
    };

    return (
        <div className="space-y-6">
            {schema.length === 0 ? (
                <div className="p-10 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-center bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-slate-500 font-medium mb-4">Belum ada kolom pertanyaan. Tambahkan untuk membuat form pendaftaran.</p>
                </div>
            ) : (
                <Reorder.Group axis="y" values={schema} onReorder={onChange} className="space-y-4">
                    {schema.map((field, index) => (
                        <Reorder.Item key={field.id} value={field} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative group">
                            <div className="flex gap-4">
                                <div className="mt-2 text-slate-300 cursor-grab active:cursor-grabbing">
                                    <GripVertical size={20} />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={field.label}
                                                onChange={e => updateField(field.id, 'label', e.target.value)}
                                                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-bold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                                                placeholder="Pertanyaan / Label"
                                            />
                                        </div>
                                        <div className="w-full md:w-48">
                                            <select
                                                value={field.type}
                                                onChange={e => updateField(field.id, 'type', e.target.value)}
                                                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                                            >
                                                <option value="text">Teks Pendek</option>
                                                <option value="email">Email</option>
                                                <option value="number">Angka / No HP</option>
                                                <option value="textarea">Teks Panjang</option>
                                                <option value="select">Dropdown / Pilihan</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Options for Select */}
                                    {field.type === 'select' && (
                                        <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-2 mt-4">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Opsi Pilihan</label>
                                            {(field.options || []).map((opt, optIdx) => (
                                                <div key={optIdx} className="flex gap-2 items-center">
                                                    <input
                                                        type="text"
                                                        value={opt}
                                                        onChange={e => updateOption(field.id, optIdx, e.target.value)}
                                                        className="flex-1 px-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:border-emerald-500 outline-none"
                                                        placeholder={`Opsi ${optIdx + 1}`}
                                                    />
                                                    <button type="button" onClick={() => removeOption(field.id, optIdx)} className="text-red-400 hover:text-red-600 p-1">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => addOption(field.id)}
                                                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-2 flex items-center gap-1"
                                            >
                                                <Plus size={12} /> Tambah Opsi
                                            </button>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-700">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={field.required}
                                                onChange={e => updateField(field.id, 'required', e.target.checked)}
                                                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                                            />
                                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Wajib Diisi</span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => removeField(field.id)}
                                            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold"
                                        >
                                            <Trash2 size={16} /> Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            )}

            <button
                type="button"
                onClick={addField}
                className="w-full py-4 border-2 border-dashed border-emerald-300 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
            >
                <Plus size={18} /> Tambah Pertanyaan Baru
            </button>
        </div>
    );
}
