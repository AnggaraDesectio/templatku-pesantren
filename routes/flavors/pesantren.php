<?php

use App\Http\Controllers\Web\PesantrenController;
use Illuminate\Support\Facades\Route;

Route::prefix('pesantren')->name('pesantren.')->group(function () {
    Route::get('/', [PesantrenController::class, 'index'])->name('index');
    Route::get('/santri', [PesantrenController::class, 'santri'])->name('santri');
    Route::get('/nilai', [PesantrenController::class, 'nilai'])->name('nilai');
    Route::get('/spp', [PesantrenController::class, 'spp'])->name('spp');
    Route::get('/asrama', [PesantrenController::class, 'asrama'])->name('asrama');
    Route::get('/laporan', [PesantrenController::class, 'laporan'])->name('laporan');
});
