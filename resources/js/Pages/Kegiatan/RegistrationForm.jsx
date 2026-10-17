import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to decode Indonesian NIK (16 digits)
const parseNik = (nik) => {
    if (!nik) return null;
    const clean = String(nik).replace(/[^0-9]/g, '');
    if (clean.length !== 16) return null;

    const provinces = {
        '11': 'Aceh', '12': 'Sumatera Utara', '13': 'Sumatera Barat', '14': 'Riau',
        '15': 'Jambi', '16': 'Sumatera Selatan', '17': 'Bengkulu', '18': 'Lampung',
        '19': 'Kep. Bangka Belitung', '21': 'Kep. Riau',
        '31': 'DKI Jakarta', '32': 'Jawa Barat', '33': 'Jawa Tengah',
        '34': 'DI Yogyakarta', '35': 'Jawa Timur', '36': 'Banten',
        '51': 'Bali', '52': 'Nusa Tenggara Barat', '53': 'Nusa Tenggara Timur',
        '61': 'Kalimantan Barat', '62': 'Kalimantan Tengah', '63': 'Kalimantan Selatan',
        '64': 'Kalimantan Timur', '65': 'Kalimantan Utara',
        '71': 'Sulawesi Utara', '72': 'Sulawesi Tengah', '73': 'Sulawesi Selatan',
        '74': 'Sulawesi Tenggara', '75': 'Gorontalo', '76': 'Sulawesi Barat',
        '81': 'Maluku', '82': 'Maluku Utara',
        '91': 'Papua Barat', '92': 'Papua Barat Daya', '93': 'Papua Selatan',
        '94': 'Papua', '95': 'Papua Pegunungan', '96': 'Papua Tengah'
    };

    const prov = provinces[clean.substring(0, 2)] || 'Wilayah Indonesia';

    let day = parseInt(clean.substring(6, 8), 10);
    const month = parseInt(clean.substring(8, 10), 10);
    const yearShort = parseInt(clean.substring(10, 12), 10);

    const isFemale = day > 40;
    if (isFemale) day -= 40;

    if (day < 1 || day > 31 || month < 1 || month > 12) {
        return { isValid: false, message: 'Format tanggal/bulan lahir pada NIK tidak valid.' };
    }

    const currentYear = new Date().getFullYear();
    const currentYearShort = currentYear % 100;
    const fullYear = yearShort <= currentYearShort ? (2000 + yearShort) : (1900 + yearShort);
    const age = currentYear - fullYear;

    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    return {
        isValid: true,
        cleanNik: clean,
        isFemale,
        genderLabel: isFemale ? 'Rekanita (Perempuan)' : 'Rekan (Laki-laki)',
        birthDateFormatted: `${day} ${monthNames[month - 1]} ${fullYear}`,
        age,
        province: prov,
    };
};

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

                            {agenda.image && (
                                <div className="mb-8 rounded-xl overflow-hidden shadow-lg shadow-emerald-900/10">
                                    <img src={`/${agenda.image}`} alt="Pamflet Agenda" className="w-full h-auto object-cover" />
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
                                    const nikInfo = isNikField ? parseNik(rawVal) : null;

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
                                                            placeholder="Contoh: 3201011508050001 (16 digit)"
                                                            value={rawVal}
                                                            onChange={e => {
                                                                const numericOnly = e.target.value.replace(/[^0-9]/g, '').slice(0, 16);
                                                                handleChange(field.id, numericOnly);
                                                            }}
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
                                                                className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl space-y-2.5 overflow-hidden"
                                                            >
                                                                <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold ${nikInfo.isFemale ? 'bg-pink-100 text-pink-700' : 'bg-emerald-100 text-emerald-800'}`}>
                                                                            <i className={`fas ${nikInfo.isFemale ? 'fa-female' : 'fa-male'}`}></i>
                                                                            {nikInfo.genderLabel}
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                                                                        <i className="fas fa-check-circle text-emerald-500"></i> NIK Terdeteksi
                                                                    </span>
                                                                </div>

                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                                                    <div className="flex items-center gap-2 text-slate-700">
                                                                        <i className="fas fa-birthday-cake text-emerald-600 w-4"></i>
                                                                        <span>
                                                                            <strong>Lahir:</strong> {nikInfo.birthDateFormatted} ({nikInfo.age} thn)
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-slate-700">
                                                                        <i className="fas fa-map-marker-alt text-emerald-600 w-4"></i>
                                                                        <span>
                                                                            <strong>Asal:</strong> Provinsi {nikInfo.province}
                                                                        </span>
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
