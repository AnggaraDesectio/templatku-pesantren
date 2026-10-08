<?php

namespace App\Support\Demo;

/**
 * Data demo Pesantren (SANTRIKU): santri, ustadz, pembayaran SPP & infaq,
 * nilai, dan kamar asrama. Semua angka ditulis eksplisit supaya total
 * konsisten antar halaman. Kontrak status: ['label' => .., 'tone' => ..]
 * tanpa HTML, tone ∈ success | warning | destructive | info.
 */
class PesantrenData
{
    private static function rp(int $value): string
    {
        return 'Rp'.number_format($value, 0, ',', '.');
    }

    /** Baris mentah santri, dipakai internal agar tidak rekursi. */
    private static function santriRows(): array
    {
        return [
            ['id' => 1,  'nama' => 'Ahmad Fauzi',      'nis' => '2021001', 'tingkat' => '3 Aliyah',      'asrama' => 'Blok A', 'status' => ['label' => 'Aktif',  'tone' => 'success']],
            ['id' => 2,  'nama' => 'Muhammad Rizky',   'nis' => '2021002', 'tingkat' => '3 Aliyah',      'asrama' => 'Blok A', 'status' => ['label' => 'Aktif',  'tone' => 'success']],
            ['id' => 3,  'nama' => 'Fatimah Zahra',    'nis' => '2022045', 'tingkat' => '2 Aliyah',      'asrama' => 'Blok B', 'status' => ['label' => 'Aktif',  'tone' => 'success']],
            ['id' => 4,  'nama' => 'Aisyah Rahma',     'nis' => '2022046', 'tingkat' => '2 Aliyah',      'asrama' => 'Blok B', 'status' => ['label' => 'Aktif',  'tone' => 'success']],
            ['id' => 5,  'nama' => 'Abdullah Karim',   'nis' => '2023189', 'tingkat' => '1 Aliyah',      'asrama' => 'Blok A', 'status' => ['label' => 'Aktif',  'tone' => 'success']],
            ['id' => 6,  'nama' => 'Khadijah Aminah',  'nis' => '2023190', 'tingkat' => '1 Aliyah',      'asrama' => 'Blok C', 'status' => ['label' => 'Aktif',  'tone' => 'success']],
            ['id' => 7,  'nama' => 'Yusuf Hidayat',    'nis' => '2022233', 'tingkat' => '3 Tsanawiyah',  'asrama' => 'Blok A', 'status' => ['label' => 'Aktif',  'tone' => 'success']],
            ['id' => 8,  'nama' => 'Maryam Salsabila', 'nis' => '2022310', 'tingkat' => '3 Tsanawiyah',  'asrama' => 'Blok B', 'status' => ['label' => 'Aktif',  'tone' => 'success']],
            ['id' => 9,  'nama' => 'Ibrahim Malik',    'nis' => '2024101', 'tingkat' => '1 Tsanawiyah',  'asrama' => 'Blok A', 'status' => ['label' => 'Aktif',  'tone' => 'success']],
            ['id' => 10, 'nama' => 'Zainab Nur',       'nis' => '2024102', 'tingkat' => '1 Tsanawiyah',  'asrama' => 'Blok C', 'status' => ['label' => 'Aktif',  'tone' => 'success']],
            ['id' => 11, 'nama' => 'Hasan Basri',      'nis' => '2020055', 'tingkat' => 'Alumni',        'asrama' => '-',     'status' => ['label' => 'Alumni', 'tone' => 'info']],
            ['id' => 12, 'nama' => 'Siti Maryam',      'nis' => '2020120', 'tingkat' => 'Alumni',        'asrama' => '-',     'status' => ['label' => 'Alumni', 'tone' => 'info']],
        ];
    }

    /** Daftar santri. */
    public static function santris(): array
    {
        return self::santriRows();
    }

