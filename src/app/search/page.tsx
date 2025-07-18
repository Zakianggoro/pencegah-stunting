"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, User, Calendar, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedChild, setSelectedChild] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)

  // Mock database - in real app, this would come from database
  const mockDatabase = [
    {
      nik: "3201234567890123",
      name: "Andi Pratama",
      parentName: "Budi Pratama",
      birthDate: "2022-03-15",
      gender: "L",
      entries: [
        {
          date: "2024-01-15",
          age: "22 bulan",
          height: 85.5,
          weight: 12.3,
          status: "Normal",
          posyandu: "Posyandu 1",
          zScoreHeight: -0.5,
          zScoreWeight: 0.2,
        },
        {
          date: "2023-12-20",
          age: "21 bulan",
          height: 84.8,
          weight: 12.0,
          status: "Normal",
          posyandu: "Posyandu 1",
          zScoreHeight: -0.6,
          zScoreWeight: 0.1,
        },
        {
          date: "2023-11-15",
          age: "20 bulan",
          height: 84.0,
          weight: 11.8,
          status: "Normal",
          posyandu: "Posyandu 1",
          zScoreHeight: -0.7,
          zScoreWeight: 0.0,
        },
        {
          date: "2023-10-18",
          age: "19 bulan",
          height: 83.2,
          weight: 11.5,
          status: "Normal",
          posyandu: "Posyandu 1",
          zScoreHeight: -0.8,
          zScoreWeight: -0.1,
        },
      ],
    },
    {
      nik: "3201234567890124",
      name: "Sari Indah",
      parentName: "Dewi Sari",
      birthDate: "2022-08-20",
      gender: "P",
      entries: [
        {
          date: "2024-01-12",
          age: "17 bulan",
          height: 75.2,
          weight: 8.9,
          status: "Stunting",
          posyandu: "Sukorejo",
          zScoreHeight: -2.3,
          zScoreWeight: -1.1,
        },
        {
          date: "2023-12-18",
          age: "16 bulan",
          height: 74.5,
          weight: 8.7,
          status: "Stunting",
          posyandu: "Sukorejo",
          zScoreHeight: -2.4,
          zScoreWeight: -1.2,
        },
        {
          date: "2023-11-12",
          age: "15 bulan",
          height: 73.8,
          weight: 8.5,
          status: "Stunting",
          posyandu: "Sukorejo",
          zScoreHeight: -2.5,
          zScoreWeight: -1.3,
        },
      ],
    },
    {
      nik: "3201234567890125",
      name: "Budi Santoso",
      parentName: "Santi Budiarti",
      birthDate: "2021-02-10",
      gender: "L",
      entries: [
        {
          date: "2024-01-10",
          age: "35 bulan",
          height: 92.1,
          weight: 14.2,
          status: "Normal",
          posyandu: "Posyandu 2",
          zScoreHeight: 0.1,
          zScoreWeight: 0.5,
        },
        {
          date: "2023-12-15",
          age: "34 bulan",
          height: 91.2,
          weight: 13.8,
          status: "Normal",
          posyandu: "Posyandu 2",
          zScoreHeight: 0.0,
          zScoreWeight: 0.3,
        },
      ],
    },
    {
      nik: "3201234567890126",
      name: "Maya Sari",
      parentName: "Rina Maya",
      birthDate: "2021-11-05",
      gender: "P",
      entries: [
        {
          date: "2024-01-08",
          age: "26 bulan",
          height: 82.3,
          weight: 10.8,
          status: "Stunting",
          posyandu: "Tekik",
          zScoreHeight: -2.1,
          zScoreWeight: -0.8,
        },
        {
          date: "2023-12-12",
          age: "25 bulan",
          height: 81.5,
          weight: 10.5,
          status: "Stunting",
          posyandu: "Tekik",
          zScoreHeight: -2.2,
          zScoreWeight: -0.9,
        },
      ],
    },
  ]

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("Masukkan nama atau NIK untuk mencari")
      return
    }

    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      const results = mockDatabase.filter(
        (child) =>
          child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          child.nik.includes(searchTerm) ||
          child.parentName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setSearchResults(results)
      setSelectedChild(null)
      setIsSearching(false)
    }, 500)
  }

  const handleSelectChild = (child: any) => {
    setSelectedChild(child)
  }

  const calculateGrowthTrend = (entries: any[]) => {
    if (entries.length < 2) return "Tidak cukup data"

    const latest = entries[0]
    const previous = entries[1]

    const heightGrowth = latest.height - previous.height
    const weightGrowth = latest.weight - previous.weight

    return {
      height: heightGrowth > 0 ? "Naik" : heightGrowth < 0 ? "Turun" : "Stabil",
      weight: weightGrowth > 0 ? "Naik" : weightGrowth < 0 ? "Turun" : "Stabil",
      heightValue: heightGrowth.toFixed(1),
      weightValue: weightGrowth.toFixed(1),
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pencarian Data Anak</h1>
          <p className="text-gray-600">Cari dan lihat semua riwayat pemeriksaan anak berdasarkan nama atau NIK</p>
        </div>

        {/* Search Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pencarian</CardTitle>
            <CardDescription>Masukkan nama anak, nama orang tua, atau NIK</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Contoh: Andi Pratama atau 3201234567890123"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? (
                  "Mencari..."
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Cari
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Hasil Pencarian</CardTitle>
              <CardDescription>Ditemukan {searchResults.length} anak</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {searchResults.map((child, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedChild?.nik === child.nik ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleSelectChild(child)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-lg">{child.name}</div>
                        <div className="text-sm text-gray-500">
                          NIK: {child.nik} • Orang Tua: {child.parentName}
                        </div>
                        <div className="text-sm text-gray-500">
                          Lahir: {new Date(child.birthDate).toLocaleDateString("id-ID")} • Jenis Kelamin:{" "}
                          {child.gender === "L" ? "Laki-laki" : "Perempuan"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{child.entries.length} Pemeriksaan</div>
                        <div className="text-xs text-gray-500">Klik untuk lihat detail</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Results */}
        {searchResults.length === 0 && searchTerm && !isSearching && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Tidak ditemukan data untuk "{searchTerm}"</p>
              <p className="text-sm text-gray-400 mt-2">Coba gunakan nama lengkap atau NIK yang tepat</p>
            </CardContent>
          </Card>
        )}

        {/* Child Details */}
        {selectedChild && (
          <div className="space-y-6">
            {/* Child Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informasi Anak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Nama Lengkap</label>
                      <p className="text-lg font-medium">{selectedChild.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">NIK</label>
                      <p className="font-mono">{selectedChild.nik}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Nama Orang Tua</label>
                      <p>{selectedChild.parentName}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Tanggal Lahir</label>
                      <p>{new Date(selectedChild.birthDate).toLocaleDateString("id-ID")}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Jenis Kelamin</label>
                      <p>{selectedChild.gender === "L" ? "Laki-laki" : "Perempuan"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Total Pemeriksaan</label>
                      <p className="font-medium">{selectedChild.entries.length} kali</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pertumbuhan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-700">Status Terkini</div>
                    <div
                      className={`text-lg font-bold ${
                        selectedChild.entries[0].status === "Normal" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {selectedChild.entries[0].status}
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm font-medium text-green-700">Tinggi Badan Terkini</div>
                    <div className="text-lg font-bold text-green-600">
                      {selectedChild.entries[0].height} cm
                      {selectedChild.entries.length > 1 && (
                        <span className="text-sm ml-2">
                          {calculateGrowthTrend(selectedChild.entries).height === "Naik" ? (
                            <TrendingUp className="inline h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="inline h-4 w-4 text-red-500" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="text-sm font-medium text-orange-700">Berat Badan Terkini</div>
                    <div className="text-lg font-bold text-orange-600">
                      {selectedChild.entries[0].weight} kg
                      {selectedChild.entries.length > 1 && (
                        <span className="text-sm ml-2">
                          {calculateGrowthTrend(selectedChild.entries).weight === "Naik" ? (
                            <TrendingUp className="inline h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="inline h-4 w-4 text-red-500" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* History Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Riwayat Pemeriksaan
                </CardTitle>
                <CardDescription>Semua data pemeriksaan dari yang terbaru</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedChild.entries.map((entry: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-lg">
                              {new Date(entry.date).toLocaleDateString("id-ID")}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                entry.status === "Normal" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {entry.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Usia:</span>
                              <div className="font-medium">{entry.age}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Tinggi:</span>
                              <div className="font-medium">{entry.height} cm</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Berat:</span>
                              <div className="font-medium">{entry.weight} kg</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Posyandu:</span>
                              <div className="font-medium">{entry.posyandu}</div>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Z-Score TB/U: {entry.zScoreHeight} • Z-Score BB/TB: {entry.zScoreWeight}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Initial State */}
        {!searchTerm && searchResults.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 mb-2">Masukkan nama atau NIK untuk mencari data anak</p>
              <p className="text-sm text-gray-400">
                Anda dapat mencari berdasarkan nama anak, nama orang tua, atau NIK
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
