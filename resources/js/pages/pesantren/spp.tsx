import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

interface Pembayaran {
    id: number;
    santri: string;
    jenis: string;
    bulan: string;
    jumlah_rp: string;
    status: ToneLabel;
}

export default function PesantrenSpp({ pembayarans }: { pembayarans: Record<string, any>[] }) {
    const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
    const [rows, setRows] = useState<Pembayaran[]>(() =>
        pembayarans.map((p) => ({
            id: Number(p.id),
            santri: String(p.santri),
            jenis: String(p.jenis),
            bulan: String(p.bulan),
            jumlah_rp: String(p.jumlah_rp),
            status: p.status as ToneLabel,
        })),
    );
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ santri: '', jenis: 'SPP', bulan: 'Oktober 2026', jumlah: '' });

    const save = () => {
        const id = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
        setRows((prev) => [
            {
                id,
                santri: form.santri,
                jenis: form.jenis,
                bulan: form.bulan,
                jumlah_rp: rp(Number(form.jumlah) || 0),
                status: { label: 'Lunas', tone: 'success' as const },
            },
            ...prev,
        ]);
        toast.success(`Pembayaran ${form.jenis} ${form.santri} tercatat lunas.`);
        setForm({ santri: '', jenis: 'SPP', bulan: 'Oktober 2026', jumlah: '' });
        setOpen(false);
    };

    const set = (key: 'santri' | 'bulan' | 'jumlah') => (e: { target: { value: string } }) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

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

    const filters: FilterOption[] = [
        {
            key: 'jenis',
            label: 'Jenis',
            options: [
                { value: 'SPP', label: 'SPP' },
                { value: 'Infaq', label: 'Infaq' },
            ],
            match: (row: any, value: string) => row.jenis === value,
        },
        {
            key: 'status',
            label: 'Status',
            options: [
                { value: 'Lunas', label: 'Lunas' },
                { value: 'Belum Bayar', label: 'Belum Bayar' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="SPP & Infaq"
                description="Tagihan dan pembayaran SPP bulanan serta infaq santri."
                breadcrumbs={[{ label: 'Santriku', href: '/pesantren' }, { label: 'SPP & Infaq' }]}
                actions={
                    <Button size="sm" onClick={() => setOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Catat Pembayaran
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Pembayaran</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['santri', 'jenis']}
                        filters={filters}
                        pageSize={10}
                        emptyTitle="Belum ada pembayaran"
                        emptyDescription="Catat pembayaran pertama, SPP atau infaq santri, lewat tombol Catat Pembayaran di atas."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Catat Pembayaran</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="santri">Nama santri</Label>
                            <Input id="santri" value={form.santri} onChange={set('santri')} placeholder="cth: Ahmad Fauzi" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Jenis</Label>
                                <Select value={form.jenis} onValueChange={(v) => setForm((f) => ({ ...f, jenis: v }))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {['SPP', 'Infaq', 'Daftar Ulang', 'Kegiatan'].map((j) => (
                                            <SelectItem key={j} value={j}>{j}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="bulan">Bulan</Label>
                                <Input id="bulan" value={form.bulan} onChange={set('bulan')} placeholder="Oktober 2026" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="jumlah">Jumlah (Rp)</Label>
                            <Input id="jumlah" type="number" min={0} value={form.jumlah} onChange={set('jumlah')} placeholder="350000" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpen(false)}>Batal</Button>
                        <Button onClick={save} disabled={!form.santri.trim() || !(Number(form.jumlah) > 0)}>Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
