"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import BalitaForm from "@/features/balita/components/balita-form";
import { RegisterBalitaResponse } from "@/features/balita/types/balita";
import ResultCard from "@/features/balita/components/result-card";

export default function InputPage() {
  const [result, setResult] = useState<RegisterBalitaResponse | null>(null);

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
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Input Data Balita
              </h1>
              <p className="text-gray-600">
                Masukkan data balita untuk deteksi stunting otomatis
              </p>
            </div>
            <Link href="/input/update">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
              >
                <Plus className="h-4 w-4" />
                Update Data
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BalitaForm onSuccess={(data) => setResult(data)} />
          <ResultCard result={result} />
        </div>
      </div>
    </div>
  );
}
