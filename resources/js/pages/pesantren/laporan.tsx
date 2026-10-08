import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { AreaChartCard, BarChartCard, DonutChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, GraduationCap, HandCoins, Users } from 'lucide-react';

interface Tunggakan {
    id: number;
    santri: string;
    tagihan: number;
    total_rp: string;
}

interface Ringkasan {
    total_santri: number;
    total_ustadz: number;
    tunggakan_rp: string;
    infaq_bulan_ini_rp: string;
}

export default function PesantrenLaporan({
    ringkasan,
    angkatan,
    sppPerBulan,
    statusSpp,
    nilaiPerMapel,
    tunggakan,
}: {
    ringkasan: Ringkasan;
    angkatan: ChartData;
    sppPerBulan: ChartData;
    statusSpp: ChartData;
    nilaiPerMapel: ChartData;
    tunggakan: Record<string, any>[];
}) {
    const rows: Tunggakan[] = tunggakan.map((t) => ({
        id: Number(t.id),
        santri: String(t.santri),
        tagihan: Number(t.tagihan),
        total_rp: String(t.total_rp),
    }));

    const columns: Column<Tunggakan>[] = [
        { key: 'santri', header: 'Santri', sortValue: (r) => r.santri },
        {
            key: 'tagihan',
            header: 'Tagihan',
            render: (r) => <span className="tnum">{r.tagihan} bulan</span>,
            sortValue: (r) => r.tagihan,
        },
        {
            key: 'total_rp',
            header: 'Total Tunggakan',
            render: (r) => <span className="tnum font-medium">{r.total_rp}</span>,
            sortValue: (r) => r.total_rp,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan"
                description="Kinerja pesantren: santri, keuangan, dan hasil belajar."
                breadcrumbs={[{ label: 'Santriku', href: '/pesantren' }, { label: 'Laporan' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Total Santri"
                    hint="Santri aktif di semua angkatan."
                    value={String(ringkasan.total_santri)}
                    delta="santri aktif"
                    trend="up"
                    icon={Users}
                />
                <StatCard
                    label="Ustadz & Pengajar"
                    hint="Ustadz dan pengajar yang aktif mengajar."
                    value={String(ringkasan.total_ustadz)}
                    delta="pengajar aktif"
                    trend="flat"
                    icon={GraduationCap}
                />
                <StatCard
                    label="Tunggakan SPP"
                    hint="Tagihan SPP yang belum dibayar."
                    value={ringkasan.tunggakan_rp}
                    delta="perlu penagihan"
                    trend="down"
                    icon={AlertCircle}
                />
                <StatCard
                    label="Infaq Bulan Ini"
                    hint="Donasi infaq yang terkumpul bulan ini."
                    value={ringkasan.infaq_bulan_ini_rp}
                    delta="Oktober 2026"
                    trend="up"
                    icon={HandCoins}
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">SPP Lunas per Bulan</CardTitle>
                        <p className="text-muted-foreground text-sm">Dalam juta rupiah.</p>
                    </CardHeader>
                    <CardContent>
                        <AreaChartCard data={sppPerBulan} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Status SPP Santri</CardTitle>
                        <p className="text-muted-foreground text-sm">Seluruh santri aktif.</p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={statusSpp} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Santri per Angkatan</CardTitle>
                        <p className="text-muted-foreground text-sm">Jumlah santri aktif.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={angkatan} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Rata-rata Nilai per Mapel</CardTitle>
                        <p className="text-muted-foreground text-sm">Skala 0–100.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={nilaiPerMapel} />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Tunggakan Teratas</CardTitle>
                        <p className="text-muted-foreground text-sm">Santri dengan tagihan SPP belum lunas.</p>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            rows={rows}
                            emptyTitle="Tidak ada tunggakan"
                            emptyDescription="Semua tagihan SPP sudah lunas."
                        />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
