import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Calendar, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  // Mock data - in real app, this would come from database
  const stats = {
    totalChildren: 156,
    stuntingCases: 23,
    normalCases: 133,
    thisMonth: 45,
  }

  const stuntingPercentage = ((stats.stuntingCases / stats.totalChildren) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pencegah Stunting</h1>
          <p className="text-gray-600">Sistem Monitoring Stunting untuk Posyandu</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balita</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalChildren}</div>
              <p className="text-xs text-muted-foreground">Terdaftar dalam sistem</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kasus Stunting</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.stuntingCases}</div>
              <p className="text-xs text-muted-foreground">{stuntingPercentage}% dari total balita</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status Normal</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.normalCases}</div>
              <p className="text-xs text-muted-foreground">
                {(100 - Number.parseFloat(stuntingPercentage)).toFixed(1)}% dari total balita
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bulan Ini</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisMonth}</div>
              <p className="text-xs text-muted-foreground">Pemeriksaan baru</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Input Data Balita
              </CardTitle>
              <CardDescription>
                Masukkan data tinggi badan dan berat badan balita untuk deteksi stunting otomatis
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
                Bandingkan data bulan sekarang dengan bulan sebelumnya untuk analisis trend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/history">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
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
              <CardDescription>Cari dan lihat semua riwayat pemeriksaan anak berdasarkan nama atau NIK</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/search">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  Mulai Pencarian
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Pemeriksaan stunting yang baru dilakukan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  nik: "3201234567890123",
                  name: "Andi Pratama",
                  parentName: "Budi Pratama",
                  posyandu: "Posyandu 1",
                  age: "2 tahun 3 bulan",
                  status: "Normal",
                  date: "Hari ini, 14:30",
                },
                {
                  nik: "3201234567890124",
                  name: "Sari Indah",
                  parentName: "Dewi Sari",
                  posyandu: "Sukorejo",
                  age: "1 tahun 8 bulan",
                  status: "Stunting",
                  date: "Hari ini, 13:45",
                },
                {
                  nik: "3201234567890125",
                  name: "Budi Santoso",
                  parentName: "Santi Budiarti",
                  posyandu: "Posyandu 2",
                  age: "3 tahun 1 bulan",
                  status: "Normal",
                  date: "Hari ini, 11:20",
                },
              ].map((child, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{child.name}</div>
                    <div className="text-sm text-gray-500">
                      NIK: {child.nik} • Orang Tua: {child.parentName}
                    </div>
                    <div className="text-sm text-gray-500">
                      Posyandu: {child.posyandu} • Usia: {child.age}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        child.status === "Normal" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {child.status}
                    </span>
                    <span className="text-sm text-gray-500">{child.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
