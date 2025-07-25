"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calculator, Save } from "lucide-react"
import Link from "next/link"
import { calculateStuntingStatus } from "@/lib/stunting-calculator"

export default function FollowUpInputPage() {
  const [formData, setFormData] = useState({
    nik: "",
    posyandu: "",
    examDate: "",
    height: "",
    weight: "",
  })

  const [result, setResult] = useState<{
    status: string
    heightForAge: string
    weightForHeight: string
    recommendation: string
  } | null>(null)

  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateAge = (birthDate: string, examDate: string) => {
    const birth = new Date(birthDate)
    const exam = new Date(examDate)
    const ageInMonths = (exam.getFullYear() - birth.getFullYear()) * 12 + (exam.getMonth() - birth.getMonth())
    return ageInMonths
  }

  const handleCalculate = () => {
    if (!formData.nik || !formData.examDate || !formData.height || !formData.weight) {
      alert("Mohon lengkapi semua data yang diperlukan")
      return
    }

    setIsCalculating(true)

    // Simulate calculation delay
    setTimeout(() => {
      // For demo purposes, we'll use a default age calculation
      // In real app, this would fetch birth date from database using NIK
      const defaultAge = 24 // months - this would come from database
      const height = Number.parseFloat(formData.height)
      const weight = Number.parseFloat(formData.weight)
      const defaultGender = "male" // this would come from database

      const calculationResult = calculateStuntingStatus(defaultAge, height, weight, defaultGender)
      setResult(calculationResult)
      setIsCalculating(false)
    }, 1000)
  }

  const handleSave = () => {
    if (!formData.posyandu) {
      alert("Mohon pilih posyandu")
      return
    }

    if (!result) {
      alert("Hitung status stunting terlebih dahulu")
      return
    }

    // In real app, this would save updated data to database
    alert("Data terbaru berhasil disimpan!")

    // Reset form
    setFormData({
      nik: "",
      posyandu: "",
      examDate: "",
      height: "",
      weight: "",
    })
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/input" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Input Data
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Data Balita</h1>
          <p className="text-gray-600">Input pemeriksaan terbaru untuk anak yang sudah terdaftar</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Data Pemeriksaan Terbaru</CardTitle>
              <CardDescription>Masukkan data pemeriksaan terbaru untuk anak yang sudah terdaftar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nik">NIK Balita</Label>
                <Input
                  id="nik"
                  placeholder="Masukkan NIK 16 digit"
                  value={formData.nik}
                  onChange={(e) => handleInputChange("nik", e.target.value)}
                  maxLength={16}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="posyandu">Posyandu</Label>
                <Select value={formData.posyandu} onValueChange={(value) => handleInputChange("posyandu", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih posyandu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="posyandu-1">Posyandu 1</SelectItem>
                    <SelectItem value="posyandu-2">Posyandu 2</SelectItem>
                    <SelectItem value="sukorejo">Sukorejo</SelectItem>
                    <SelectItem value="tekik">Tekik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="examDate">Tanggal Pemeriksaan</Label>
                <Input
                  id="examDate"
                  type="date"
                  value={formData.examDate}
                  onChange={(e) => handleInputChange("examDate", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Tinggi Badan (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="0.0"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Berat Badan (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="0.0"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    step="0.1"
                  />
                </div>
              </div>

              <Button onClick={handleCalculate} className="w-full" size="lg" disabled={isCalculating}>
                {isCalculating ? (
                  "Menghitung..."
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Hitung Status Stunting
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Result */}
          <Card>
            <CardHeader>
              <CardTitle>Hasil Analisis Terbaru</CardTitle>
              <CardDescription>Status stunting dan rekomendasi untuk pemeriksaan terbaru</CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* Status Badge */}
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
                        result.status === "Normal"
                          ? "bg-green-100 text-green-800 border-2 border-green-200"
                          : "bg-red-100 text-red-800 border-2 border-red-200"
                      }`}
                    >
                      {result.status}
                    </div>
                  </div>

                  {/* Measurements */}
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Tinggi Badan menurut Umur (TB/U)</h4>
                      <p className="text-sm text-gray-600">{result.heightForAge}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Berat Badan menurut Tinggi Badan (BB/TB)</h4>
                      <p className="text-sm text-gray-600">{result.weightForHeight}</p>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Rekomendasi</h4>
                    <p className="text-sm text-blue-800">{result.recommendation}</p>
                  </div>

                  {/* Save Button */}
                  <Button onClick={handleSave} className="w-full" size="lg">
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Data Terbaru
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Lengkapi data pemeriksaan dan klik "Hitung Status Stunting" untuk melihat hasil analisis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
