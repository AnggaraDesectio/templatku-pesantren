import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Nilai {
    id: number;
    santri: string;
    mapel: string;
    nilai: number;
    predikat: ToneLabel;
}

export default function PesantrenNilai({ nilais }: { nilais: Record<string, any>[] }) {
    const rows: Nilai[] = nilais.map((n) => ({
        id: Number(n.id),
        santri: String(n.santri),
        mapel: String(n.mapel),
        nilai: Number(n.nilai),
        predikat: n.predikat as ToneLabel,
    }));

    const columns: Column<Nilai>[] = [
        { key: 'santri', header: 'Santri', sortValue: (r) => r.santri },
        { key: 'mapel', header: 'Mata Pelajaran', sortValue: (r) => r.mapel },
        {
            key: 'nilai',
            header: 'Nilai',
            render: (r) => <span className="tnum font-medium">{r.nilai}</span>,
            sortValue: (r) => r.nilai,
        },
        {
            key: 'predikat',
            header: 'Predikat',
            render: (r) => <ToneBadge label={r.predikat.label} tone={r.predikat.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'predikat',
            label: 'Predikat',
            options: [
                { value: 'A', label: 'A' },
                { value: 'B', label: 'B' },
                { value: 'C', label: 'C' },
            ],
            match: (row: any, value: string) => row.predikat.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Nilai"
                description="Hasil penilaian santri per mata pelajaran diniyah."
                breadcrumbs={[{ label: 'Santriku', href: '/pesantren' }, { label: 'Nilai' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Nilai Santri</CardTitle>
                    <p className="text-muted-foreground text-sm">
                        Predikat: A (85–100), B (70–84), C (di bawah 70).
                    </p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['santri', 'mapel']}
                        filters={filters}
                        pageSize={12}
                        emptyTitle="Belum ada nilai"
                        emptyDescription="Nilai muncul setelah ustadz menginput di halaman Nilai."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
