<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FileStorageService
{
    /**
     * Determine whether uploads should use the Cloudinary disk.
     */
    public static function shouldUseCloudinary(): bool
    {
        return config('filesystems.default') === 'cloudinary'
            && !empty(config('cloudinary.cloud_url'));
    }

    /**
     * Upload a file to the active public storage (Cloudinary or local public disk).
     */
    public static function upload(UploadedFile $file, string $directory): string
    {
        if (self::shouldUseCloudinary()) {
            $path = Storage::disk('cloudinary')->putFile($directory, $file);
            return Storage::disk('cloudinary')->url($path);
        }

        return $file->store($directory, 'public');
    }

    /**
     * Resolve a public URL for a stored path across URLs, public_path, public disk, or Cloudinary.
     */
    public static function url(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        if (is_file(public_path($path))) {
            return asset($path);
        }

        try {
            if (Storage::disk('public')->exists($path)) {
                return asset('storage/' . ltrim($path, '/'));
            }
        } catch (\Throwable $e) {
            // Fall through to configured disk
        }

        if (self::shouldUseCloudinary()) {
            try {
                return Storage::disk('cloudinary')->url($path);
            } catch (\Throwable $e) {
                Log::warning('Cloudinary URL resolution failed: ' . $e->getMessage());
            }
        }

        return asset('storage/' . ltrim($path, '/'));
    }

    /**
     * Delete a stored file across Cloudinary, public disk, default disk, or public path.
     */
    public static function delete(?string $path): void
    {
        if (!$path) {
            return;
        }

        if (filter_var($path, FILTER_VALIDATE_URL)) {
            if (str_contains($path, 'res.cloudinary.com') && !empty(config('cloudinary.cloud_url'))) {
                if (preg_match('#/upload/(?:v\d+/)?(.+?)(?:\.[a-zA-Z0-9]+)?(?:\?.*)?$#', $path, $matches)) {
                    try {
                        Storage::disk('cloudinary')->delete($matches[1]);
                    } catch (\Throwable $e) {
                        Log::warning('Cloudinary delete failed: ' . $e->getMessage());
                    }
                }
            }
            return;
        }

        try {
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        } catch (\Throwable $e) {
            Log::warning('Public disk delete failed: ' . $e->getMessage());
        }

        $defaultDisk = config('filesystems.default');
        if ($defaultDisk && $defaultDisk !== 'public' && $defaultDisk !== 'cloudinary') {
            try {
                if (Storage::disk($defaultDisk)->exists($path)) {
                    Storage::disk($defaultDisk)->delete($path);
                }
            } catch (\Throwable $e) {
                Log::warning('Default disk delete failed: ' . $e->getMessage());
            }
        }

        $legacyPublicPath = public_path($path);
        if (is_file($legacyPublicPath)) {
            @unlink($legacyPublicPath);
        }
    }
}
