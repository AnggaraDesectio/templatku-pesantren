<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\PesantrenData;
use Inertia\Inertia;
use Inertia\Response;

/** Halaman-halaman Pesantren (Inertia). */
class PesantrenController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('pesantren/index', [
            'ringkasan'   => PesantrenData::ringkasan(),
            'angkatan'    => PesantrenData::santriPerAngkatan(),
            'pembayaran'  => array_slice(PesantrenData::pembayarans(), 0, 5),
        ]);
    }

    public function santri(): Response
    {
        return Inertia::render('pesantren/santri', [
            'santris' => PesantrenData::santris(),
        ]);
    }

    public function nilai(): Response
    {
        return Inertia::render('pesantren/nilai', [
            'nilais' => PesantrenData::nilais(),
        ]);
    }

    public function spp(): Response
    {
        return Inertia::render('pesantren/spp', [
            'pembayarans' => PesantrenData::pembayarans(),
        ]);
    }

    public function asrama(): Response
    {
        return Inertia::render('pesantren/asrama', [
            'kamars' => PesantrenData::kamars(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('pesantren/laporan', [
            'ringkasan'    => PesantrenData::ringkasan(),
            'angkatan'     => PesantrenData::santriPerAngkatan(),
            'sppPerBulan'  => PesantrenData::sppPerBulan(),
            'statusSpp'    => PesantrenData::distribusiStatusSpp(),
            'nilaiPerMapel'=> PesantrenData::nilaiRataPerMapel(),
            'tunggakan'    => PesantrenData::tunggakanTeratas(),
        ]);
    }
}
