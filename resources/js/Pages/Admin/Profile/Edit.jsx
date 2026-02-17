import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    User,
    Lock,
    Mail,
    Save,
    ShieldCheck,
    Fingerprint,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Edit({ mustVerifyEmail, status, member }) {
    const user = usePage().props.auth.user;

    // Profile Info Form (Integrated with Member)
    const profileForm = useForm({
        name: user.name,
        email: user.email,
        position: member?.position || '',
        instagram: member?.instagram || '',
        type: member?.type || 'ipnu',
        photo: null,
        _method: 'PATCH',
    });

    // Photo Preview
    const [photoPreview, setPhotoPreview] = React.useState(member?.photo_url || null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            profileForm.setData('photo', file);
            const reader = new FileReader();
            reader.onload = (e) => setPhotoPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    // Password Form
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updateProfile = (e) => {
        e.preventDefault();
        // Use post with _method PATCH for file support
        profileForm.post(route('admin.profile.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const updatePassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
            onError: (errors) => {
                if (errors.password) {
                    passwordForm.reset('password', 'password_confirmation');
                }
                if (errors.current_password) {
                    passwordForm.reset('current_password');
                }
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Profil Saya" />

            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Pengaturan Akun</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Informasi personal dan profil keanggotaan PKPT IPNU IPPNU.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Profile Information */}
                <div className="lg:col-span-12 xl:col-span-8">
                    <form onSubmit={updateProfile} className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                                <User size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none">Informasi Profil & Keanggotaan</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Update data publik dan riwayat organisasi Anda</p>
                            </div>
                        </div>

                        {status === 'profile-updated' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl text-emerald-600 dark:text-emerald-400 flex items-center gap-3 text-sm font-bold"
                            >
                                <CheckCircle2 size={18} />
                                Profil berhasil diperbarui.
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Photo Upload Sidebar */}
                            <div className="md:col-span-2 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700 mb-4 text-center">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-[2rem] overflow-hidden bg-slate-200 dark:bg-slate-700 shadow-xl border-4 border-white dark:border-slate-900 ring-4 ring-emerald-500/10">
                                        {photoPreview ? (
                                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                <User size={48} />
                                            </div>
                                        )}
                                    </div>
                                    <label className="absolute -bottom-2 -right-2 p-3 bg-emerald-600 text-white rounded-2xl shadow-lg cursor-pointer hover:bg-emerald-700 transition-all hover:scale-110">
                                        <Save size={18} />
                                        <input type="file" className="hidden" onChange={handlePhotoChange} accept="image/*" />
                                    </label>
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-bold text-slate-900 dark:text-white">Foto Profil</h4>
                                    <p className="text-xs text-slate-500 font-medium mt-1">Format JPG, PNG atau GIF (Maks. 5MB)</p>
                                </div>
                            </div>

                            {/* Basic Info */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Nama Lengkap</label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                        <input
                                            type="text"
                                            value={profileForm.data.name}
                                            onChange={e => profileForm.setData('name', e.target.value)}
                                            className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold"
                                            required
                                        />
                                    </div>
                                    {profileForm.errors.name && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{profileForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Alamat Email</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                        <input
                                            type="email"
                                            value={profileForm.data.email}
                                            onChange={e => profileForm.setData('email', e.target.value)}
                                            className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold"
                                            required
                                        />
                                    </div>
                                    {profileForm.errors.email && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{profileForm.errors.email}</p>}
                                </div>
                            </div>

                            {/* Membership Info */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Tipe Organisasi</label>
                                    <div className="flex gap-4">
                                        {['ipnu', 'ippnu'].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => profileForm.setData('type', type)}
                                                className={`flex-1 py-4 rounded-2xl border-2 font-bold uppercase tracking-widest text-xs transition-all ${profileForm.data.type === type
                                                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                                                        : 'bg-transparent border-slate-100 dark:border-slate-800 text-slate-400 hover:border-emerald-500/50'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Jabatan</label>
                                    <div className="relative">
                                        <ShieldCheck size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                        <input
                                            type="text"
                                            value={profileForm.data.position}
                                            onChange={e => profileForm.setData('position', e.target.value)}
                                            placeholder="Contoh: Ketua Departemen Kaderisasi"
                                            className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-sm"
                                        />
                                    </div>
                                    {profileForm.errors.position && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{profileForm.errors.position}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Username Instagram</label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold">@</span>
                                        <input
                                            type="text"
                                            value={profileForm.data.instagram}
                                            onChange={e => profileForm.setData('instagram', e.target.value)}
                                            placeholder="username"
                                            className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="inline-flex items-center gap-3 px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50"
                                >
                                    <Save size={18} />
                                    Simpan Perubahan
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Password Management */}
                <div className="lg:col-span-12 xl:col-span-5">
                    <form onSubmit={updatePassword} className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 shadow-2xl shadow-emerald-900/10 text-white h-full">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
                                <Fingerprint size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white leading-none">Keamanan Akun</h3>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Perbarui kata sandi secara berkala</p>
                            </div>
                        </div>

                        {passwordForm.recentlySuccessful && (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 flex items-center gap-3 text-sm font-bold"
                            >
                                <ShieldCheck size={18} />
                                Sandi berhasil diubah.
                            </motion.div>
                        )}

                        <div className="space-y-8">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Sandi Saat Ini</label>
                                <div className="relative">
                                    <Lock size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" />
                                    <input
                                        type="password"
                                        value={passwordForm.data.current_password}
                                        onChange={e => passwordForm.setData('current_password', e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-white"
                                        required
                                    />
                                </div>
                                {passwordForm.errors.current_password && <p className="mt-2 text-[10px] font-bold text-red-400 uppercase tracking-widest">{passwordForm.errors.current_password}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Sandi Baru</label>
                                <div className="relative">
                                    <Lock size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" />
                                    <input
                                        type="password"
                                        value={passwordForm.data.password}
                                        onChange={e => passwordForm.setData('password', e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-white"
                                        required
                                    />
                                </div>
                                {passwordForm.errors.password && <p className="mt-2 text-[10px] font-bold text-red-400 uppercase tracking-widest">{passwordForm.errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Konfirmasi Sandi Baru</label>
                                <div className="relative">
                                    <Lock size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" />
                                    <input
                                        type="password"
                                        value={passwordForm.data.password_confirmation}
                                        onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-white"
                                        required
                                    />
                                </div>
                                {passwordForm.errors.password_confirmation && <p className="mt-2 text-[10px] font-bold text-red-400 uppercase tracking-widest">{passwordForm.errors.password_confirmation}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={passwordForm.processing}
                                className="w-full inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-900/40 hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 uppercase text-xs tracking-widest"
                            >
                                <ShieldCheck size={20} />
                                Ganti Kata Sandi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
