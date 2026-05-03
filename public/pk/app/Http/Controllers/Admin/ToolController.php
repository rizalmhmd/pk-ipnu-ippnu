<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

class ToolController extends Controller
{
    public function storageLink()
    {
        try {
            Artisan::call('storage:link');
            return "Storage link created successfully.";
        } catch (\Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function clearCache()
    {
        try {
            Artisan::call('optimize:clear');
            return "Cache cleared successfully.";
        } catch (\Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function diag()
    {
        $disk = config('filesystems.default');
        $cloudUrl = config('cloudinary.cloud_url');
        $maskedUrl = $cloudUrl ? substr($cloudUrl, 0, 15) . '...' : 'Not Set';
        
        return [
            'FILESYSTEM_DISK (config)' => $disk,
            'CLOUDINARY_URL (config)' => $maskedUrl,
            'APP_URL' => config('app.url'),
            'APP_ENV' => config('app.env'),
            'PHP Version' => PHP_VERSION,
            'Cloudinary Configured' => !empty($cloudUrl),
            'Storage Driver Class' => get_class(Storage::disk()->getDriver()),
        ];
    }

    public function uploadTest()
    {
        try {
            // Create a tiny dummy file
            $content = "test content";
            $filename = "diag_test_" . time() . ".txt";
            
            $path = Storage::disk('cloudinary')->put($filename, $content);
            $url = Storage::disk('cloudinary')->url($filename);
            
            return [
                'status' => 'success',
                'path_returned' => $path,
                'url_returned' => $url,
            ];
        } catch (\Throwable $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ];
        }
    }
}
