import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
import HomeFeature from '@/Components/HomeFeature';
import ElegantHero from '@/Components/ElegantHero';
import SectionTitle from '@/Components/SectionTitle';
import StatCard from '@/Components/StatCard';
import { motion } from 'framer-motion';

import ArticleCard from '@/Components/ArticleCard';
import NewsCard from '@/Components/NewsCard';

export default function Home({ posts, articles, pageSetting, greeting, agendas, statistics }) {
    const { siteSetting } = usePage().props;

    return (
        <PublicLayout>
            <Head title="Beranda" />

            {/* Hero Section */}
            <HeroSection
                bgImage={siteSetting?.default_hero_image_url ? siteSetting.default_hero_image_url : 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}
            />



            {/* Feature Section (New Intro) */}
            <HomeFeature 
                subtitle={pageSetting?.feature_subtitle}
                title={pageSetting?.feature_title}
                description={pageSetting?.feature_description}
                imageUrl={pageSetting?.feature_image_url}
                buttonText={pageSetting?.feature_button_text}
                buttonUrl={pageSetting?.feature_button_url}
            />

            {/* Statistics Section (Minimalist Style) */}
            {statistics && statistics.length > 0 && (
                <section className="bg-white py-20 border-b border-slate-50">
                    <div className="container mx-auto px-6 sm:px-10 md:px-24">
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 md:gap-24">
                            {statistics.map((stat, index) => (
                                <div key={stat.id} className="w-full">
                                    <StatCard statistic={stat} delay={index} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <ElegantHero
                title={`Selamat Datang di ${siteSetting?.site_name || 'PKPT IPNU IPPNU'}`}
                description="Mewujudkan Kader yang Berilmu, Beramal, dan Bertaqwa"
                subtitle="Portal Resmi"
                bgImage={pageSetting?.header_bg_image_url}
            />

            {/* News and Articles Section */}
            <div className="container mx-auto px-6 md:px-12 py-12 md:py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-full">
                        {/* News Section */}
                        {posts && posts.length > 0 && (
                            <div className="mb-12 md:mb-16">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 text-center sm:text-left">
                                    <SectionTitle className="mb-0">
                                        {siteSetting?.home_news_title || 'Berita Terkini'}
                                    </SectionTitle>
                                    <Link
                                        href="/berita"
                                        className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2 group text-sm"
                                    >
                                        Lihat Semua
                                        <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                                    </Link>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                                    {posts.map((post, idx) => (
                                        <NewsCard key={post.id} post={post} idx={idx} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Articles Section */}
                        {articles && articles.length > 0 && (
                            <div className="mb-12">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 text-center sm:text-left">
                                    <SectionTitle className="mb-0">
                                        Artikel Terbaru
                                    </SectionTitle>
                                    <Link
                                        href="/artikel"
                                        className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2 group text-sm"
                                    >
                                        Lihat Semua
                                        <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                                    </Link>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                                    {articles.map((article, idx) => (
                                        <ArticleCard key={article.id} article={article} idx={idx} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar: Greeting & Agenda - Below News & Articles */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mt-12 sm:mt-16">
                    {/* Greeting Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-emerald-900 rounded-lg p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20 h-full flex items-center"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left w-full">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-emerald-400/30 p-1 shrink-0">
                                <img
                                    src={greeting?.hero_image_url ? greeting.hero_image_url : 'https://ui-avatars.com/api/?name=Ketua&background=059669&color=fff'}
                                    className="w-full h-full object-cover rounded-full shadow-xl"
                                    alt="Ketua"
                                />
                            </div>
                            <div className="flex-grow">
                                <h4 className="text-xl sm:text-2xl font-bold mb-3 font-serif">
                                    {greeting?.hero_title || 'Sambutan Ketua'}
                                </h4>
                                <div className="w-12 h-1 bg-emerald-400 rounded-full mb-6 mx-auto md:mx-0"></div>
                                <p className="text-emerald-100/90 text-sm sm:text-base italic leading-relaxed relative">
                                    <i className="fas fa-quote-left absolute -left-6 -top-2 opacity-20 text-3xl"></i>
                                    {greeting?.hero_description || 'Selamat datang di website resmi PKPT IPNU IPPNU. Semoga bermanfaat untuk kita semua.'}
                                    <i className="fas fa-quote-right ml-2 opacity-20"></i>
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Agenda Card */}
                    <div className="bg-white rounded-lg p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-xl font-bold text-slate-800 font-serif">
                                {siteSetting?.home_agenda_title || 'Agenda Terdekat'}
                            </h4>
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 shadow-inner">
                                <i className="fas fa-calendar-alt text-lg"></i>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                            {agendas.slice(0, 3).map((agenda) => {
                                const date = new Date(agenda.event_date);
                                return (
                                    <div key={agenda.id} className="flex gap-4 group cursor-default items-start">
                                        <div className="w-14 h-16 bg-slate-50 rounded-lg flex flex-col items-center justify-center border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-300 shadow-sm group-hover:shadow-md shrink-0">
                                            <span className="text-[10px] font-bold uppercase text-slate-400 group-hover:text-emerald-500">
                                                {date.toLocaleDateString('id-ID', { month: 'short' })}
                                            </span>
                                            <span className="text-xl font-bold text-slate-700 group-hover:text-emerald-700">
                                                {date.getDate()}
                                            </span>
                                        </div>
                                        <div className="flex-grow pt-1">
                                            <h5 className="font-bold text-slate-800 text-sm sm:text-base group-hover:text-emerald-600 transition-colors line-clamp-1">
                                                {agenda.title}
                                            </h5>
                                            <div className="flex items-center gap-3 mt-1 text-[11px] sm:text-xs text-slate-400 font-medium">
                                                <span className="flex items-center gap-1"><i className="far fa-clock text-emerald-500"></i> {agenda.event_time ? agenda.event_time.substring(0, 5) : '00:00'} WIB</span>
                                                {agenda.location && (
                                                    <span className="truncate flex items-center gap-1"><i className="fas fa-map-marker-alt text-emerald-500"></i> {agenda.location}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {agendas.length === 0 && (
                                <div className="text-center py-10 col-span-full">
                                    <i className="far fa-calendar-check text-5xl text-slate-100 mb-4 block"></i>
                                    <p className="text-slate-400 text-sm">Belum ada agenda terdekat.</p>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/agenda"
                            className="mt-8 w-full py-4 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-600 rounded-lg text-center text-sm font-bold transition-all block shadow-sm hover:shadow-lg border border-slate-100 hover:border-emerald-500"
                        >
                            Lihat Semua Agenda
                        </Link>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
