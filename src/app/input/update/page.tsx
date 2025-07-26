"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BalitaUpdateForm from "@/features/balita/components/balita-update-form";
import { UpdateBalitaResponse } from "@/features/balita/types/balita";
import ResultCardUpdate from "@/features/balita/components/result-card-update";

export default function FollowUpInputPage() {
  const [result, setResult] = useState<UpdateBalitaResponse | null>(null);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/input"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Input Data
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Update Data Balita
          </h1>
          <p className="text-gray-600">
            Input pemeriksaan terbaru untuk anak yang sudah terdaftar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BalitaUpdateForm onSuccess={(data) => setResult(data)} />
          <ResultCardUpdate result={result} />
        </div>
      </div>
    </div>
  );
}
