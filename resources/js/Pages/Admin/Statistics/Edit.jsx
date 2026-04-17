
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

export default function Edit({ statistic }) {
    const { data, setData, put, processing, errors } = useForm({
        title: statistic.title || '',
        subtitle: statistic.subtitle || '',
        value: statistic.value || '',
        unit: statistic.unit || '',
        description: statistic.description || '',
        icon: statistic.icon || 'fa-chart-line',
        color: statistic.color || 'emerald',
        order: statistic.order || 0,
        is_active: statistic.is_active
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.statistics.update', statistic.id));
    };

    const colors = [
        { id: 'emerald', name: 'Emerald (Hijau)', bg: 'bg-emerald-500' },
        { id: 'blue', name: 'Blue (Biru)', bg: 'bg-blue-500' },
        { id: 'amber', name: 'Amber (Kuning)', bg: 'bg-amber-500' },
        { id: 'red', name: 'Red (Merah)', bg: 'bg-red-500' },
        { id: 'purple', name: 'Purple (Ungu)', bg: 'bg-purple-500' },
        { id: 'pink', name: 'Pink (Merah Muda)', bg: 'bg-pink-500' },
        { id: 'indigo', name: 'Indigo', bg: 'bg-indigo-500' },
        { id: 'cyan', name: 'Cyan', bg: 'bg-cyan-500' },
        { id: 'teal', name: 'Teal', bg: 'bg-teal-500' },
        { id: 'orange', name: 'Orange', bg: 'bg-orange-500' },
    ];

    const icons = [
        'fa-chart-line', 'fa-chart-pie', 'fa-chart-bar', 'fa-users', 'fa-user-graduate',
        'fa-hand-holding-heart', 'fa-money-bill-wave', 'fa-money-bill-trend-up', 'fa-leaf',
        'fa-trophy', 'fa-star', 'fa-globe', 'fa-building', 'fa-school'
    ];

    return (
        <AdminLayout>
            <Head title="Edit Statistik" />

            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route('admin.statistics.index')}
                        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-emerald-600 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Edit Statistik</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Perbarui data statistik yang ditampilkan.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Judul Statistik <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
                                placeholder="Contoh: PENDAPATAN (2024)"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                        </div>

                        {/* Subtitle */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Subjudul <span className="text-slate-400 font-normal">(Opsional)</span>
                            </label>
                            <input
                                type="text"
                                value={data.subtitle}
                                onChange={e => setData('subtitle', e.target.value)}
                                className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
                                placeholder="Contoh: Miliar"
                            />
                            {errors.subtitle && <p className="mt-1 text-sm text-red-500">{errors.subtitle}</p>}
                        </div>

                        {/* Value */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Nilai <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.value}
                                onChange={e => setData('value', e.target.value)}
                                className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-emerald-500 focus:ring-emerald-500 transition-colors font-mono"
                                placeholder="Contoh: 75,33"
                            />
                            {errors.value && <p className="mt-1 text-sm text-red-500">{errors.value}</p>}
                        </div>

                        {/* Unit */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Satuan <span className="text-slate-400 font-normal">(Opsional)</span>
                            </label>
                            <input
                                type="text"
                                value={data.unit}
                                onChange={e => setData('unit', e.target.value)}
                                className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
                                placeholder="Contoh: USD, %, Jiwa"
                            />
                            {errors.unit && <p className="mt-1 text-sm text-red-500">{errors.unit}</p>}
                        </div>

                        {/* Description */}
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Deskripsi <span className="text-slate-400 font-normal">(Opsional)</span>
                            </label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="3"
                                className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
                                placeholder="Penjelasan singkat tentang statistik ini..."
                            ></textarea>
                            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                        </div>

                        {/* Icon Selection */}
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                                Ikon
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {icons.map((icon) => (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => setData('icon', icon)}
                                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${data.icon === icon
                                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-110'
                                            : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                                            }`}
                                    >
                                        <i className={`fas ${icon} text-lg`}></i>
                                    </button>
                                ))}
                            </div>
                            {errors.icon && <p className="mt-1 text-sm text-red-500">{errors.icon}</p>}
                        </div>

                        {/* Color Selection */}
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                                Warna Tema
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                {colors.map((color) => (
                                    <button
                                        key={color.id}
                                        type="button"
                                        onClick={() => setData('color', color.id)}
                                        className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${data.color === color.id
                                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 ring-1 ring-emerald-500'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                                            }`}
                                    >
                                        <div className={`w-6 h-6 rounded-full ${color.bg}`}></div>
                                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{color.name}</span>
                                    </button>
                                ))}
                            </div>
                            {errors.color && <p className="mt-1 text-sm text-red-500">{errors.color}</p>}
                        </div>

                        {/* Order & Status */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Urutan Tampil
                            </label>
                            <input
                                type="number"
                                value={data.order}
                                onChange={e => setData('order', e.target.value)}
                                className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Status
                            </label>
                            <div className="flex items-center gap-4 mt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="is_active"
                                        checked={data.is_active === true}
                                        onChange={() => setData('is_active', true)}
                                        className="text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Aktif</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="is_active"
                                        checked={data.is_active === false}
                                        onChange={() => setData('is_active', false)}
                                        className="text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Nonaktif</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-70 disabled:cursor-not-allowed font-medium"
                        >
                            {processing ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Simpan Perubahan
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
