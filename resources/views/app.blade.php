<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ $siteSetting->site_name ?? config('app.name', 'PKPT IPNU IPPNU') }}</title>
    
    <!-- Favicon -->
    @if(isset($siteSetting) && $siteSetting->favicon)
        <link rel="icon" type="image/x-icon" href="{{ asset('storage/' . $siteSetting->favicon) }}?v={{ $siteSetting->updated_at->timestamp }}">
        <link rel="shortcut icon" href="{{ asset('storage/' . $siteSetting->favicon) }}?v={{ $siteSetting->updated_at->timestamp }}">
        <link rel="apple-touch-icon" href="{{ asset('storage/' . $siteSetting->favicon) }}?v={{ $siteSetting->updated_at->timestamp }}">
    @endif
    
    <!-- Fonts & Icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />

    @routes

    <!-- Scripts & Styles -->
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>
<body class="font-sans antialiased text-gray-900 bg-white">
    @inertia
</body>
</html>
