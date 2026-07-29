import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';

export default function RegistrationForm({ agenda, pageSetting }) {
    const schema = agenda.form_schema || [];
    const isFree = !agenda.registration_fee || ['0', 'gratis', 'free', '-', 'rp 0', 'rp. 0'].includes(String(agenda.registration_fee).toLowerCase().trim());
    
    // Initialize form data with schema keys
    const initialData = {};
    schema.forEach(field => {
        initialData[field.id] = '';
    });

    const { data, setData, post, processing, errors } = useForm({
        responses: initialData,
        payment_method: 'cash',
        payment_proof: null
    });

    const handleChange = (fieldId, value) => {
        setData('responses', {
            ...data.responses,
            [fieldId]: value
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('kegiatan.daftar.store', agenda.id), {
            forceFormData: true
        });
    };

    return (
        <PublicLayout>
            <Head title={`Daftar Kegiatan - ${agenda.title}`} />
            
            {/* Header */}
            <div className="bg-emerald-900 pt-32 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <Link href={route('kegiatan.index')} className="inline-flex items-center gap-2 text-emerald-300 hover:text-white mb-6 transition-colors">
                            <i className="fas fa-arrow-left"></i> Kembali ke Kegiatan
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white font-serif mb-4 leading-tight">
                            Pendaftaran Kegiatan
                        </h1>
                        <p className="text-emerald-100 text-lg">
                            {agenda.title}
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="container mx-auto px-6 py-16 -mt-8 relative z-20">
                <div className="max-w-2xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 p-8 md:p-12"
                    >
                        {agenda.image && (
                            <div className="mb-8 rounded-xl overflow-hidden shadow-lg shadow-emerald-900/10">
                                <img src={`/${agenda.image}`} alt="Pamflet Agenda" className="w-full h-auto object-cover" />
                            </div>
                        )}

                        {agenda.registration_fee && (
                            <div className="mb-8 space-y-6">
                                <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-emerald-900">Harga Tiket Masuk (HTM)</h4>
                                        <p className="text-sm text-emerald-700">
                                            {isFree ? 'Kegiatan ini tidak dipungut biaya.' : 'Silakan pilih metode pembayaran di bawah ini.'}
                                        </p>
                                    </div>
                                    <div className="text-xl font-black text-emerald-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                                        {agenda.registration_fee}
                                    </div>
                                </div>
                                
                                {!isFree && (
                                    <>
                                        <div className="space-y-3">
                                            <label className="block text-sm font-bold text-slate-700">Metode Pembayaran</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${data.payment_method === 'cash' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-200'}`}>
                                                    <input type="radio" name="payment_method" value="cash" className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" checked={data.payment_method === 'cash'} onChange={() => setData('payment_method', 'cash')} />
                                                    <span className="font-bold text-slate-700">Bayar Langsung (Cash)</span>
                                                </label>
                                                <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${data.payment_method === 'transfer' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-200'}`}>
                                                    <input type="radio" name="payment_method" value="transfer" className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" checked={data.payment_method === 'transfer'} onChange={() => setData('payment_method', 'transfer')} />
                                                    <span className="font-bold text-slate-700">Transfer Bank / E-Wallet</span>
                                                </label>
                                            </div>
                                            {errors.payment_method && <p className="mt-1 text-xs text-red-500 font-medium">{errors.payment_method}</p>}
                                        </div>

                                        {data.payment_method === 'transfer' && (
                                            <div className="p-6 border-2 border-emerald-100 rounded-xl bg-white space-y-4">
                                                {agenda.payment_account && (
                                                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                                                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Informasi Rekening</p>
                                                        <p className="font-black text-slate-800 text-lg">{agenda.payment_account}</p>
                                                    </div>
                                                )}
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                                        Unggah Bukti Pembayaran <span className="text-red-500">*</span>
                                                    </label>
                                                    <input 
                                                        type="file"
                                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                                        onChange={e => setData('payment_proof', e.target.files[0])}
                                                        required
                                                        className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-lg focus:outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 ${errors.payment_proof ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-emerald-500'}`}
                                                    />
                                                    {errors.payment_proof && (
                                                        <p className="mt-1 text-xs text-red-500 font-medium">{errors.payment_proof}</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {schema.map((field) => (
                                <div key={field.id}>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            value={data.responses[field.id]}
                                            onChange={e => handleChange(field.id, e.target.value)}
                                            required={field.required}
                                            rows="4"
                                            className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-lg focus:outline-none transition-all ${errors[`responses.${field.id}`] ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-emerald-500'}`}
                                        ></textarea>
                                    ) : field.type === 'select' ? (
                                        <select
                                            value={data.responses[field.id]}
                                            onChange={e => handleChange(field.id, e.target.value)}
                                            required={field.required}
                                            className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-lg focus:outline-none transition-all ${errors[`responses.${field.id}`] ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-emerald-500'}`}
                                        >
                                            <option value="">-- Pilih --</option>
                                            {(field.options || []).map((opt, idx) => (
                                                <option key={idx} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type === 'email' ? 'email' : field.type === 'number' ? 'tel' : 'text'}
                                            value={data.responses[field.id]}
                                            onChange={e => handleChange(field.id, e.target.value)}
                                            required={field.required}
                                            className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-lg focus:outline-none transition-all ${errors[`responses.${field.id}`] ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-emerald-500'}`}
                                        />
                                    )}
                                    
                                    {errors[`responses.${field.id}`] && (
                                        <p className="mt-1 text-xs text-red-500 font-medium">{errors[`responses.${field.id}`]}</p>
                                    )}
                                </div>
                            ))}

                            <div className="pt-6 border-t border-slate-100">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Memproses...' : 'Kirim Pendaftaran'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </PublicLayout>
    );
}