    /** Baris mentah ustadz. */
    private static function ustadzRows(): array
    {
        return [
            ['id' => 1, 'nama' => 'KH. Abdul Rahman',    'bidang' => 'Pengasuh Pesantren'],
            ['id' => 2, 'nama' => 'Ust. Muhammad Saleh', 'bidang' => 'Nahwu & Shorof'],
            ['id' => 3, 'nama' => 'Ustzh. Fatimah',      'bidang' => 'Fiqih'],
            ['id' => 4, 'nama' => 'Ust. Ahmad Dahlan',   'bidang' => 'Tafsir'],
            ['id' => 5, 'nama' => 'Ustzh. Aisyah',      'bidang' => 'Hadits'],
            ['id' => 6, 'nama' => 'Ust. Yusuf Mansur',   'bidang' => 'Akhlak & Tahfidz'],
            ['id' => 7, 'nama' => 'Ust. Ibrahim',       'bidang' => 'Bahasa Arab'],
            ['id' => 8, 'nama' => 'Ustzh. Khadijah',     'bidang' => 'Bahasa Inggris'],
        ];
    }

    /** Daftar ustadz. */
    public static function ustadz(): array
    {
        return self::ustadzRows();
    }

    /** Baris mentah pembayaran SPP & infaq. */
    private static function pembayaranRows(): array
    {
        return [
            ['id' => 1,  'santri' => 'Ahmad Fauzi',      'jenis' => 'SPP',   'bulan' => 'Okt 2026', 'jumlah' => 500000, 'status' => ['label' => 'Lunas',       'tone' => 'success']],
            ['id' => 2,  'santri' => 'Muhammad Rizky',   'jenis' => 'SPP',   'bulan' => 'Okt 2026', 'jumlah' => 500000, 'status' => ['label' => 'Lunas',       'tone' => 'success']],
            ['id' => 3,  'santri' => 'Fatimah Zahra',    'jenis' => 'SPP',   'bulan' => 'Okt 2026', 'jumlah' => 500000, 'status' => ['label' => 'Belum Bayar', 'tone' => 'destructive']],
            ['id' => 4,  'santri' => 'Aisyah Rahma',     'jenis' => 'SPP',   'bulan' => 'Okt 2026', 'jumlah' => 500000, 'status' => ['label' => 'Lunas',       'tone' => 'success']],
            ['id' => 5,  'santri' => 'Abdullah Karim',   'jenis' => 'SPP',   'bulan' => 'Okt 2026', 'jumlah' => 500000, 'status' => ['label' => 'Belum Bayar', 'tone' => 'destructive']],
            ['id' => 6,  'santri' => 'Khadijah Aminah',  'jenis' => 'SPP',   'bulan' => 'Sep 2026', 'jumlah' => 500000, 'status' => ['label' => 'Lunas',       'tone' => 'success']],
            ['id' => 7,  'santri' => 'Yusuf Hidayat',    'jenis' => 'Infaq', 'bulan' => 'Okt 2026', 'jumlah' => 250000, 'status' => ['label' => 'Lunas',       'tone' => 'success']],
            ['id' => 8,  'santri' => 'Maryam Salsabila', 'jenis' => 'SPP',   'bulan' => 'Okt 2026', 'jumlah' => 500000, 'status' => ['label' => 'Lunas',       'tone' => 'success']],
            ['id' => 9,  'santri' => 'Ibrahim Malik',    'jenis' => 'SPP',   'bulan' => 'Okt 2026', 'jumlah' => 500000, 'status' => ['label' => 'Belum Bayar', 'tone' => 'destructive']],
            ['id' => 10, 'santri' => 'Zainab Nur',       'jenis' => 'SPP',   'bulan' => 'Sep 2026', 'jumlah' => 500000, 'status' => ['label' => 'Lunas',       'tone' => 'success']],
            ['id' => 11, 'santri' => 'Ahmad Fauzi',      'jenis' => 'Infaq', 'bulan' => 'Okt 2026', 'jumlah' => 100000, 'status' => ['label' => 'Lunas',       'tone' => 'success']],
            ['id' => 12, 'santri' => 'Abdullah Karim',   'jenis' => 'SPP',   'bulan' => 'Sep 2026', 'jumlah' => 500000, 'status' => ['label' => 'Lunas',       'tone' => 'success']],
        ];
    }

    /** Tagihan & pembayaran SPP/Infaq. */
    public static function pembayarans(): array
    {
        return array_map(fn ($p) => $p + ['jumlah_rp' => self::rp($p['jumlah'])], self::pembayaranRows());
    }

