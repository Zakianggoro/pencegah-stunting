import { AktivitasTerbaruItem } from "@/features/dashboard/types/dashboard";
import { format, subMonths } from "date-fns";

export function groupByMonth(aktivitas: AktivitasTerbaruItem[]) {
  const result: Record<string, any[]> = {};

  aktivitas.forEach((item) => {
    const monthKey = format(new Date(item.tanggal_pemeriksaan), "yyyy-MM");

    if (!result[monthKey]) {
      result[monthKey] = [];
    }

    result[monthKey].push({
      nik: item.balita.nik,
      name: item.balita.nama,
      parentName: item.balita.nama_orang_tua,
      posyandu: item.balita.posyandu.nama_posyandu,
      age:
        item.usia_bulan === 0
          ? "0 bulan"
          : `${
              item.usia_bulan >= 12
                ? Math.floor(item.usia_bulan / 12) + " tahun"
                : ""
            } ${
              item.usia_bulan % 12 > 0 ? (item.usia_bulan % 12) + " bulan" : ""
            }`.trim(),
      height: parseFloat(item.tinggi_badan),
      weight: parseFloat(item.berat_badan),
      status:
        item.status_stunting === "STUNTING"
          ? "Stunting"
          : item.status_stunting === "NORMAL"
          ? "Normal"
          : "Tidak Diketahui",
      date: format(new Date(item.tanggal_pemeriksaan), "yyyy-MM-dd"),
    });
  });

  return result;
}

export const MONTH_OPTIONS = Array.from({ length: 12 }).map((_, index) => {
  const date = subMonths(new Date(), index);
  return {
    label: format(date, "MMMM yyyy"),
    value: format(date, "yyyy-MM"),
  };
});
