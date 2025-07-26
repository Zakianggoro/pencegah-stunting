export interface Posyandu {
  nama_posyandu: string;
  alamat: string;
}

export interface Balita {
  nama: string;
  nik: string;
  nama_orang_tua: string;
  posyandu: Posyandu;
}

export interface AktivitasTerbaruItem {
  balita_id: number;
  tanggal_pemeriksaan: string;
  usia_bulan: number;
  tinggi_badan: string;
  berat_badan: string;
  id: number;
  status_stunting: "NORMAL" | "STUNTING";
  created_at: string;
  updated_at: string;
  balita: Balita;
}

export interface TrendDataItem {
  bulan: string;
  total_pemeriksaan: number;
  kasus_stunting: number;
  status_normal: number;
}

export interface Stats {
  total_balita: number;
  kasus_stunting: number;
  status_normal: number;
  bulan_ini: number;
  persentase_stunting: number;
  persentase_normal: number;
}

export interface DashboardSummary {
  stats: Stats;
  trend_data: TrendDataItem[];
  aktivitas_terbaru: AktivitasTerbaruItem[];
}
