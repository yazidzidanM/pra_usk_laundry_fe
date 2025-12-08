import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export type UserRoleOverviewProps = {
  username: string;
  adminCount: any;
  kasirCount: any;
  ownerCount: any;
  userCount: any;
};

export default function UserRoleOverview({
  username,
  adminCount,
  kasirCount,
  ownerCount,
  userCount,
}: UserRoleOverviewProps) {
  return (
    <div className="max-w-full h-full p-6 flex flex-col gap-6 bg-background text-foreground">

      <Card className="relative overflow-hidden rounded-2xl shadow-sm bg-card border-none">
        <div className="absolute -top-25 -left-20 w-64 h-64 bg-teal-600/40 rounded-full blur-2xl pointer-events-none" />
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Manajemen Pengguna 👤
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Halo, {username}!  
          Berikut rekap jumlah pengguna berdasarkan peran mereka di sistem.
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        
        <Card className="relative overflow-hidden p-5 rounded-2xl shadow-sm bg-card border-none flex flex-col gap-2">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/40 rounded-full blur-3xl pointer-events-none" />
          <CardTitle className="text-lg font-medium">Admin</CardTitle>
          <p className="text-muted-foreground text-sm">
            Total admin yang memiliki akses penuh sistem.
          </p>
          <div className="text-3xl font-bold mt-2 text-purple-400">{adminCount ?? 0}</div>
        </Card>

       
        <Card className="relative overflow-hidden p-5 rounded-2xl shadow-sm bg-card border-none flex flex-col gap-2">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-500/40 rounded-full blur-3xl pointer-events-none" />
          <CardTitle className="text-lg font-medium">Kasir</CardTitle>
          <p className="text-muted-foreground text-sm">
            Total kasir yang menangani transaksi pelanggan.
          </p>
          <div className="text-3xl font-bold mt-2 text-green-400">{kasirCount ?? 0}</div>
        </Card>

        
        <Card className="relative overflow-hidden p-5 rounded-2xl shadow-sm bg-card border-none flex flex-col gap-2">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-500/40 rounded-full blur-3xl pointer-events-none" />
          <CardTitle className="text-lg font-medium">Owner</CardTitle>
          <p className="text-muted-foreground text-sm">
            Total owner yang mengawasi operasional laundry.
          </p>
          <div className="text-3xl font-bold mt-2 text-yellow-400">{ownerCount ?? 0}</div>
        </Card>

        
        <Card className="relative overflow-hidden p-5 rounded-2xl shadow-sm bg-card border-none flex flex-col gap-2">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/40 rounded-full blur-3xl pointer-events-none" />
          <CardTitle className="text-lg font-medium">Pengguna</CardTitle>
          <p className="text-muted-foreground text-sm">
            Total pelanggan yang menggunakan layanan laundry.
          </p>
          <div className="text-3xl font-bold mt-2 text-blue-400">{userCount ?? 0}</div>
        </Card>
      </div>
    </div>
  );
}