    private static function predikat(int $nilai): array
    {
        if ($nilai >= 85) {
            return ['label' => 'A', 'tone' => 'success'];
        }
        if ($nilai >= 70) {
            return ['label' => 'B', 'tone' => 'info'];
        }
        return ['label' => 'C', 'tone' => 'warning'];
    }

    /** Baris mentah nilai per santri per mapel. */
    private static function nilaiRows(): array
    {
        return [
            ['id' => 1,  'santri' => 'Ahmad Fauzi',      'mapel' => 'Nahwu',       'nilai' => 88],
            ['id' => 2,  'santri' => 'Ahmad Fauzi',      'mapel' => 'Fiqih',       'nilai' => 92],
            ['id' => 3,  'santri' => 'Fatimah Zahra',    'mapel' => 'Shorof',      'nilai' => 85],
            ['id' => 4,  'santri' => 'Fatimah Zahra',    'mapel' => 'Tafsir',      'nilai' => 90],
            ['id' => 5,  'santri' => 'Muhammad Rizky',   'mapel' => 'Hadits',      'nilai' => 76],
            ['id' => 6,  'santri' => 'Aisyah Rahma',     'mapel' => 'Nahwu',       'nilai' => 81],
            ['id' => 7,  'santri' => 'Aisyah Rahma',     'mapel' => 'Akhlak',      'nilai' => 95],
            ['id' => 8,  'santri' => 'Yusuf Hidayat',    'mapel' => 'Fiqih',       'nilai' => 70],
            ['id' => 9,  'santri' => 'Maryam Salsabila', 'mapel' => 'Tafsir',      'nilai' => 83],
            ['id' => 10, 'santri' => 'Abdullah Karim',   'mapel' => 'Bahasa Arab', 'nilai' => 78],
            ['id' => 11, 'santri' => 'Khadijah Aminah',  'mapel' => 'Hadits',      'nilai' => 68],
            ['id' => 12, 'santri' => 'Ibrahim Malik',    'mapel' => 'Nahwu',       'nilai' => 74],
        ];
    }

    /** Nilai per santri per mapel (dengan predikat). */
    public static function nilais(): array
    {
        return array_map(fn ($n) => $n + ['predikat' => self::predikat($n['nilai'])], self::nilaiRows());
    }

    /** Baris mentah kamar asrama. */
    private static function kamarRows(): array
    {
        return [
            ['id' => 1,  'blok' => 'Blok A', 'kamar' => 'A-101', 'kapasitas' => 6, 'terisi' => 6],
            ['id' => 2,  'blok' => 'Blok A', 'kamar' => 'A-102', 'kapasitas' => 6, 'terisi' => 5],
            ['id' => 3,  'blok' => 'Blok A', 'kamar' => 'A-103', 'kapasitas' => 8, 'terisi' => 8],
            ['id' => 4,  'blok' => 'Blok A', 'kamar' => 'A-104', 'kapasitas' => 8, 'terisi' => 7],
            ['id' => 5,  'blok' => 'Blok B', 'kamar' => 'B-201', 'kapasitas' => 6, 'terisi' => 6],
            ['id' => 6,  'blok' => 'Blok B', 'kamar' => 'B-202', 'kapasitas' => 6, 'terisi' => 6],
            ['id' => 7,  'blok' => 'Blok B', 'kamar' => 'B-203', 'kapasitas' => 8, 'terisi' => 7],
            ['id' => 8,  'blok' => 'Blok C', 'kamar' => 'C-301', 'kapasitas' => 6, 'terisi' => 5],
            ['id' => 9,  'blok' => 'Blok C', 'kamar' => 'C-302', 'kapasitas' => 8, 'terisi' => 8],
            ['id' => 10, 'blok' => 'Blok C', 'kamar' => 'C-303', 'kapasitas' => 8, 'terisi' => 6],
        ];
    }

