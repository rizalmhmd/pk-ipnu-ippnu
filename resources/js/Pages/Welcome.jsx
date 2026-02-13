import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
import PageHeaderCard from '@/Components/PageHeaderCard';
import SectionTitle from '@/Components/SectionTitle';
import StatCard from '@/Components/StatCard';
import { motion } from 'framer-motion';

export default function Home({ posts, pageSetting, greeting, agendas, statistics }) {
    const { siteSetting } = usePage().props;

    return (
        <PublicLayout>
            <Head title="Beranda" />

            {/* Hero Section */}
            <HeroSection
                bgImage={siteSetting?.default_hero_image_url ? siteSetting.default_hero_image_url : 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}
            />

            {/* Statistics Section */}
            {statistics && statistics.length > 0 && (
                <div className="container mx-auto px-4 sm:px-6 md:px-12 -mt-20 relative z-40 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {statistics.map((stat, index) => (
                            <div key={stat.id} className="h-full">
                                <StatCard statistic={stat} delay={index} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <PageHeaderCard
                title={`Selamat Datang di ${siteSetting?.site_name || 'PKPT IPNU IPPNU'}`}
                subtitle="Mewujudkan Kader yang Berilmu, Beramal, dan Bertaqwa"
                bgColor={pageSetting?.header_bg_color}
                textColor={pageSetting?.header_text_color}
                bgImage={pageSetting?.header_bg_image_url}
            />

            <div className="container mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 lg:py-20">
                <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-16">
                    {/* Main Content: News */}
                    <div className="lg:w-2/3">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 sm:mb-8">
                            <SectionTitle className="mb-0">
                                {siteSetting?.home_news_title || 'Berita Terkini'}
                            </SectionTitle>
                            <Link
                                href="/berita"
                                className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2 group"
                            >
                                Lihat Semua
                                <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            {posts.map((post, idx) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 group hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={post.image ? `/storage/${post.image}?v=${new Date(post.updated_at).getTime()}` : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            alt={post.title}
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className="px-4 py-1.5 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold rounded-full shadow-lg">
                                                News
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 sm:p-8">
                                        <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                                            <i className="far fa-calendar-alt text-emerald-500"></i>
                                            {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-4 font-serif line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {post.content.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                                        </p>
                                        <Link
                                            href={`/berita/${post.slug}`}
                                            className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm group/btn"
                                        >
                                            Baca Selengkapnya
                                            <div className="w-6 h-0.5 bg-emerald-600 group-hover/btn:w-10 transition-all"></div>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}

                            {posts.length === 0 && (
                                <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                    <p className="text-slate-400 font-medium">Belum ada berita terbaru saat ini.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar: Greeting & Agenda */}
                    <div className="lg:w-1/3 space-y-8 sm:space-y-10 lg:space-y-12">
                        {/* Greeting Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-emerald-900 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[40px] p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full border-4 border-emerald-400/30 p-1 mb-6">
                                    <img
                                        src={greeting?.hero_image_url ? greeting.hero_image_url : 'https://ui-avatars.com/api/?name=Ketua&background=059669&color=fff'}
                                        className="w-full h-full object-cover rounded-full"
                                        alt="Ketua"
                                    />
                                </div>
                                <h4 className="text-xl font-bold mb-2 font-serif">
                                    {greeting?.hero_title || 'Sambutan Ketua'}
                                </h4>
                                <div className="w-10 h-1 bg-emerald-400 rounded-full mb-6"></div>
                                <p className="text-emerald-100/80 text-sm italic leading-relaxed">
                                    <i className="fas fa-quote-left mr-2 opacity-40"></i>
                                    {greeting?.hero_description || 'Selamat datang di website resmi PKPT IPNU IPPNU. Semoga bermanfaat untuk kita semua.'}
                                    <i className="fas fa-quote-right ml-2 opacity-40"></i>
                                </p>
                            </div>
                        </motion.div>

                        {/* Agenda Card */}
                        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[40px] p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <div className="flex justify-between items-center mb-8">
                                <h4 className="text-xl font-bold text-slate-800 font-serif">
                                    {siteSetting?.home_agenda_title || 'Agenda Terdekat'}
                                </h4>
                                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                                    <i className="fas fa-calendar-alt"></i>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {agendas.map((agenda) => {
                                    const date = new Date(agenda.event_date);
                                    return (
                                        <div key={agenda.id} className="flex gap-4 group cursor-default">
                                            <div className="w-14 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                                                <span className="text-[10px] font-bold uppercase text-slate-400 group-hover:text-emerald-400">
                                                    {date.toLocaleDateString('id-ID', { month: 'short' })}
                                                </span>
                                                <span className="text-xl font-bold text-slate-700 group-hover:text-emerald-700">
                                                    {date.getDate()}
                                                </span>
                                            </div>
                                            <div className="flex-grow pt-1">
                                                <h5 className="font-bold text-slate-800 text-sm group-hover:text-emerald-600 transition-colors">
                                                    {agenda.title}
                                                </h5>
                                                <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400 font-medium">
                                                    <span><i className="far fa-clock mr-1"></i> {agenda.event_time ? agenda.event_time.substring(0, 5) : '00:00'} WIB</span>
                                                    {agenda.location && (
                                                        <span className="truncate"><i className="fas fa-map-marker-alt mr-1"></i> {agenda.location}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {agendas.length === 0 && (
                                    <div className="text-center py-10">
                                        <i className="far fa-calendar-check text-4xl text-slate-100 mb-4 block"></i>
                                        <p className="text-slate-400 text-sm">Belum ada agenda terdekat.</p>
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/agenda"
                                className="mt-10 w-full py-4 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-600 rounded-2xl text-center text-sm font-bold transition-all block"
                            >
                                Lihat Semua Agenda
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
