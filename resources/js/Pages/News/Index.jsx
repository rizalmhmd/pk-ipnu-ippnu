import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
import PageHeaderCard from '@/Components/PageHeaderCard';
import SectionTitle from '@/Components/SectionTitle';
import PostCard from '@/Components/PostCard';
import Pagination from '@/Components/Pagination';

export default function NewsIndex({ posts, pageSetting }) {
    return (
        <PublicLayout>
            <Head title="Berita Terbaru" />

            <HeroSection
                bgImage={pageSetting?.hero_image_url ? pageSetting.hero_image_url : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}
            />

            <PageHeaderCard
                title="Warta Berita"
                subtitle="Informasi, agenda, dan kegiatan terkini dari PKPT IPNU IPPNU"
                bgColor={pageSetting?.header_bg_color}
                textColor={pageSetting?.header_text_color}
                bgImage={pageSetting?.header_bg_image_url}
            />

            <div className="container mx-auto px-3 sm:px-6 md:px-12 py-10 sm:py-20">
                <SectionTitle centered className="mb-8 sm:mb-12">Warta Organisasi</SectionTitle>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 md:gap-10">
                    {posts.data.map((post, idx) => (
                        <PostCard key={post.id} post={post} idx={idx} />
                    ))}
                </div>

                {posts.data.length === 0 && (
                    <div className="py-20 text-center bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                        <i className="far fa-newspaper text-6xl text-slate-100 mb-6 block"></i>
                        <p className="text-slate-500 font-medium">Belum ada berita yang diterbitkan saat ini.</p>
                    </div>
                )}

                {posts.data.length > 0 && <Pagination links={posts.links} />}
            </div>
        </PublicLayout>
    );
}
