"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  User,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BalitaSearchResponse } from "@/features/balita/types/balita";
import { useMutation } from "@tanstack/react-query";
import { searchBalita } from "@/features/balita/services/balita";

const calculateGrowthTrend = (entries: any[]) => {
  if (entries.length < 2) return { height: "Stabil", weight: "Stabil" };

  const latest = entries[0];
  const previous = entries[1];

  return {
    height: latest.tinggi_badan > previous.tinggi_badan ? "Naik" : "Turun",
    weight: latest.berat_badan > previous.berat_badan ? "Naik" : "Turun",
  };
};

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [selectedChild, setSelectedChild] =
    useState<BalitaSearchResponse | null>(null);

  const searchMutation = useMutation({
    mutationFn: searchBalita,
  });
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Masukkan nama atau NIK untuk mencari");
      return;
    }

    const isNIK = /^\d{16}$/.test(searchTerm.trim());
    const params = isNIK
      ? { nik: searchTerm.trim() }
      : { nama: searchTerm.trim() };

    await searchMutation.mutateAsync(params);
    setTriggerSearch(true);
    setSelectedChild(null);
  };

  const searchResults = searchMutation.data ?? [];
  const isFetching = searchMutation.isPending;

  const handleSelectChild = (child: BalitaSearchResponse) => {
    setSelectedChild(child);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pencarian Data Anak
          </h1>
          <p className="text-gray-600">
            Cari dan lihat semua riwayat pemeriksaan anak berdasarkan nama atau
            NIK
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pencarian</CardTitle>
            <CardDescription>
              Masukkan nama anak, nama orang tua, atau NIK
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Contoh: Andi Pratama atau 3201234567890123"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setTriggerSearch(false);
                    setSelectedChild(null);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={isFetching}>
                {isFetching ? (
                  "Mencari..."
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" /> Cari
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {triggerSearch && searchResults.length > 0 && !selectedChild && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Hasil Pencarian</CardTitle>
              <CardDescription>
                Ditemukan {searchResults.length} anak
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-y-auto h-[500px]">
              <div className="space-y-3">
                {searchResults.map((child, index) => (
                  <div
                    key={child.id}
                    className="p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
                    onClick={() => handleSelectChild(child)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-lg">{child.nama}</div>
                        <div className="text-sm text-gray-500">
                          NIK: {child.nik} • Orang Tua: {child.nama_orang_tua}
                        </div>
                        <div className="text-sm text-gray-500">
                          Lahir:{" "}
                          {new Date(child.tanggal_lahir).toLocaleDateString(
                            "id-ID"
                          )}{" "}
                          • Jenis Kelamin:{" "}
                          {child.jenis_kelamin === "M"
                            ? "Laki-laki"
                            : "Perempuan"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {child.total_pemeriksaan} Pemeriksaan
                        </div>
                        <div className="text-xs text-gray-500">
                          Klik untuk lihat detail
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {triggerSearch &&
          searchResults.length === 0 &&
          searchTerm &&
          !isFetching && (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">
                  Tidak ditemukan data untuk "{searchTerm}"
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Coba gunakan nama lengkap atau NIK yang tepat
                </p>
              </CardContent>
            </Card>
          )}

        {selectedChild && (
          <div className="space-y-6">
            <Button
              variant="outline"
              onClick={() => setSelectedChild(null)}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Hasil Pencarian
            </Button>

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
                      <label className="text-sm font-medium text-gray-500">
                        Nama Lengkap
                      </label>
                      <p className="text-lg font-medium">
                        {selectedChild.nama}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        NIK
                      </label>
                      <p className="font-mono">{selectedChild.nik}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Nama Orang Tua
                      </label>
                      <p>{selectedChild.nama_orang_tua}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Tanggal Lahir
                      </label>
                      <p>
                        {new Date(
                          selectedChild.tanggal_lahir
                        ).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Jenis Kelamin
                      </label>
                      <p>
                        {selectedChild.jenis_kelamin === "M"
                          ? "Laki-laki"
                          : "Perempuan"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Total Pemeriksaan
                      </label>
                      <p className="font-medium">
                        {selectedChild.total_pemeriksaan} kali
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pertumbuhan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-700">
                      Status Terkini
                    </div>
                    <div
                      className={`text-lg font-bold ${
                        selectedChild.status_terkini?.status_stunting ===
                        "NORMAL"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedChild.status_terkini
                        ? selectedChild.status_terkini.status_stunting ===
                          "NORMAL"
                          ? "Normal"
                          : "Stunting"
                        : "-"}
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm font-medium text-green-700">
                      Tinggi Badan Terkini
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {selectedChild.status_terkini?.tinggi_badan != null ? (
                        <>
                          {selectedChild.status_terkini.tinggi_badan} cm
                          {selectedChild.riwayat_pemeriksaan.length > 1 && (
                            <span className="text-sm ml-2">
                              {calculateGrowthTrend(
                                selectedChild.riwayat_pemeriksaan
                              ).height === "Naik" ? (
                                <TrendingUp className="inline h-4 w-4 text-green-500" />
                              ) : (
                                <TrendingDown className="inline h-4 w-4 text-red-500" />
                              )}
                            </span>
                          )}
                        </>
                      ) : (
                        "-"
                      )}
                    </div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="text-sm font-medium text-orange-700">
                      Berat Badan Terkini
                    </div>
                    <div className="text-lg font-bold text-orange-600">
                      {selectedChild.status_terkini?.berat_badan != null ? (
                        <>
                          {selectedChild.status_terkini.berat_badan} kg
                          {selectedChild.riwayat_pemeriksaan.length > 1 && (
                            <span className="text-sm ml-2">
                              {calculateGrowthTrend(
                                selectedChild.riwayat_pemeriksaan
                              ).weight === "Naik" ? (
                                <TrendingUp className="inline h-4 w-4 text-green-500" />
                              ) : (
                                <TrendingDown className="inline h-4 w-4 text-red-500" />
                              )}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">
                          Data tidak tersedia
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Riwayat Pemeriksaan
                </CardTitle>
                <CardDescription>
                  Semua data pemeriksaan dari yang terbaru
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedChild.riwayat_pemeriksaan.map((entry, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-lg">
                              {new Date(entry.tanggal).toLocaleDateString(
                                "id-ID"
                              )}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Usia:</span>
                              <div className="font-medium">
                                {selectedChild.usia_bulan} bulan
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Tinggi:</span>
                              <div className="font-medium">
                                {entry.tinggi_badan} cm
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Berat:</span>
                              <div className="font-medium">
                                {entry.berat_badan} kg
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Posyandu:</span>
                              <div className="font-medium">
                                {entry.posyandu}
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Z-Score TB/U: {entry.z_score_tb_u || "N/A"} •
                            Z-Score BB/TB: {entry.z_score_bb_tb || "N/A"}
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

        {!triggerSearch && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 mb-2">
                Masukkan nama atau NIK untuk mencari data anak
              </p>
              <p className="text-sm text-gray-400">
                Anda dapat mencari berdasarkan nama anak, nama orang tua, atau
                NIK
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
