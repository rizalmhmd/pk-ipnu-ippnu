import { useEffect } from 'react';
import { router } from '@inertiajs/react';

/**
 * Custom hook to listen for real-time database updates and reload Inertia props.
 * 
 * @param {string|null} modelType - The type of model to listen for (e.g., 'article'). If null, listens for all.
 * @param {string|null} propName - The Inertia prop name to reload (e.g., 'articles'). If null, reloads everything.
 */
export const useRealtimeUpdates = (modelType = null, propName = null) => {
    useEffect(() => {
        if (!window.Echo) {
            console.error('Laravel Echo is not initialized.');
            return;
        }

        // Listen on the public channel defined in App\Events\ContentUpdated
        const channel = window.Echo.channel('public-content');

        // Listen for the broadcastAs name defined in ContentUpdated
        channel.listen('.content.updated', (event) => {
            console.log('Real-time update received:', event);

            // Normalize modelType comparison (ContentObserver uses strtolower(class_basename($model)))
            const targetType = modelType ? modelType.toLowerCase() : null;
            
            // If a specific modelType is provided, only reload if it matches
            if (targetType && event.type !== targetType) {
                return;
            }

            console.log(`Refreshing data for ${propName || 'all props'}...`);
            
            // Reload the page data
            router.reload({
                only: propName ? [propName] : undefined,
                preserveScroll: true,
                preserveState: true,
            });
        });

        return () => {
            window.Echo.leaveChannel('public-content');
        };
    }, [modelType, propName]);
};
