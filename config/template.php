<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "pesantren".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'pesantren'),

    'flavors' => array (
  'pesantren' => 
  array (
    'label' => 'Pesantren',
    'brand_name' => 'SANTRIKU',
    'brand_tagline' => 'Kelola pesantren modern',
    'brand_initials' => 'SK',
    'accent' => '#0284c7',
    'category' => 'pendidikan',
    'home' => 'pesantren.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Pesantren',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/pesantren',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Santri',
              'to' => '/pesantren/santri',
              'icon' => 'Users',
            ),
            2 => 
            array (
              'label' => 'Nilai',
              'to' => '/pesantren/nilai',
              'icon' => 'GraduationCap',
            ),
            3 => 
            array (
              'label' => 'SPP & Infaq',
              'to' => '/pesantren/spp',
              'icon' => 'Wallet',
            ),
            4 => 
            array (
              'label' => 'Asrama',
              'to' => '/pesantren/asrama',
              'icon' => 'BedDouble',
            ),
            5 => 
            array (
              'label' => 'Laporan',
              'to' => '/pesantren/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
