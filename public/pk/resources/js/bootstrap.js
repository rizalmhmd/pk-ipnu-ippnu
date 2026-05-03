import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Pusher = Pusher;

const broadcaster = import.meta.env.VITE_BROADCAST_CONNECTION || 'reverb';

window.Echo = new Echo({
    broadcaster: broadcaster,
    key: import.meta.env.VITE_REVERB_APP_KEY || import.meta.env.VITE_PUSHER_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST || (broadcaster === 'reverb' ? window.location.hostname : undefined),
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https' || broadcaster === 'pusher',
    enabledTransports: ['ws', 'wss'],
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
});
