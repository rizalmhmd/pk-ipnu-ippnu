import Swal from 'sweetalert2';

/**
 * Show a consistent SweetAlert2 confirmation dialog before deleting a record.
 */
export function confirmDelete(text, onConfirm, title = 'Konfirmasi Hapus') {
    const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

    Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
        background: isDark ? '#0f172a' : '#ffffff',
        color: isDark ? '#f8fafc' : '#0f172a',
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        }
    });
}

