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

interface Santri {
    id: number;
    nama: string;
    nis: string;
    tingkat: string;
    asrama: string;
    status: ToneLabel;
}

export default function PesantrenSantri({ santris }: { santris: Record<string, any>[] }) {
    const [rows, setRows] = useState<Santri[]>(() =>
        santris.map((s) => ({
            id: Number(s.id),
            nama: String(s.nama),
            nis: String(s.nis),
            tingkat: String(s.tingkat),
            asrama: String(s.asrama),
            status: s.status as ToneLabel,
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Santri | null>(null);
    const [form, setForm] = useState({ nama: '', nis: '', tingkat: '1 SMP', asrama: '' });

    const openAdd = () => {
        setEditing(null);
        setForm({ nama: '', nis: '', tingkat: '1 SMP', asrama: '' });
        setOpen(true);
    };

    const openEdit = (row: Santri) => {
        setEditing(row);
        setForm({ nama: row.nama, nis: row.nis, tingkat: row.tingkat, asrama: row.asrama });
        setOpen(true);
    };

    const save = () => {
        if (editing) {
            setRows((prev) => prev.map((r) => (r.id === editing.id ? { ...r, ...form } : r)));
            toast.success(`Data ${form.nama} diperbarui.`);
        } else {
            const id = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
            setRows((prev) => [
                ...prev,
                { id, ...form, status: { label: 'Aktif', tone: 'success' as const } },
            ]);
            toast.success(`${form.nama} terdaftar sebagai santri.`);
        }
        setOpen(false);
    };

    const set = (key: 'nama' | 'nis' | 'asrama') => (e: { target: { value: string } }) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const columns: Column<Santri>[] = [
        { key: 'nama', header: 'Nama', sortValue: (r) => r.nama },
        { key: 'nis', header: 'NIS', sortValue: (r) => r.nis },
        { key: 'tingkat', header: 'Kelas / Tingkat', sortValue: (r) => r.tingkat },
        { key: 'asrama', header: 'Asrama', mobileHidden: true, sortValue: (r) => r.asrama },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'status',
            label: 'Status',
            options: [
                { value: 'Aktif', label: 'Aktif' },
                { value: 'Alumni', label: 'Alumni' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Santri"
                description="Data santri: NIS, tingkat, asrama, dan status."
                breadcrumbs={[{ label: 'Santriku', href: '/pesantren' }, { label: 'Santri' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Santri
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Santri</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'nis', 'tingkat']}
                        filters={filters}
                        pageSize={10}
                        onEdit={openEdit}
                        emptyTitle="Belum ada santri"
                        emptyDescription="Daftarkan santri pertama, isi nama, NIS, dan asramanya lewat tombol Tambah Santri di atas."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Santri' : 'Tambah Santri'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="nama">Nama santri</Label>
                                <Input id="nama" value={form.nama} onChange={set('nama')} placeholder="cth: Ahmad Fauzi" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="nis">NIS</Label>
                                <Input id="nis" value={form.nis} onChange={set('nis')} placeholder="cth: 2026001" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Tingkat</Label>
                                <Select value={form.tingkat} onValueChange={(v) => setForm((f) => ({ ...f, tingkat: v }))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {['1 SMP', '2 SMP', '3 SMP', '1 SMA', '2 SMA', '3 SMA', 'Tahfidz'].map((t) => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="asrama">Asrama</Label>
                                <Input id="asrama" value={form.asrama} onChange={set('asrama')} placeholder="cth: Al-Falah" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpen(false)}>Batal</Button>
                        <Button onClick={save} disabled={!form.nama.trim()}>Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