    /** Kamar asrama dengan okupansi & status. */
    public static function kamars(): array
    {
        return array_map(function ($k) {
            $okupansi = $k['kapasitas'] > 0 ? round($k['terisi'] / $k['kapasitas'] * 100) : 0;
            if ($k['terisi'] >= $k['kapasitas']) {
                $status = ['label' => 'Penuh', 'tone' => 'destructive'];
            } elseif ($okupansi >= 80) {
                $status = ['label' => 'Hampir Penuh', 'tone' => 'warning'];
            } else {
                $status = ['label' => 'Tersedia', 'tone' => 'success'];
            }
            return $k + ['okupansi' => $okupansi, 'status' => $status];
        }, self::kamarRows());
    }

    /** Ringkasan angka dashboard (dihitung dari data). */
    public static function ringkasan(): array
    {
        $tunggakan = 0;
        $infaqOkt  = 0;
        foreach (self::pembayaranRows() as $p) {
            if ($p['status']['label'] === 'Belum Bayar') {
                $tunggakan += $p['jumlah'];
            }
            if ($p['jenis'] === 'Infaq' && $p['bulan'] === 'Okt 2026' && $p['status']['label'] === 'Lunas') {
                $infaqOkt += $p['jumlah'];
            }
        }
        $aktif = count(array_filter(self::santriRows(), fn ($s) => $s['status']['label'] === 'Aktif'));

        return [
            'total_santri'      => 148, // santri per angkatan: 24+28+26+30+22+18
            'santri_contoh'    => $aktif,
            'total_ustadz'      => count(self::ustadzRows()),
            'tunggakan'         => $tunggakan,
            'tunggakan_rp'      => self::rp($tunggakan),
            'tunggakan_count'   => count(array_filter(self::pembayaranRows(), fn ($p) => $p['status']['label'] === 'Belum Bayar')),
            'infaq_bulan_ini'   => $infaqOkt,
            'infaq_bulan_ini_rp'=> self::rp($infaqOkt),
        ];
    }

    /** Santri per angkatan (bar chart). */
    public static function santriPerAngkatan(): array
    {
        return [
            'labels'   => ['2021', '2022', '2023', '2024', '2025', '2026'],
            'datasets' => [['label' => 'Santri', 'data' => [24, 28, 26, 30, 22, 18]]],
        ];
    }

    /** SPP lunas per bulan, juta Rp (area chart). */
    public static function sppPerBulan(): array
    {
        return [
            'labels'   => ['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
            'datasets' => [['label' => 'SPP lunas (juta Rp)', 'data' => [68, 72, 65, 70, 74, 71]]],
        ];
    }

    /** Distribusi status SPP seluruh santri (donut chart). */
    public static function distribusiStatusSpp(): array
    {
        return [
            'labels'   => ['Lunas', 'Belum Bayar'],
            'datasets' => [['label' => 'Santri', 'data' => [132, 16]]],
        ];
    }

    /** Nilai rata-rata per mapel (bar chart). */
    public static function nilaiRataPerMapel(): array
    {
        $agg = [];
        foreach (self::nilaiRows() as $n) {
            $agg[$n['mapel']][] = $n['nilai'];
        }
        $labels = array_keys($agg);
        $data   = array_map(fn ($vals) => round(array_sum($vals) / count($vals), 1), array_values($agg));

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Rata-rata nilai', 'data' => $data]],
        ];
    }

    /** Santri dengan tunggakan terbanyak untuk tabel laporan. */
    public static function tunggakanTeratas(): array
    {
        $agg = [];
        foreach (self::pembayaranRows() as $p) {
            if ($p['status']['label'] !== 'Belum Bayar') {
                continue;
            }
            $agg[$p['santri']]['santri'] = $p['santri'];
            $agg[$p['santri']]['tagihan'] = ($agg[$p['santri']]['tagihan'] ?? 0) + 1;
            $agg[$p['santri']]['total']   = ($agg[$p['santri']]['total'] ?? 0) + $p['jumlah'];
        }
        $rows = array_values($agg);
        usort($rows, fn ($a, $b) => $b['total'] <=> $a['total']);

        return array_map(fn ($r, $i) => [
            'id'       => $i + 1,
            'santri'   => $r['santri'],
            'tagihan'  => $r['tagihan'],
            'total_rp' => self::rp($r['total']),
        ], $rows, array_keys($rows));
    }
}
