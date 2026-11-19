import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';


export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
                        return 'react-vendor';
                    }
                    if (id.includes('node_modules/framer-motion/') || id.includes('node_modules/motion-dom/')) {
                        return 'motion-vendor';
                    }
                    if (id.includes('node_modules/lucide-react/')) {
                        return 'icons-vendor';
                    }
                },
            },
        },
    },
});
