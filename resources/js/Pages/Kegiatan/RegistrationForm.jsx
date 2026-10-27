import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion, AnimatePresence } from 'framer-motion';

import { parseFullNik } from '@/Utils/nikParser';

export default function RegistrationForm({ agenda, pageSetting, existingRegistration }) {
    const defaultSchema = [
        { id: 'field_name', label: 'Nama Lengkap', type: 'text', required: true },
        { id: 'field_phone', label: 'Nomor WhatsApp / HP', type: 'text', required: true },
        { id: 'field_email', label: 'Alamat Email', type: 'email', required: true },
        { id: 'field_nik', label: 'NIK (KTP / Kartu Keluarga)', type: 'nik', required: false },
    ];

    const schema = (agenda.form_schema && Array.isArray(agenda.form_schema) && agenda.form_schema.length > 0)
        ? agenda.form_schema
        : defaultSchema;

    const isFree = !agenda.registration_fee || ['0', 'gratis', 'free', '-', 'rp 0', 'rp. 0'].includes(String(agenda.registration_fee).toLowerCase().trim());
    
    // Initialize form data with schema keys
    const initialData = {};
    schema.forEach(field => {
        initialData[field.id] = '';
    });

    const { data, setData, post, processing, errors } = useForm({
        responses: initialData,
        payment_method: 'midtrans',
        payment_proof: null
    });

    const handleChange = (fieldId, value) => {
        setData('responses', {
            ...data.responses,
            [fieldId]: value
        });
    };

    const handleNikChange = (fieldId, rawValue) => {
        const numericOnly = String(rawValue || '').replace(/[^0-9]/g, '').slice(0, 16);
        const updated = {
            ...data.responses,
            [fieldId]: numericOnly
        };

        if (numericOnly.length === 16) {
            const info = parseFullNik(numericOnly);
            if (info && info.isValid) {
                schema.forEach(f => {
                    if (f.id === fieldId) return;
                    const fid = f.id.toLowerCase();
                    const flabel = (f.label || '').toLowerCase();

                    // Auto-fill Jenis Kelamin jika belum diisi
                    if (fid.includes('gender') || fid.includes('kelamin') || flabel.includes('jenis kelamin') || flabel.includes('gender')) {
                        if (!updated[f.id]) {
                            if (f.type === 'select' && Array.isArray(f.options)) {
                                const matched = f.options.find(opt =>
                                    (info.isFemale && opt.toLowerCase().includes('perempuan')) ||
                                    (!info.isFemale && (opt.toLowerCase().includes('laki') || opt.toLowerCase().includes('pria')))
                                );
                                if (matched) updated[f.id] = matched;
                            } else {
                                updated[f.id] = info.gender;
                            }
                        }
                    }

                    // Auto-fill Tanggal Lahir jika belum diisi
                    if (fid.includes('tanggal_lahir') || fid.includes('tgl_lahir') || fid.includes('birth_date') || flabel.includes('tanggal lahir')) {
                        if (!updated[f.id]) {
                            updated[f.id] = info.birthDate;
                        }
                    }

                    // Auto-fill Tempat Lahir jika belum diisi
                    if (fid.includes('tempat_lahir') || flabel.includes('tempat lahir')) {
                        if (!updated[f.id]) {
                            updated[f.id] = info.kabupatenKota;
                        }
                    }

                    // Auto-fill Kecamatan jika belum diisi
                    if (fid.includes('kecamatan') || flabel.includes('kecamatan')) {
                        if (!updated[f.id]) {
                            updated[f.id] = info.kecamatan;
                        }
                    }

                    // Auto-fill Kabupaten / Kota jika belum diisi
                    if (fid.includes('kabupaten') || fid.includes('kota') || flabel.includes('kabupaten') || flabel.includes('kota')) {
                        if (!updated[f.id]) {
                            updated[f.id] = info.kabupatenKota;
                        }
                    }

                    // Auto-fill Provinsi jika belum diisi
                    if (fid.includes('provinsi') || flabel.includes('provinsi')) {
                        if (!updated[f.id]) {
                            updated[f.id] = info.province;
                        }
                    }

                    // Auto-fill Kode Pos jika belum diisi
                    if (fid.includes('kodepos') || fid.includes('kode_pos') || flabel.includes('kode pos')) {
                        if (!updated[f.id] && info.kodepos) {
                            updated[f.id] = info.kodepos;
                        }
                    }
                });
            }
        }

        setData('responses', updated);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('kegiatan.daftar.store', agenda.id), {
            forceFormData: data.payment_method === 'transfer'
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
                    {/* If user is already approved */}
                    {existingRegistration && existingRegistration.status === 'approved' ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 p-8 md:p-12 text-center"
                        >
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-inner">
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 font-serif mb-3">
                                Anda Sudah Terdaftar!
                            </h2>
                            <p className="text-slate-600 mb-6 max-w-md mx-auto">
                                Pendaftaran Anda untuk kegiatan <strong className="text-emerald-800">{agenda.title}</strong> telah terkonfirmasi dan berstatus <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-xs">Disetujui (Approved)</span>.
                            </p>
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mb-8 text-left space-y-2 max-w-md mx-auto text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">ID Registrasi:</span>
                                    <span className="font-bold text-slate-800">#{existingRegistration.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Metode:</span>
                                    <span className="font-bold text-slate-800 uppercase">{existingRegistration.payment_method}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Tanggal Kegiatan:</span>
                                    <span className="font-bold text-slate-800">{agenda.event_date || '-'}</span>
                                </div>
                            </div>
                            <Link 
                                href={route('kegiatan.index')} 
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all"
                            >
                                <i className="fas fa-calendar-alt"></i> Lihat Kegiatan Lainnya
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 p-8 md:p-12"
                        >
                            {/* If user has an existing pending registration with Midtrans */}
                            {existingRegistration && existingRegistration.status === 'pending' && (
                                <div className="p-5 mb-8 bg-amber-50 border-2 border-amber-200 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <div className="text-amber-500 mt-0.5 text-xl">
                                            <i className="fas fa-clock"></i>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-amber-900 text-sm mb-1">
                                                Pendaftaran Anda Sedang Menunggu
                                            </h4>
                                            <p className="text-xs text-amber-800 mb-3">
                                                {existingRegistration.payment_method === 'midtrans'
                                                    ? 'Anda memiliki tagihan pembayaran yang belum diselesaikan.'
                                                    : 'Pendaftaran Anda sedang dalam antrean verifikasi manual oleh panitia.'}
                                            </p>
                                            {existingRegistration.payment_method === 'midtrans' && (
                                                <Link
                                                    href={route('kegiatan.payment', existingRegistration.id)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                                                >
                                                    <i className="fas fa-wallet"></i> Lanjutkan Pembayaran Sekarang
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(agenda.image_url || agenda.image) && (
                                <div className="mb-8 rounded-2xl overflow-hidden shadow-lg shadow-emerald-900/10 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-center">
                                    <img
                                        src={agenda.image_url || (agenda.image?.startsWith('http') ? agenda.image : `/${agenda.image}`)}
                                        alt={agenda.title ? `Pamflet ${agenda.title}` : 'Pamflet Agenda'}
                                        className="w-full max-h-[550px] object-contain mx-auto"
                                        onError={(e) => {
                                            e.currentTarget.parentElement.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                {errors.message && (
                                    <div className="p-4 mb-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <i className="fas fa-exclamation-circle text-red-500"></i>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-red-700 font-medium">
                                                    {errors.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {Object.keys(errors).length > 0 && !errors.message && (
                                    <div className="p-4 mb-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <i className="fas fa-exclamation-triangle text-amber-500"></i>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-amber-700 font-bold mb-1">
                                                    Terdapat data yang belum sesuai:
                                                </p>
                                                <ul className="list-disc list-inside text-xs text-amber-800 space-y-1">
                                                    {Object.entries(errors).map(([key, err]) => (
                                                        <li key={key}>{err}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {agenda.registration_fee && (
                                    <div className="mb-8 space-y-6 border-b border-slate-100 pb-8">
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
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${data.payment_method === 'midtrans' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-200'}`}>
                                                            <input type="radio" name="payment_method" value="midtrans" className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" checked={data.payment_method === 'midtrans'} onChange={() => setData('payment_method', 'midtrans')} />
                                                            <span className="font-bold text-slate-700">Otomatis (Midtrans)</span>
                                                        </label>
                                                        <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${data.payment_method === 'cash' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-200'}`}>
                                                            <input type="radio" name="payment_method" value="cash" className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" checked={data.payment_method === 'cash'} onChange={() => setData('payment_method', 'cash')} />
                                                            <span className="font-bold text-slate-700">Cash / Langsung</span>
                                                        </label>
                                                        <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${data.payment_method === 'transfer' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-200'}`}>
                                                            <input type="radio" name="payment_method" value="transfer" className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" checked={data.payment_method === 'transfer'} onChange={() => setData('payment_method', 'transfer')} />
                                                            <span className="font-bold text-slate-700">Manual Transfer</span>
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

                                {schema.map((field) => {
                                    const fieldId = field.id;
                                    const fieldLabelLower = (field.label || '').toLowerCase();
                                    const isNikField = field.type === 'nik' || fieldId.includes('nik') || fieldLabelLower.includes('nik');
                                    const isPhoneField = !isNikField && (field.type === 'number' || fieldId.includes('phone') || fieldId.includes('whatsapp') || fieldLabelLower.includes('telepon') || fieldLabelLower.includes('whatsapp') || fieldLabelLower.includes('hp'));
                                    
                                    const rawVal = data.responses[fieldId] || '';
                                    const nikInfo = isNikField ? parseFullNik(rawVal) : null;

                                    return (
                                        <div key={field.id} className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <label className="block text-sm font-bold text-slate-700">
                                                    {field.label} {field.required ? (
                                                        <span className="text-red-500">*</span>
                                                    ) : (
                                                        <span className="text-xs font-normal text-slate-400 ml-1">(Opsional)</span>
                                                    )}
                                                </label>
                                                {isPhoneField && (
                                                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                                        Kunci Verifikasi Utama
                                                    </span>
                                                )}
                                            </div>

                                            {/* Helper text */}
                                            {isPhoneField && (
                                                <p className="text-xs text-slate-500">
                                                    Gunakan nomor WhatsApp aktif untuk konfirmasi pendaftaran & grup koordinasi.
                                                </p>
                                            )}

                                            {isNikField && (
                                                <p className="text-xs text-slate-500">
                                                    16 digit angka (dapat dilihat di KTP atau Kartu Keluarga / KK).
                                                </p>
                                            )}
                                            
                                            {field.type === 'textarea' ? (
                                                <textarea
                                                    value={data.responses[field.id] || ''}
                                                    onChange={e => handleChange(field.id, e.target.value)}
                                                    required={field.required}
                                                    rows="4"
                                                    className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-lg focus:outline-none transition-all ${errors[`responses.${field.id}`] ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-emerald-500'}`}
                                                ></textarea>
                                            ) : field.type === 'select' ? (
                                                <select
                                                    value={data.responses[field.id] || ''}
                                                    onChange={e => handleChange(field.id, e.target.value)}
                                                    required={field.required}
                                                    className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-lg focus:outline-none transition-all ${errors[`responses.${field.id}`] ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-emerald-500'}`}
                                                >
                                                    <option value="">-- Pilih --</option>
                                                    {(field.options || []).map((opt, idx) => (
                                                        <option key={idx} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            ) : isNikField ? (
                                                <div className="space-y-3">
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            inputMode="numeric"
                                                            maxLength={16}
                                                            placeholder="Contoh: 3307112509040002 (16 digit)"
                                                            value={rawVal}
                                                            onChange={e => handleNikChange(field.id, e.target.value)}
                                                            required={field.required}
                                                            className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-lg focus:outline-none font-mono tracking-wider transition-all ${errors[`responses.${field.id}`] ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-emerald-500'}`}
                                                        />
                                                        {rawVal.length > 0 && (
                                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                                                                {rawVal.length}/16
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Auto-detect info card when 16 digit NIK is entered */}
                                                    <AnimatePresence>
                                                        {nikInfo && nikInfo.isValid && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0, y: -5 }}
                                                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="p-4 bg-gradient-to-br from-emerald-50/90 to-teal-50/70 border-2 border-emerald-300/70 rounded-xl space-y-3 overflow-hidden shadow-xs text-slate-700"
                                                            >
                                                                {/* Header: Jenis Kelamin & Status */}
                                                                <div className="flex items-center justify-between pb-2.5 border-b border-emerald-200/60">
                                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-xs ${
                                                                        nikInfo.isFemale ? 'bg-pink-100 text-pink-700 border border-pink-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                                                    }`}>
                                                                        <i className={`fas ${nikInfo.isFemale ? 'fa-female' : 'fa-male'}`}></i>
                                                                        {nikInfo.genderLabel}
                                                                    </span>

                                                                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                                                                        <i className="fas fa-check-circle text-emerald-600"></i> NIK Terdeteksi
                                                                    </span>
                                                                </div>

                                                                {/* Wilayah Administrasi KTP */}
                                                                <div className="bg-white/90 p-3.5 rounded-xl border border-emerald-100 shadow-xs space-y-2">
                                                                    <div className="flex items-center gap-2 font-black text-slate-800 pb-1.5 border-b border-slate-100">
                                                                        <i className="fas fa-map-marked-alt text-emerald-600 text-sm"></i>
                                                                        <span>Wilayah Administrasi KTP</span>
                                                                    </div>

                                                                    <div className="space-y-1.5 text-xs text-slate-600">
                                                                        <div className="flex items-center justify-between gap-4">
                                                                            <span className="text-slate-400">Kecamatan:</span>
                                                                            <strong className="font-bold text-slate-800 text-right">{nikInfo.kecamatan}</strong>
                                                                        </div>
                                                                        <div className="flex items-center justify-between gap-4">
                                                                            <span className="text-slate-400">Kabupaten/Kota:</span>
                                                                            <strong className="font-bold text-slate-800 text-right">{nikInfo.kabupatenKota}</strong>
                                                                        </div>
                                                                        <div className="flex items-center justify-between gap-4">
                                                                            <span className="text-slate-400">Provinsi:</span>
                                                                            <strong className="font-bold text-slate-800 text-right">{nikInfo.province}</strong>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}

                                                        {rawVal.length === 16 && nikInfo && !nikInfo.isValid && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-2"
                                                            >
                                                                <i className="fas fa-exclamation-triangle text-amber-500"></i>
                                                                <span>{nikInfo.message}</span>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <input
                                                    type={field.type === 'email' ? 'email' : isPhoneField ? 'tel' : 'text'}
                                                    placeholder={isPhoneField ? 'Contoh: 08123456789' : ''}
                                                    value={rawVal}
                                                    onChange={e => handleChange(field.id, e.target.value)}
                                                    required={field.required}
                                                    className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-lg focus:outline-none transition-all ${errors[`responses.${field.id}`] ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-emerald-500'}`}
                                                />
                                            )}
                                            
                                            {errors[`responses.${field.id}`] && (
                                                <p className="mt-1 text-xs text-red-500 font-medium">{errors[`responses.${field.id}`]}</p>
                                            )}
                                        </div>
                                    );
                                })}

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
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
