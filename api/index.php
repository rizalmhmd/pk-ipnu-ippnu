<?php

// Vercel serverless functions bersifat read-only (kecuali folder /tmp).
// Maka kita arahkan semua penyimpanan file cache dan view ke /tmp.

$_ENV['VIEW_COMPILED_PATH'] = '/tmp/storage/framework/views';
$_ENV['SESSION_DRIVER'] = $_ENV['SESSION_DRIVER'] ?? 'cookie';
$_ENV['LOG_CHANNEL'] = $_ENV['LOG_CHANNEL'] ?? 'stderr';
$_ENV['APP_CONFIG_CACHE'] = '/tmp/storage/bootstrap/cache/config.php';
$_ENV['APP_EVENTS_CACHE'] = '/tmp/storage/bootstrap/cache/events.php';
$_ENV['APP_ROUTES_CACHE'] = '/tmp/storage/bootstrap/cache/routes.php';
$_ENV['APP_SERVICES_CACHE'] = '/tmp/storage/bootstrap/cache/services.php';
$_ENV['APP_PACKAGES_CACHE'] = '/tmp/storage/bootstrap/cache/packages.php';

// Pastikan direktori temporer ini ada
$tmpDirs = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/logs',
    '/tmp/storage/bootstrap/cache',
];

foreach ($tmpDirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
}

// Teruskan request ke entry point asli Laravel
require __DIR__ . '/../public/index.php';
