import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Save, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegisterBalitaResponse } from "../types/balita";

export default function ResultCard({
  result,
}: {
  result: RegisterBalitaResponse | null;
}) {
  if (!result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hasil Analisis</CardTitle>
          <CardDescription>Status stunting dan rekomendasi</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12 text-gray-500">
          <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Lengkapi data balita dan klik "Hitung Status Stunting"</p>
        </CardContent>
      </Card>
    );
  }

  const status = result.status?.status_stunting ?? "Tidak diketahui";
  const tbU = result.status?.kategori_tbu;
  const bbTb = result.status?.kategori_bbtb;
  const rekomendasi = result.status?.rekomendasi;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hasil Analisis</CardTitle>
        <CardDescription>Status stunting dan rekomendasi</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div
            className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
              status === "Normal"
                ? "bg-green-100 text-green-800 border-2 border-green-200"
                : "bg-red-100 text-red-800 border-2 border-red-200"
            }`}
          >
            {status}
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">
              Tinggi Badan menurut Umur (TB/U)
            </h4>
            <p className="text-sm text-gray-600">{tbU}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">
              Berat Badan menurut Tinggi Badan (BB/TB)
            </h4>
            <p className="text-sm text-gray-600">{bbTb}</p>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Rekomendasi</h4>
          <p className="text-sm text-blue-800">{rekomendasi}</p>
        </div>

        <Button className="w-full" size="lg">
          <Save className="h-4 w-4 mr-2" />
          Simpan Data
        </Button>
      </CardContent>
    </Card>
  );
}
