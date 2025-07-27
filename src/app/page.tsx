"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Calendar, Plus, Search } from "lucide-react";
import Link from "next/link";
import { TutorialButton } from "@/components/tutorial-button"
import { useDashboard } from "@/features/dashboard/hooks/dashboard";

export default function Dashboard() {
  const { data } = useDashboard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-4xl font-bold text-gray-900">
              Pencegah Stunting
            </h1>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">
                MMD FILKOM 2025 - 11
              </p>
            </div>
          </div>
          <p className="text-gray-600">
            Sistem Monitoring Stunting untuk Posyandu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Balita
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(data?.stats.kasus_stunting ?? 0) + (data?.stats.status_normal ?? 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Terdaftar dalam sistem
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Kasus Stunting
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {data?.stats.kasus_stunting}
              </div>
              <p className="text-xs text-muted-foreground">
                {data?.stats.persentase_stunting}% dari total balita
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Status Normal
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {data?.stats.status_normal}
              </div>
              <p className="text-xs text-muted-foreground">
                {data?.stats.persentase_normal.toFixed(1)}% dari total balita
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bulan Ini</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.stats.bulan_ini}</div>
              <p className="text-xs text-muted-foreground">Pemeriksaan baru</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Input Data Balita
              </CardTitle>
              <CardDescription>
                Masukkan data tinggi badan dan berat badan balita untuk deteksi
                stunting otomatis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/input">
                <Button className="w-full" size="lg">
                  Mulai Input Data
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Lihat Data Historis
              </CardTitle>
              <CardDescription>
                Bandingkan data bulan sekarang dengan bulan sebelumnya untuk
                analisis trend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/history">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="lg"
                >
                  Lihat Riwayat Data
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-purple-600" />
                Cari Data Anak
              </CardTitle>
              <CardDescription>
                Cari dan lihat semua riwayat pemeriksaan anak berdasarkan nama
                atau NIK
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/search">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="lg"
                >
                  Mulai Pencarian
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>
              Pemeriksaan stunting yang baru dilakukan
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[500px] overflow-y-auto">
            <div className="space-y-4">
              {data?.aktivitas_terbaru?.map((child : any, index : number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium">{child.balita.nama}</div>
                    <div className="text-sm text-gray-500">
                      NIK: {child.balita.nik} • Orang Tua:{" "}
                      {child.balita.nama_orang_tua}
                    </div>
                    <div className="text-sm text-gray-500">
                      Posyandu: {child.balita.posyandu.nama_posyandu} • Usia:{" "}
                      {child.usia_bulan} bulan
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        child.status_stunting === "NORMAL"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {child.status_stunting}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(child.tanggal_pemeriksaan).toLocaleDateString(
                        "id-ID"
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tutorial Button */}
      <TutorialButton />
    </div>
  );
}
