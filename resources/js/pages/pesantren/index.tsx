import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, HandCoins, Users, UserCheck } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Pembayaran {
    id: number;
    santri: string;
    jenis: string;
    bulan: string;
    jumlah_rp: string;
    status: ToneLabel;
}

interface Ringkasan {
    total_santri: number;
    total_ustadz: number;
    tunggakan_rp: string;
    tunggakan_count: number;
    infaq_bulan_ini_rp: string;
}

export default function PesantrenIndex({
    ringkasan,
    angkatan,
    pembayaran,
}: {
    ringkasan: Ringkasan;
    angkatan: ChartData;
    pembayaran: Record<string, any>[];
}) {
    const rows: Pembayaran[] = pembayaran.map((p) => ({
        id: Number(p.id),
        santri: String(p.santri),
        jenis: String(p.jenis),
        bulan: String(p.bulan),
        jumlah_rp: String(p.jumlah_rp),
        status: p.status as ToneLabel,
    }));

    const columns: Column<Pembayaran>[] = [
        { key: 'santri', header: 'Santri', sortValue: (r) => r.santri },
        { key: 'jenis', header: 'Jenis', sortValue: (r) => r.jenis },
        { key: 'bulan', header: 'Bulan', mobileHidden: true, sortValue: (r) => r.bulan },
        {
            key: 'jumlah_rp',
            header: 'Jumlah',
            render: (r) => <span className="tnum font-medium">{r.jumlah_rp}</span>,
            sortValue: (r) => r.jumlah_rp,
        },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Dashboard Pesantren"
                description="Pantau santri, tagihan SPP, dan hunian asrama hari ini."
                actions={
                    <Button size="sm" asChild>
                        <Link href="/pesantren/santri">Data Santri</Link>
                    </Button>
                }
                breadcrumbs={[{ label: 'Santriku' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Total Santri"
                    value={String(ringkasan.total_santri)}
                    delta="6 angkatan aktif"
                    trend="up"
                    icon={Users}
                    hint="Santri aktif yang mondok di semua angkatan."
                />
                <StatCard
                    label="Ustadz & Pengajar"
                    value={String(ringkasan.total_ustadz)}
                    delta="semua bidang terisi"
                    trend="flat"
                    icon={UserCheck}
                    hint="Ustadz dan pengajar yang aktif mengajar."
                />
                <StatCard
                    label="Tunggakan SPP"
                    value={ringkasan.tunggakan_rp}
                    delta={`${ringkasan.tunggakan_count} tagihan belum bayar`}
                    trend="down"
                    icon={AlertCircle}
                    hint="Tagihan SPP yang belum dibayar dan perlu ditagih."
                />
                <StatCard
                    label="Infaq Bulan Ini"
                    value={ringkasan.infaq_bulan_ini_rp}
                    delta="Oktober 2026"
                    trend="up"
                    icon={HandCoins}
                    hint="Donasi infaq yang terkumpul bulan berjalan."
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Santri per Angkatan</CardTitle>
                        <p className="text-muted-foreground text-sm">Jumlah santri aktif di tiap angkatan.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={angkatan} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Tunggakan SPP</CardTitle>
                        <p className="text-muted-foreground text-sm">Santri yang perlu ditagih bulan ini.</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {rows
                            .filter((r) => r.status.label === 'Belum Bayar')
                            .map((r) => (
                                <div key={r.id} className="flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium">{r.santri}</p>
                                        <p className="text-muted-foreground text-xs">
                                            {r.jenis} · {r.bulan}
                                        </p>
                                    </div>
                                    <span className="tnum text-sm font-medium">{r.jumlah_rp}</span>
                                </div>
                            ))}
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={rows}
                    searchKeys={['santri', 'jenis']}
                    emptyTitle="Belum ada pembayaran"
                    emptyDescription="Pembayaran SPP & infaq tercatat di halaman SPP & Infaq."
                />
            </div>
        </AuthenticatedLayout>
    );
}
