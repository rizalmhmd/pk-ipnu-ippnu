import { nikParser } from 'nik-parser';

/**
 * Konversi teks ke Title Case yang rapi untuk nama wilayah
 */
export function formatTitleCase(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .split(' ')
        .map(word => {
            if (['dki', 'di'].includes(word)) {
                return word.toUpperCase();
            }
            if (word === 'kab.' || word === 'kab') {
                return 'Kab.';
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

/**
 * Hitung zodiak astrologi berdasarkan tanggal & bulan
 */
export function getZodiac(day, month) {
    const dates = [
        { sign: 'Capricorn', symbol: '♑', start: [12, 22], end: [1, 19] },
        { sign: 'Aquarius', symbol: '♒', start: [1, 20], end: [2, 18] },
        { sign: 'Pisces', symbol: '♓', start: [2, 19], end: [3, 20] },
        { sign: 'Aries', symbol: '♈', start: [3, 21], end: [4, 19] },
        { sign: 'Taurus', symbol: '♉', start: [4, 20], end: [5, 20] },
        { sign: 'Gemini', symbol: '♊', start: [5, 21], end: [6, 20] },
        { sign: 'Cancer', symbol: '♋', start: [6, 21], end: [7, 22] },
        { sign: 'Leo', symbol: '♌', start: [7, 23], end: [8, 22] },
        { sign: 'Virgo', symbol: '♍', start: [8, 23], end: [9, 22] },
        { sign: 'Libra', symbol: '♎', start: [9, 23], end: [10, 22] },
        { sign: 'Scorpio', symbol: '♏', start: [10, 23], end: [11, 21] },
        { sign: 'Sagittarius', symbol: '♐', start: [11, 22], end: [12, 21] },
    ];

    for (const z of dates) {
        if (
            (month === z.start[0] && day >= z.start[1]) ||
            (month === z.end[0] && day <= z.end[1])
        ) {
            return `${z.sign} ${z.symbol}`;
        }
    }
    return 'Capricorn ♑';
}

/**
 * Hitung hari lahir, pasaran Jawa, weton, dan neptu
 */
export function getWetonAndNeptu(year, month, day) {
    const pasarans = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    const targetDate = new Date(Date.UTC(year, month - 1, day));
    const dayOfWeek = days[targetDate.getUTCDay()];

    // 1 Jan 1970 = Kamis Wage (Wage = index 3)
    const epoch = new Date(Date.UTC(1970, 0, 1));
    const diffDays = Math.floor((targetDate - epoch) / (1000 * 60 * 60 * 24));
    const pasaranIndex = ((diffDays % 5) + 5 + 3) % 5;
    const pasaran = pasarans[pasaranIndex];

    // Nilai Neptu Hari & Pasaran
    const neptuDay = { Minggu: 5, Senin: 4, Selasa: 3, Rabu: 7, Kamis: 8, Jumat: 6, Sabtu: 9 };
    const neptuPasaran = { Legi: 5, Pahing: 9, Pon: 7, Wage: 4, Kliwon: 8 };
    const totalNeptu = (neptuDay[dayOfWeek] || 0) + (neptuPasaran[pasaran] || 0);

    return {
        dayOfWeek,
        pasaran,
        weton: `${dayOfWeek} ${pasaran}`,
        neptu: totalNeptu,
    };
}

/**
 * Klasifikasi Generasi Berdasarkan Tahun Lahir
 */
export function getGeneration(year) {
    if (year >= 2013) return 'Gen Alpha (2013 - Sekarang)';
    if (year >= 1997) return 'Gen Z (1997 - 2012)';
    if (year >= 1981) return 'Milenial / Gen Y (1981 - 1996)';
    if (year >= 1965) return 'Gen X (1965 - 1980)';
    return 'Baby Boomer (< 1965)';
}

const fallbackProvinces = {
    '11': 'Aceh', '12': 'Sumatera Utara', '13': 'Sumatera Barat', '14': 'Riau',
    '15': 'Jambi', '16': 'Sumatera Selatan', '17': 'Bengkulu', '18': 'Lampung',
    '19': 'Kep. Bangka Belitung', '21': 'Kep. Riau',
    '31': 'DKI Jakarta', '32': 'Jawa Barat', '33': 'Jawa Tengah',
    '34': 'DI Yogyakarta', '35': 'Jawa Timur', '36': 'Banten',
    '51': 'Bali', '52': 'Nusa Tenggara Barat', '53': 'Nusa Tenggara Timur',
    '61': 'Kalimantan Barat', '62': 'Kalimantan Tengah', '63': 'Kalimantan Selatan',
    '64': 'Kalimantan Timur', '65': 'Kalimantan Utara',
    '71': 'Sulawesi Utara', '72': 'Sulawesi Tengah', '73': 'Sulawesi Selatan',
    '74': 'Sulawesi Tenggara', '75': 'Gorontalo', '76': 'Sulawesi Barat',
    '81': 'Maluku', '82': 'Maluku Utara',
    '91': 'Papua Barat', '92': 'Papua Barat Daya', '93': 'Papua Selatan',
    '94': 'Papua', '95': 'Papua Pegunungan', '96': 'Papua Tengah'
};

const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Parser NIK Lengkap (Deteksi seluruh identitas dari 16 digit NIK)
 */
export function parseFullNik(nik) {
    if (!nik) return null;
    const clean = String(nik).replace(/[^0-9]/g, '');
    if (clean.length !== 16) return null;

    let day = parseInt(clean.substring(6, 8), 10);
    const month = parseInt(clean.substring(8, 10), 10);
    const yearShort = parseInt(clean.substring(10, 12), 10);

    const isFemale = day > 40;
    if (isFemale) day -= 40;

    if (day < 1 || day > 31 || month < 1 || month > 12) {
        return {
            isValid: false,
            message: 'Format tanggal atau bulan lahir pada NIK tidak valid.'
        };
    }

    const currentYear = new Date().getFullYear();
    const currentYearShort = currentYear % 100;
    const fullYear = yearShort <= currentYearShort ? (2000 + yearShort) : (1900 + yearShort);
    const age = currentYear - fullYear;

    // Hitung Hari, Weton, Neptu, Zodiak & Generasi
    const wetonData = getWetonAndNeptu(fullYear, month, day);
    const zodiac = getZodiac(day, month);
    const generation = getGeneration(fullYear);

    // Ambil data wilayah via nik-parser
    let province = fallbackProvinces[clean.substring(0, 2)] || 'Wilayah Indonesia';
    let kabupatenKota = 'Tidak Diketahui';
    let kecamatan = 'Tidak Diketahui';
    let kodepos = '';
    let uniqueCode = clean.substring(12, 16);

    try {
        const parsed = nikParser(clean);
        if (parsed) {
            if (parsed.province()) province = formatTitleCase(parsed.province());
            if (parsed.kabupatenKota()) kabupatenKota = formatTitleCase(parsed.kabupatenKota());
            if (parsed.kecamatan()) kecamatan = formatTitleCase(parsed.kecamatan());
            if (parsed.kodepos()) kodepos = parsed.kodepos();
            if (parsed.uniqcode()) uniqueCode = parsed.uniqcode();
        }
    } catch (e) {
        console.warn('Gagal mem-parsing NIK detail via nik-parser:', e);
    }

    const regionCode = `${clean.substring(0, 2)}.${clean.substring(2, 4)}.${clean.substring(4, 6)}`;
    const birthDateIso = `${fullYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const birthDateFormatted = `${day} ${monthNames[month - 1]} ${fullYear}`;

    return {
        isValid: true,
        cleanNik: clean,
        isFemale,
        gender: isFemale ? 'Perempuan' : 'Laki-laki',
        genderLabel: isFemale ? 'Rekanita (Perempuan)' : 'Rekan (Laki-laki)',
        birthDate: birthDateIso,
        birthDateFormatted,
        day,
        month,
        fullYear,
        age,
        dayOfWeek: wetonData.dayOfWeek,
        pasaran: wetonData.pasaran,
        weton: wetonData.weton,
        neptu: wetonData.neptu,
        zodiac,
        generation,
        province,
        kabupatenKota,
        kecamatan,
        kodepos,
        uniqueCode,
        regionCode,
    };
}
