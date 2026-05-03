import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
import SectionTitle from '@/Components/SectionTitle';
import ArticleCard from '@/Components/ArticleCard';
import Pagination from '@/Components/Pagination';

export default function ArticlesIndex({ articles, pageSetting }) {
    return (
        <PublicLayout>
            <Head title="Artikel & Opini" />

            <HeroSection
                bgImage={pageSetting?.hero_image_url ? pageSetting.hero_image_url : 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}
            />



            <div className="container mx-auto px-6 md:px-12 py-12 md:py-20">
                <SectionTitle centered className="mb-10 lg:mb-16">Wawasan Kader</SectionTitle>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 md:gap-10">
                    {articles.data.map((article, idx) => (
                        <ArticleCard key={article.id} article={article} idx={idx} />
                    ))}
                </div>

                {articles.data.length === 0 && (
                    <div className="py-20 text-center bg-white rounded-lg shadow-xl shadow-slate-200/50 border border-slate-100">
                        <i className="far fa-file-alt text-6xl text-slate-100 mb-6 block"></i>
                        <p className="text-slate-500 font-medium">Belum ada artikel yang diterbitkan saat ini.</p>
                    </div>
                )}

                {articles.data.length > 0 && <Pagination links={articles.links} />}
            </div>
        </PublicLayout>
    );
}
