import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TutorialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tutorial Penggunaan</h1>
          <p className="text-gray-600">Panduan lengkap cara menggunakan aplikasi Pencegah Stunting</p>
        </div>

        {/* Tutorial Content */}
        <div className="space-y-8">
          {/* Section 1: Introduction */}
          <Card>
            <CardHeader>
              <CardTitle>Pengenalan Aplikasi</CardTitle>
              <CardDescription>Memahami tujuan dan fitur utama aplikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Apa itu Aplikasi Pencegah Stunting?</h3>
                <p className="text-blue-700">
                  Aplikasi Pencegah Stunting adalah sistem monitoring untuk membantu petugas posyandu dalam mendeteksi
                  dan mencegah stunting pada balita. Aplikasi ini menggunakan standar WHO untuk menghitung status
                  stunting berdasarkan tinggi badan, berat badan, usia, dan jenis kelamin anak.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Fitur Utama:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Input data balita baru</li>
                  <li>Update data pemeriksaan terbaru</li>
                  <li>Deteksi stunting otomatis</li>
                  <li>Lihat riwayat pemeriksaan</li>
                  <li>Pencarian data anak</li>
                  <li>Export data ke CSV</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Input Data */}
          <Card>
            <CardHeader>
              <CardTitle>Cara Input Data Balita Baru</CardTitle>
              <CardDescription>Langkah-langkah mendaftarkan balita baru ke sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Langkah 1: Akses Halaman Input</h4>
                  <p className="text-sm text-gray-600">
                    Dari Dashboard, klik tombol "Mulai Input Data" pada kartu "Input Data Balita".
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Langkah 2: Isi Data Lengkap</h4>
                  <p className="text-sm text-gray-600">
                    Lengkapi semua field yang diperlukan: NIK, Nama Lengkap, Nama Orang Tua, Posyandu, Tanggal Lahir,
                    Jenis Kelamin, Tinggi Badan, dan Berat Badan.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Langkah 3: Hitung Status Stunting</h4>
                  <p className="text-sm text-gray-600">
                    Klik tombol "Hitung Status Stunting" untuk mendapatkan hasil analisis berdasarkan data yang
                    dimasukkan.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Langkah 4: Simpan Data</h4>
                  <p className="text-sm text-gray-600">
                    Setelah hasil analisis muncul, klik tombol "Simpan Data" untuk menyimpan data balita ke database.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">Penting!</h4>
                <p className="text-yellow-700">
                  Form Input Data Balita hanya digunakan <strong>satu kali</strong> untuk setiap anak. Untuk pemeriksaan
                  berikutnya, gunakan fitur "Update Data".
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Update Data */}
          <Card>
            <CardHeader>
              <CardTitle>Cara Update Data Pemeriksaan</CardTitle>
              <CardDescription>Langkah-langkah menambahkan data pemeriksaan terbaru</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Langkah 1: Akses Halaman Update</h4>
                  <p className="text-sm text-gray-600">
                    Dari halaman Input Data, klik tombol "Update Data" di pojok kanan atas.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Langkah 2: Masukkan NIK</h4>
                  <p className="text-sm text-gray-600">
                    Masukkan NIK balita yang sudah terdaftar sebelumnya di sistem.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Langkah 3: Isi Data Pemeriksaan</h4>
                  <p className="text-sm text-gray-600">
                    Pilih posyandu, masukkan tanggal pemeriksaan, tinggi badan, dan berat badan terbaru.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Langkah 4: Hitung dan Simpan</h4>
                  <p className="text-sm text-gray-600">
                    Klik "Hitung Status Stunting" dan kemudian "Simpan Data Terbaru" untuk menyimpan pemeriksaan.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Tips!</h4>
                <p className="text-green-700">
                  Anda dapat menambahkan data pemeriksaan berkali-kali untuk anak yang sama menggunakan fitur Update
                  Data. Ini memungkinkan Anda melacak pertumbuhan anak dari waktu ke waktu.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: View History */}
          <Card>
            <CardHeader>
              <CardTitle>Cara Melihat Riwayat Data</CardTitle>
              <CardDescription>Langkah-langkah melihat dan menganalisis data historis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Langkah 1: Akses Halaman Riwayat</h4>
                  <p className="text-sm text-gray-600">
                    Dari Dashboard, klik tombol "Lihat Riwayat Data" pada kartu "Lihat Data Historis".
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Langkah 2: Filter Data</h4>
                  <p className="text-sm text-gray-600">
                    Gunakan dropdown untuk memilih bulan dan tahun yang ingin dilihat. Anda juga dapat mencari
                    berdasarkan nama atau NIK.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Langkah 3: Export Data</h4>
                  <p className="text-sm text-gray-600">
                    Klik tombol "Cetak CSV" untuk mengunduh data dalam format CSV yang dapat dibuka di Excel.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Search */}
          <Card>
            <CardHeader>
              <CardTitle>Cara Mencari Data Anak</CardTitle>
              <CardDescription>Langkah-langkah mencari dan melihat riwayat anak tertentu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Langkah 1: Akses Halaman Pencarian</h4>
                  <p className="text-sm text-gray-600">
                    Dari Dashboard, klik tombol "Mulai Pencarian" pada kartu "Cari Data Anak".
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Langkah 2: Masukkan Kata Kunci</h4>
                  <p className="text-sm text-gray-600">
                    Masukkan nama anak, nama orang tua, atau NIK pada kolom pencarian dan klik "Cari".
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Langkah 3: Lihat Detail</h4>
                  <p className="text-sm text-gray-600">
                    Klik pada hasil pencarian untuk melihat detail lengkap dan riwayat pemeriksaan anak tersebut.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Pertanyaan Umum (FAQ)</CardTitle>
              <CardDescription>Jawaban untuk pertanyaan yang sering diajukan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Apa itu stunting?</h4>
                  <p className="text-sm text-gray-600">
                    Stunting adalah kondisi gagal tumbuh pada anak akibat kekurangan gizi kronis, ditandai dengan tinggi
                    badan yang lebih rendah dari standar usianya.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Bagaimana cara menghitung status stunting?</h4>
                  <p className="text-sm text-gray-600">
                    Aplikasi menggunakan standar WHO dengan menghitung Z-Score tinggi badan menurut umur (TB/U). Jika
                    Z-Score kurang dari -2, anak dikategorikan stunting.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Berapa kali sebaiknya anak diperiksa?</h4>
                  <p className="text-sm text-gray-600">
                    Untuk pemantauan optimal, anak sebaiknya diperiksa setiap bulan untuk usia 0-24 bulan dan setiap 3
                    bulan untuk usia 24-60 bulan.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Bagaimana jika NIK anak belum ada?</h4>
                  <p className="text-sm text-gray-600">
                    Untuk sementara, Anda dapat menggunakan nomor sementara dengan format khusus. Segera update dengan
                    NIK resmi ketika sudah tersedia.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
