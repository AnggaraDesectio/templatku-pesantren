import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Kamar {
    id: number;
    blok: string;
    kamar: string;
    kapasitas: number;
    terisi: number;
    okupansi: number;
    status: ToneLabel;
}

export default function PesantrenAsrama({ kamars }: { kamars: Record<string, any>[] }) {
    const rows: Kamar[] = kamars.map((k) => ({
        id: Number(k.id),
        blok: String(k.blok),
        kamar: String(k.kamar),
        kapasitas: Number(k.kapasitas),
        terisi: Number(k.terisi),
        okupansi: Number(k.okupansi),
        status: k.status as ToneLabel,
    }));

    const columns: Column<Kamar>[] = [
        { key: 'blok', header: 'Blok', sortValue: (r) => r.blok },
        { key: 'kamar', header: 'Kamar', sortValue: (r) => r.kamar },
        {
            key: 'terisi',
            header: 'Terisi',
            render: (r) => (
                <div className="flex min-w-44 items-center gap-2">
                    <div className="bg-secondary h-2 flex-1 overflow-hidden rounded-full">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${r.okupansi}%` }} />
                    </div>
                    <span className="tnum text-sm whitespace-nowrap">
                        {r.terisi}/{r.kapasitas}
                    </span>
                </div>
            ),
            sortValue: (r) => r.okupansi,
        },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'blok',
            label: 'Blok',
            options: [
                { value: 'Blok A', label: 'Blok A (Putra)' },
                { value: 'Blok B', label: 'Blok B (Putri)' },
                { value: 'Blok C', label: 'Blok C (Putri)' },
            ],
            match: (row: any, value: string) => row.blok === value,
        },
        {
            key: 'status',
            label: 'Status',
            options: [
                { value: 'Penuh', label: 'Penuh' },
                { value: 'Hampir Penuh', label: 'Hampir Penuh' },
                { value: 'Tersedia', label: 'Tersedia' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Asrama"
                description="Kamar asrama: kapasitas, keterisian, dan ketersediaan."
                breadcrumbs={[{ label: 'Santriku', href: '/pesantren' }, { label: 'Asrama' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Kamar</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['blok', 'kamar']}
                        filters={filters}
                        pageSize={10}
                        emptyTitle="Belum ada kamar"
                        emptyDescription="Kamar dan hunian asrama dikelola di halaman Asrama."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
