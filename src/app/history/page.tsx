"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, TrendingDown, TrendingUp, Download, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useDashboard } from "@/features/dashboard/hooks/dashboard"
import { groupByMonth, MONTH_OPTIONS } from "@/features/balita/utils/group-by-month"
import { format } from "date-fns"
import { useDeletePemeriksaan } from "@/features/pemeriksaan/hooks/pemeriksaan"

export default function HistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState(() => format(new Date(), "yyyy-MM"))
  const [searchTerm, setSearchTerm] = useState("")

  const { data: DashboardData } = useDashboard()
  const { mutate: handleDelete } = useDeletePemeriksaan()

  const historicalData = useMemo(() => {
    if (!DashboardData) return {}
    return groupByMonth(DashboardData.aktivitas_terbaru)
  }, [DashboardData])

  const currentData = historicalData[selectedMonth] || []

  // Function to convert age format from "X tahun Y bulan" to just months
  const convertToMonths = (ageString: string): string => {
    if (!ageString) return "0"

    // Extract years and months from string like "2 tahun 3 bulan"
    const yearMatch = ageString.match(/(\d+)\s*tahun/)
    const monthMatch = ageString.match(/(\d+)\s*bulan/)

    const years = yearMatch ? Number.parseInt(yearMatch[1]) : 0
    const months = monthMatch ? Number.parseInt(monthMatch[1]) : 0

    const totalMonths = years * 12 + months
    return totalMonths.toString()
  }

  const onDelete = (nik: string, tanggal: string) => {
    const pemeriksaan = DashboardData?.aktivitas_terbaru.find(
      (item) => item.balita.nik === nik && item.tanggal_pemeriksaan.startsWith(tanggal),
    )

    if (!pemeriksaan) {
      console.error("Pemeriksaan tidak ditemukan")
      return
    }

    const confirmDelete = window.confirm(
      `Apakah Anda yakin ingin menghapus data pemeriksaan ${pemeriksaan.balita.nama} (NIK: ${nik}) pada tanggal ${tanggal}?\n\nTindakan ini tidak dapat dibatalkan.`,
    )

    if (confirmDelete) {
      handleDelete({ id: String(pemeriksaan.id) })
    }
  }

  const stats = {
    total: currentData.length,
    stunting: currentData.filter((child) => child.status === "Stunting").length,
    normal: currentData.filter((child) => child.status === "Normal").length,
  }

  const filteredData = currentData.filter(
    (child) => child.name.toLowerCase().includes(searchTerm.toLowerCase()) || child.nik.includes(searchTerm),
  )

  const exportToCSV = () => {
    if (currentData.length === 0) {
      alert("Tidak ada data untuk diekspor")
      return
    }

    const headers = [
      "NIK",
      "Nama Anak",
      "Nama Orang Tua",
      "Posyandu",
      "Usia (bulan)",
      "Tinggi Badan (cm)",
      "Berat Badan (kg)",
      "Status Stunting",
      "Tanggal Pemeriksaan",
    ]

    const csvContent = [
      headers.join(","),
      ...currentData.map((child) =>
        [
          child.nik,
          `"${child.name}"`,
          `"${child.parentName}"`,
          `"${child.posyandu}"`,
          convertToMonths(child.age),
          child.height,
          child.weight,
          child.status,
          child.date,
        ].join(","),
      ),
    ].join("\n")

    // Add BOM for proper UTF-8 encoding in Excel
    const BOM = "\uFEFF"
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `data-stunting-${selectedMonth}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Historis</h1>
          <p className="text-gray-600">Lihat dan bandingkan data stunting dari bulan sebelumnya</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih bulan" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTH_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari nama atau NIK..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pemeriksaan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Bulan {selectedMonth}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kasus Stunting</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.stunting}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? ((stats.stunting / stats.total) * 100).toFixed(1) : "0"}% dari total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status Normal</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.normal}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? ((stats.normal / stats.total) * 100).toFixed(1) : "0"}% dari total
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Data Balita - {selectedMonth}</CardTitle>
                <CardDescription>
                  Menampilkan {filteredData.length} dari {stats.total} data balita
                </CardDescription>
              </div>
              <Button
                onClick={exportToCSV}
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
                disabled={currentData.length === 0}
              >
                <Download className="h-4 w-4" />
                Cetak CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[500px] overflow-y-auto">
            {filteredData.length > 0 ? (
              <div className="space-y-4">
                {filteredData.map((child, index) => (
                  <div key={`${child.nik}-${child.date}-${index}`} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-medium text-lg">{child.name}</div>
                        <div className="text-sm text-gray-500 space-y-1">
                          <div>NIK: {child.nik}</div>
                          <div>Orang Tua: {child.parentName}</div>
                          <div>Posyandu: {child.posyandu}</div>
                          <div>Usia: {convertToMonths(child.age)} bulan</div>
                          <div>
                            TB: {child.height} cm • BB: {child.weight} kg
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            child.status === "Normal" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {child.status}
                        </span>
                        <span className="text-sm text-gray-500">{child.date}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(child.nik, child.date)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Tidak ada data yang ditemukan untuk kriteria pencarian ini</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
