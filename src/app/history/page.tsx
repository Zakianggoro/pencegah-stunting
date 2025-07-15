"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, TrendingDown, TrendingUp, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState("2024-01")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock historical data
  const historicalData = {
    "2024-01": [
      {
        nik: "3201234567890123",
        name: "Andi Pratama",
        parentName: "Budi Pratama",
        posyandu: "Posyandu 1",
        age: "2 tahun 3 bulan",
        height: 85.5,
        weight: 12.3,
        status: "Normal",
        date: "2024-01-15",
      },
      {
        nik: "3201234567890124",
        name: "Sari Indah",
        parentName: "Dewi Sari",
        posyandu: "Sukorejo",
        age: "1 tahun 8 bulan",
        height: 75.2,
        weight: 8.9,
        status: "Stunting",
        date: "2024-01-12",
      },
      {
        nik: "3201234567890125",
        name: "Budi Santoso",
        parentName: "Santi Budiarti",
        posyandu: "Posyandu 2",
        age: "3 tahun 1 bulan",
        height: 92.1,
        weight: 14.2,
        status: "Normal",
        date: "2024-01-10",
      },
      {
        nik: "3201234567890126",
        name: "Maya Sari",
        parentName: "Rina Maya",
        posyandu: "Tekik",
        age: "2 tahun 6 bulan",
        height: 82.3,
        weight: 10.8,
        status: "Stunting",
        date: "2024-01-08",
      },
      {
        nik: "3201234567890127",
        name: "Rudi Hartono",
        parentName: "Hartono Wijaya",
        posyandu: "Posyandu 1",
        age: "4 tahun 2 bulan",
        height: 98.7,
        weight: 16.5,
        status: "Normal",
        date: "2024-01-05",
      },
    ],
    "2023-12": [
      {
        nik: "3201234567890123",
        name: "Andi Pratama",
        parentName: "Budi Pratama",
        posyandu: "Posyandu 1",
        age: "2 tahun 2 bulan",
        height: 84.8,
        weight: 12.0,
        status: "Normal",
        date: "2023-12-20",
      },
      {
        nik: "3201234567890124",
        name: "Sari Indah",
        parentName: "Dewi Sari",
        posyandu: "Sukorejo",
        age: "1 tahun 7 bulan",
        height: 74.5,
        weight: 8.7,
        status: "Stunting",
        date: "2023-12-18",
      },
      {
        nik: "3201234567890125",
        name: "Budi Santoso",
        parentName: "Santi Budiarti",
        posyandu: "Posyandu 2",
        age: "3 tahun",
        height: 91.2,
        weight: 13.8,
        status: "Normal",
        date: "2023-12-15",
      },
    ],
  }

  const currentData = historicalData[selectedMonth as keyof typeof historicalData] || []
  const filteredData = currentData.filter(
    (child) => child.name.toLowerCase().includes(searchTerm.toLowerCase()) || child.nik.includes(searchTerm),
  )

  const stats = {
    total: currentData.length,
    stunting: currentData.filter((child) => child.status === "Stunting").length,
    normal: currentData.filter((child) => child.status === "Normal").length,
  }

  const stuntingPercentage = stats.total > 0 ? ((stats.stunting / stats.total) * 100).toFixed(1) : "0"

  const exportToCSV = () => {
    const headers = [
      "NIK",
      "Nama Anak",
      "Nama Orang Tua",
      "Posyandu",
      "Usia",
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
          `"${child.age}"`,
          child.height,
          child.weight,
          child.status,
          child.date,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `data-stunting-${selectedMonth}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Historis</h1>
          <p className="text-gray-600">Lihat dan bandingkan data stunting dari bulan sebelumnya</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih bulan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-01">Januari 2024</SelectItem>
                    <SelectItem value="2023-12">Desember 2023</SelectItem>
                    <SelectItem value="2023-11">November 2023</SelectItem>
                    <SelectItem value="2023-10">Oktober 2023</SelectItem>
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

        {/* Stats for selected month */}
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
              <p className="text-xs text-muted-foreground">{stuntingPercentage}% dari total</p>
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
                {(100 - Number.parseFloat(stuntingPercentage)).toFixed(1)}% dari total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Data Balita - {selectedMonth}</CardTitle>
                <CardDescription>
                  Menampilkan {filteredData.length} dari {stats.total} data balita
                </CardDescription>
              </div>
              <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Cetak CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {filteredData.length > 0 ? (
              <div className="space-y-4">
                {filteredData.map((child, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-medium text-lg">{child.name}</div>
                        <div className="text-sm text-gray-500 space-y-1">
                          <div>NIK: {child.nik}</div>
                          <div>Orang Tua: {child.parentName}</div>
                          <div>Posyandu: {child.posyandu}</div>
                          <div>Usia: {child.age}</div>
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
