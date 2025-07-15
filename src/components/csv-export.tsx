"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ChildData {
  nik: string
  name: string
  parentName: string
  posyandu: string
  age: string
  height: number
  weight: number
  status: string
  date: string
}

interface CSVExportProps {
  data: ChildData[]
  filename: string
  month: string
}

export function CSVExport({ data, filename, month }: CSVExportProps) {
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
      ...data.map((child) =>
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

    // Add BOM for proper UTF-8 encoding in Excel
    const BOM = "\uFEFF"
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })

    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2 bg-transparent">
      <Download className="h-4 w-4" />
      Cetak CSV
    </Button>
  )
}
