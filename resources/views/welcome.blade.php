<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Build modern web applications with Laravel">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700&display=swap" rel="stylesheet" />

        <!-- Styles / Scripts -->
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/app.css', 'resources/js/app.js'])
        @else
            <style>
                /*! tailwindcss v4.0.7 | MIT License | https://tailwindcss.com */
                @layer theme, base, components, utilities;

                @layer theme {
                    :root {
                        --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        --color-primary: 99 102 241;    /* Indigo-600 */
                        --color-primary-light: 129 140 248; /* Indigo-500 */
                        --color-primary-dark: 79 70 229;    /* Indigo-700 */
                        --radius-sm: 0.375rem;
                        --radius-md: 0.75rem;
                        --radius-lg: 1rem;
                        --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                        --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    }
                    
                    .dark {
                        --color-primary: 129 140 248;    /* Indigo-500 */
                        --color-primary-light: 165 180 252; /* Indigo-400 */
                        --color-primary-dark: 99 102 241;   /* Indigo-600 */
                    }
                }

                @layer base {
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    html {
                        font-family: var(--font-sans);
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        scroll-behavior: smooth;
                    }

                    body {
                        min-height: 100vh;
                        background-color: #ffffff;
                        color: #1f2937;
                    }

                    .dark body {
                        background-color: #111827;
                        color: #f9fafb;
                    }

                    img, svg {
                        max-width: 100%;
                        height: auto;
                        display: block;
                    }
                }

                @layer utilities {
                    /* Layout Utilities */
                    .container-clean {
                        width: 100%;
                        max-width: 1280px;
                        margin: 0 auto;
                        padding: 0 1.5rem;
                    }

                    @media (min-width: 640px) {
                        .container-clean {
                            padding: 0 2rem;
                        }
                    }

                    /* Animation Utilities */
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateX(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    @keyframes scaleIn {
                        from {
                            opacity: 0;
                            transform: scale(0.95);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }

                    .animate-fade-in {
                        animation: fadeIn 0.6s ease-out forwards;
                    }

                    .animate-slide-in {
                        animation: slideIn 0.5s ease-out forwards;
                    }

                    .animate-scale-in {
                        animation: scaleIn 0.4s ease-out forwards;
                    }

                    .animation-delay-100 {
                        animation-delay: 100ms;
                    }

                    .animation-delay-200 {
                        animation-delay: 200ms;
                    }

                    .animation-delay-300 {
                        animation-delay: 300ms;
                    }

                    .animation-delay-500 {
                        animation-delay: 500ms;
                    }

                    /* Component Utilities */
                    .card {
                        background: white;
                        border-radius: var(--radius-lg);
                        box-shadow: var(--shadow-md);
                        transition: all 0.2s ease;
                    }

                    .dark .card {
                        background: #1f2937;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
                    }

                    .card-hover {
                        transition: all 0.2s ease;
                    }

                    .card-hover:hover {
                        transform: translateY(-2px);
                        box-shadow: var(--shadow-xl);
                    }

                    .dark .card-hover:hover {
                        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
                    }

                    .btn {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0.625rem 1.5rem;
                        font-weight: 500;
                        border-radius: var(--radius-md);
                        transition: all 0.2s ease;
                        border: 1px solid transparent;
                        cursor: pointer;
                        font-size: 0.875rem;
                        line-height: 1.25;
                    }

                    .btn-primary {
                        background-color: rgb(var(--color-primary));
                        color: white;
                    }

                    .btn-primary:hover {
                        background-color: rgb(var(--color-primary-dark));
                        transform: translateY(-1px);
                    }

                    .btn-secondary {
                        background-color: transparent;
                        border-color: #e5e7eb;
                        color: #4b5563;
                    }

                    .dark .btn-secondary {
                        border-color: #374151;
                        color: #d1d5db;
                    }

                    .btn-secondary:hover {
                        border-color: rgb(var(--color-primary));
                        color: rgb(var(--color-primary));
                    }

                    /* Grid Utilities */
                    .grid-responsive {
                        display: grid;
                        gap: 2rem;
                    }

                    @media (min-width: 768px) {
                        .grid-responsive {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }

                    @media (min-width: 1024px) {
                        .grid-responsive {
                            grid-template-columns: repeat(3, 1fr);
                        }
                    }

                    /* Typography Utilities */
                    .text-balance {
                        text-wrap: balance;
                    }

                    .heading-1 {
                        font-size: 2.5rem;
                        font-weight: 700;
                        line-height: 1.2;
                        letter-spacing: -0.025em;
                    }

                    .heading-2 {
                        font-size: 2rem;
                        font-weight: 700;
                        line-height: 1.3;
                        letter-spacing: -0.025em;
                    }

                    .heading-3 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        line-height: 1.4;
                    }

                    @media (min-width: 768px) {
                        .heading-1 {
                            font-size: 3.5rem;
                        }
                        
                        .heading-2 {
                            font-size: 2.5rem;
                        }
                    }

                    /* Color Utilities */
                    .text-gradient {
                        background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-primary-light)) 100%);
                        -webkit-background-clip: text;
                        background-clip: text;
                        color: transparent;
                        display: inline-block;
                    }

                    .bg-gradient {
                        background: linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-primary-light)) 100%);
                    }

                    /* Image Reveal Effect */
                    .image-reveal {
                        position: relative;
                        overflow: hidden;
                        border-radius: var(--radius-lg);
                    }

                    .image-reveal::before {
                        content: '';
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
                        z-index: 2;
                        animation: shimmer 2s infinite;
                    }

                    .dark .image-reveal::before {
                        background: linear-gradient(45deg, transparent 40%, rgba(0,0,0,0.1) 50%, transparent 60%);
                    }

                    @keyframes shimmer {
                        0% {
                            transform: translateX(-100%);
                        }
                        100% {
                            transform: translateX(100%);
                        }
                    }

                    .image-loaded .image-reveal::before {
                        display: none;
                    }
                }

                @layer components {
                    /* Header Navigation */
                    .nav-item {
                        padding: 0.5rem 1rem;
                        border-radius: var(--radius-md);
                        transition: all 0.2s ease;
                        font-weight: 500;
                        color: #4b5563;
                    }

                    .dark .nav-item {
                        color: #d1d5db;
                    }

                    .nav-item:hover {
                        background-color: #f3f4f6;
                        color: rgb(var(--color-primary));
                    }

                    .dark .nav-item:hover {
                        background-color: #374151;
                        color: rgb(var(--color-primary-light));
                    }

                    /* Feature Card */
                    .feature-card {
                        padding: 2rem;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .feature-icon {
                        width: 3rem;
                        height: 3rem;
                        border-radius: var(--radius-md);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: rgba(var(--color-primary), 0.1);
                        color: rgb(var(--color-primary));
                        margin-bottom: 0.5rem;
                    }

                    /* News Card */
                    .news-card {
                        padding: 1.5rem;
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .news-badge {
                        display: inline-flex;
                        align-items: center;
                        padding: 0.25rem 0.75rem;
                        border-radius: 9999px;
                        font-size: 0.75rem;
                        font-weight: 500;
                        background-color: rgba(var(--color-primary), 0.1);
                        color: rgb(var(--color-primary));
                    }

                    .news-image {
                        width: 100%;
                        aspect-ratio: 16/9;
                        object-fit: cover;
                        border-radius: var(--radius-md);
                        transition: transform 0.3s ease;
                    }

                    .news-card:hover .news-image {
                        transform: scale(1.02);
                    }

                    /* Stat Item */
                    .stat-item {
                        text-align: center;
                        padding: 1rem;
                    }

                    .stat-number {
                        font-size: 2.5rem;
                        font-weight: 700;
                        line-height: 1;
                        margin-bottom: 0.5rem;
                    }

                    @media (min-width: 768px) {
                        .stat-number {
                            font-size: 3rem;
                        }
                    }

                    /* CTA Section */
                    .cta-section {
                        padding: 4rem 1.5rem;
                        text-align: center;
                        background-color: #f9fafb;
                    }

                    .dark .cta-section {
                        background-color: #1f2937;
                    }

                    /* Footer */
                    .footer {
                        padding: 3rem 1.5rem;
                        border-top: 1px solid #e5e7eb;
                    }

                    .dark .footer {
                        border-top-color: #374151;
                    }
                }
            </style>
        @endif
    </head>
    <body class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <!-- Header -->
        <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div class="container-clean">
                <nav class="flex items-center justify-between py-4">
                    <!-- Logo -->
                    <div class="flex items-center space-x-3 animate-slide-in">
                        <div class="w-10 h-10 rounded-lg bg-gradient flex items-center justify-center text-white font-bold">
                            L
                        </div>
                        <span class="text-xl font-bold text-gray-900 dark:text-white">Laravel<span class="text-primary">.</span></span>
                    </div>

                    <!-- Navigation -->
                    <div class="flex items-center space-x-2">
                        @if (Route::has('login'))
                            @auth
                                <a href="{{ url('/dashboard') }}" class="btn btn-secondary">
                                    Dashboard
                                </a>
                            @else
                                <a href="{{ route('login') }}" class="btn btn-secondary">
                                    Sign in
                                </a>
                                @if (Route::has('register'))
                                    <a href="{{ route('register') }}" class="btn btn-primary ml-2">
                                        Get Started
                                    </a>
                                @endif
                            @endauth
                        @endif
                    </div>
                </nav>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="py-12 md:py-20">
            <div class="container-clean">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6 animate-fade-in">
                        <span class="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
                        Laravel 11 is here
                    </div>
                    
                    <h1 class="heading-1 mb-6 animate-fade-in animation-delay-100">
                        Build <span class="text-gradient">Modern</span> Web Applications
                    </h1>
                    
                    <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200 text-balance">
                        Laravel is a web application framework with expressive, elegant syntax. 
                        We've already laid the foundation — freeing you to create without sweating the small things.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-300">
                        <a href="{{ route('register') ?? '#' }}" class="btn btn-primary px-8">
                            Start Building
                        </a>
                        <a href="https://laravel.com/docs" target="_blank" class="btn btn-secondary px-8">
                            View Documentation
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Main Content -->
        <main class="py-12 md:py-16">
            <div class="container-clean">
                <div class="grid-responsive">
                    <!-- Left Column - Features -->
                    <div class="space-y-8">
                        <!-- Quick Start -->
                        <div class="card card-hover feature-card animate-fade-in">
                            <div class="feature-icon">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 class="heading-3">Get Started Quickly</h3>
                            <p class="text-gray-600 dark:text-gray-300">
                                Laravel provides a clean starting point for your next big idea. 
                                Everything you need is included out of the box.
                            </p>
                            <a href="https://laravel.com/docs" target="_blank" class="inline-flex items-center text-primary font-medium mt-2">
                                Read Documentation
                                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>

                        <!-- Learning -->
                        <div class="card card-hover feature-card animate-fade-in animation-delay-100">
                            <div class="feature-icon">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 class="heading-3">Learn with Videos</h3>
                            <p class="text-gray-600 dark:text-gray-300">
                                Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development.
                            </p>
                            <a href="https://laracasts.com" target="_blank" class="inline-flex items-center text-primary font-medium mt-2">
                                Watch Tutorials
                                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>

                        <!-- Deployment -->
                        <div class="card card-hover feature-card animate-fade-in animation-delay-200">
                            <div class="feature-icon">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            </div>
                            <h3 class="heading-3">Deploy Instantly</h3>
                            <p class="text-gray-600 dark:text-gray-300">
                                Deploy your Laravel application in seconds with Laravel Forge, Vapor, or any cloud provider.
                            </p>
                            <a href="https://forge.laravel.com" target="_blank" class="inline-flex items-center text-primary font-medium mt-2">
                                Deploy Now
                                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- Right Column - Image & News -->
                    <div class="space-y-8">
                        <!-- Main Image with Reveal Effect -->
                        <div class="image-reveal-container">
                            <div class="image-reveal rounded-xl overflow-hidden">
                                <img 
                                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%236366f1;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238b5cf6;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23grad)'/%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Ccircle cx='400' cy='300' r='150'/%3E%3C/g%3E%3C/svg%3E"
                                    alt="Laravel Framework"
                                    class="news-image"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        <!-- Latest News -->
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <h3 class="heading-3">Latest News</h3>
                                <a href="https://blog.laravel.com" target="_blank" class="text-sm text-primary font-medium">
                                    View all →
                                </a>
                            </div>
                            
                            <div class="grid grid-cols-1 gap-4">
                                <!-- News 1 -->
                                <div class="card card-hover news-card animate-fade-in animation-delay-300">
                                    <div class="flex items-center justify-between">
                                        <span class="news-badge">Release</span>
                                        <span class="text-sm text-gray-500 dark:text-gray-400">2 days ago</span>
                                    </div>
                                    <h4 class="font-semibold text-lg">Laravel 11: What's New</h4>
                                    <p class="text-gray-600 dark:text-gray-300 text-sm">
                                        Discover the latest features and improvements in Laravel 11.
                                    </p>
                                </div>

                                <!-- News 2 -->
                                <div class="card card-hover news-card animate-fade-in animation-delay-400">
                                    <div class="flex items-center justify-between">
                                        <span class="news-badge" style="background-color: rgba(245, 158, 11, 0.1); color: rgb(245, 158, 11);">Event</span>
                                        <span class="text-sm text-gray-500 dark:text-gray-400">1 week ago</span>
                                    </div>
                                    <h4 class="font-semibold text-lg">Laracon 2024 Announced</h4>
                                    <p class="text-gray-600 dark:text-gray-300 text-sm">
                                        Join the global Laravel community at this year's conference.
                                    </p>
                                </div>

                                <!-- News 3 -->
                                <div class="card card-hover news-card animate-fade-in animation-delay-500">
                                    <div class="flex items-center justify-between">
                                        <span class="news-badge" style="background-color: rgba(16, 185, 129, 0.1); color: rgb(16, 185, 129);">Update</span>
                                        <span class="text-sm text-gray-500 dark:text-gray-400">2 weeks ago</span>
                                    </div>
                                    <h4 class="font-semibold text-lg">Vite Integration Guide</h4>
                                    <p class="text-gray-600 dark:text-gray-300 text-sm">
                                        Learn how to set up Vite for faster development builds.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Stats -->
                        <div class="grid grid-cols-3 gap-4 mt-8">
                            <div class="stat-item animate-fade-in">
                                <div class="stat-number text-gradient">100M+</div>
                                <div class="text-sm text-gray-600 dark:text-gray-400">Downloads</div>
                            </div>
                            <div class="stat-item animate-fade-in animation-delay-100">
                                <div class="stat-number text-gradient">500K+</div>
                                <div class="text-sm text-gray-600 dark:text-gray-400">Developers</div>
                            </div>
                            <div class="stat-item animate-fade-in animation-delay-200">
                                <div class="stat-number text-gradient">10K+</div>
                                <div class="text-sm text-gray-600 dark:text-gray-400">Packages</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- CTA Section -->
        <section class="cta-section">
            <div class="container-clean">
                <div class="max-w-3xl mx-auto">
                    <h2 class="heading-2 mb-4 animate-fade-in">Ready to Build Something Amazing?</h2>
                    <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in animation-delay-100">
                        Join thousands of developers who trust Laravel for their most important projects.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-200">
                        <a href="{{ route('register') ?? '#' }}" class="btn btn-primary px-8 py-3 text-lg">
                            Start Free Trial
                        </a>
                        <a href="https://laravel.com/docs" target="_blank" class="btn btn-secondary px-8 py-3 text-lg">
                            Read Documentation
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <div class="container-clean">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <div class="mb-6 md:mb-0">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 rounded-lg bg-gradient flex items-center justify-center text-white font-bold">
                                L
                            </div>
                            <span class="text-lg font-bold">Laravel</span>
                        </div>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">
                            A progressive framework for building amazing applications.
                        </p>
                    </div>
                    
                    <div class="flex items-center space-x-6">
                        <a href="https://laravel.com/docs" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                            Docs
                        </a>
                        <a href="https://laracasts.com" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                            Laracasts
                        </a>
                        <a href="https://blog.laravel.com" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                            Blog
                        </a>
                    </div>
                </div>
                
                <div class="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>Laravel is a trademark of Taylor Otwell. Copyright © {{ date('Y') }}.</p>
                </div>
            </div>
        </footer>

        <!-- JavaScript -->
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                // Image reveal effect
                const imageReveal = document.querySelector('.image-reveal-container');
                const image = document.querySelector('.news-image');
                
                if (imageReveal && image) {
                    // Simulate image loading
                    setTimeout(() => {
                        imageReveal.classList.add('image-loaded');
                        
                        // Add fade-in animation to image
                        image.style.animation = 'fadeIn 0.8s ease-out forwards';
                        
                    }, 500);
                }

                // Intersection Observer for animations
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '50px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const animation = entry.target.getAttribute('data-animation') || 'fade-in';
                            entry.target.classList.add(`animate-${animation}`);
                        }
                    });
                }, observerOptions);

                // Observe elements with data-animation attribute
                document.querySelectorAll('[data-animation]').forEach(el => {
                    observer.observe(el);
                });

                // Smooth scroll for anchor links
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function (e) {
                        e.preventDefault();
                        const targetId = this.getAttribute('href');
                        if (targetId === '#') return;
                        
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    });
                });

                // Add hover effect to cards
                const cards = document.querySelectorAll('.card-hover');
                cards.forEach(card => {
                    card.addEventListener('mouseenter', () => {
                        card.style.transform = 'translateY(-4px)';
                    });
                    
                    card.addEventListener('mouseleave', () => {
                        card.style.transform = 'translateY(0)';
                    });
                });

                // Dark mode detection
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
                const updateTheme = () => {
                    if (prefersDark.matches) {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                };
                
                updateTheme();
                prefersDark.addListener(updateTheme);
            });

            // Performance optimization
            window.addEventListener('load', function() {
                // Remove loading animations after page load
                setTimeout(() => {
                    const loadingElements = document.querySelectorAll('.image-reveal::before');
                    loadingElements.forEach(el => {
                        el.style.animation = 'none';
                    });
                }, 1000);
            });
        </script>
    </body>
</html>