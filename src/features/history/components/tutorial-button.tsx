"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HelpCircle, X } from "lucide-react"
import Link from "next/link"

export function TutorialButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-64 border border-gray-200 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Butuh bantuan?</h3>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Halaman ini berguna untuk melihat riwayat pemeriksaan balita. Anda dapat memilih bulan untuk melihat data yang relevan. Gunakan tombol cetak untuk mencetak laporan pemeriksaan. Gunakan tombol hapus di samping kanan untuk menghapus pemeriksaan yang tidak diinginkan.
          </p>
        </div>
      ) : null}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg"
        aria-label="Tutorial"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
