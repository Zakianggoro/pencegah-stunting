"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Calendar, Plus, Search } from "lucide-react"
import { TutorialButton } from "@/features/dashboard/components/tutorial-button"
import { useDashboard } from "@/features/dashboard/hooks/dashboard"
import { useMemo, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"

const StatCard = ({
  title,
  icon,
  value,
  subtitle,
  color = "text-gray-800",
}: {
  title: string
  icon: React.ReactNode
  value: string | number
  subtitle: string
  color?: string
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </CardContent>
  </Card>
)

const ActionCard = ({
  icon,
  title,
  description,
  href,
  buttonText,
  variant = "default", // Default variant is now solid
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  buttonText: string
  variant?: "default" | "outline"
}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(() => {
      router.push(href)
    })
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon} {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full"
          size="lg"
          variant={variant} // This will now default to "default" (solid)
          onClick={handleClick}
          disabled={isPending}
        >
          {isPending ? "Memuat..." : buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  const { data } = useDashboard()
  const router = useRouter()

  useEffect(() => {
    router.prefetch("/input")
    router.prefetch("/history")
    router.prefetch("/search")
  }, [router])

  const totalBalita = useMemo(() => {
    return (data?.stats.kasus_stunting ?? 0) + (data?.stats.status_normal ?? 0)
  }, [data])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Pencegah Stunting</h1>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">MMD FILKOM 2025 - Kelompok 11</p>
            </div>
          </div>
          <p className="text-gray-600">Sistem Monitoring Stunting untuk Posyandu</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Balita"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            value={totalBalita}
            subtitle="Terdaftar dalam sistem"
          />
          <StatCard
            title="Kasus Stunting"
            icon={<TrendingUp className="h-4 w-4 text-red-500" />}
            value={data?.stats.kasus_stunting ?? 0}
            subtitle={`${data?.stats.persentase_stunting ?? 0}% dari total balita`}
            color="text-red-600"
          />
          <StatCard
            title="Status Normal"
            icon={<TrendingUp className="h-4 w-4 text-green-500" />}
            value={data?.stats.status_normal ?? 0}
            subtitle={`${data?.stats.persentase_normal?.toFixed(1) ?? 0}% dari total balita`}
            color="text-green-600"
          />
          <StatCard
            title="Bulan Ini"
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
            value={data?.stats.bulan_ini ?? 0}
            subtitle="Pemeriksaan baru"
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard
            icon={<Plus className="h-5 w-5 text-blue-600" />}
            title="Input Data Balita"
            description="Masukkan data tinggi dan berat badan untuk deteksi otomatis"
            href="/input"
            buttonText="Mulai Input Data"
          />
          <ActionCard
            icon={<Calendar className="h-5 w-5 text-green-600" />}
            title="Lihat Data Historis"
            description="Bandingkan bulan sekarang dengan sebelumnya"
            href="/history"
            buttonText="Lihat Riwayat Data"
            // Removed variant="outline" to make it solid
          />
          <ActionCard
            icon={<Search className="h-5 w-5 text-purple-600" />}
            title="Cari Data Anak"
            description="Cari berdasarkan nama atau NIK"
            href="/search"
            buttonText="Mulai Pencarian"
            // Removed variant="outline" to make it solid
          />
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Pemeriksaan stunting yang baru dilakukan</CardDescription>
          </CardHeader>
          <CardContent className="h-[500px] overflow-y-auto">
            <div className="space-y-4">
              {data?.aktivitas_terbaru?.length ? (
                data.aktivitas_terbaru.map((child: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{child.balita.nama}</div>
                      <div className="text-sm text-gray-500">
                        NIK: {child.balita.nik} • Orang Tua: {child.balita.nama_orang_tua}
                      </div>
                      <div className="text-sm text-gray-500">
                        Posyandu: {child.balita.posyandu.nama_posyandu} • Usia: {child.usia_bulan} bulan
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          child.status_stunting === "NORMAL" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {child.status_stunting}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(child.tanggal_pemeriksaan).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Belum ada aktivitas terbaru.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tutorial Button */}
      <TutorialButton />
    </div>
  )
}
