export interface RegisterBalitaRequest {
  nama: string;
  nik: string;
  nama_orang_tua: string;
  posyandu_id: number;
  tanggal_lahir: string;
  jenis_kelamin: "M" | "F";
  rt: string;
  rw: string;
  tinggi_badan: number;
  berat_badan: number;
}

export interface RegisterBalitaResponse {
  id: number;
  nama: string;
  nik: string;
  nama_orang_tua: string;
  posyandu_id: number;
  tanggal_lahir: string;
  jenis_kelamin: "M" | "F";
  rt: string;
  rw: string;
  created_at: string;
  updated_at: string;
  posyandu: {
    id: number;
    nama_posyandu: string;
    alamat: string;
    created_at: string;
    updated_at: string;
  };
  status: {
    zscore_tbu: number;
    kategori_tbu: string;
    zscore_bbtb: number;
    kategori_bbtb: string;
    status_stunting: string;
    rekomendasi: string;
  };
}

type PemeriksaanRiwayat = {
  tanggal: string;
  tinggi_badan: number;
  berat_badan: number;
  posyandu: string;
  z_score_tb_u: number | null;
  z_score_bb_tb: number | null;
};

type StatusTerkini = {
  status_stunting: string;
  tinggi_badan: number;
  berat_badan: number;
};

export type BalitaSearchResponse = {
  id: number;
  nama: string;
  nik: string;
  nama_orang_tua: string;
  tanggal_lahir: string;
  usia_bulan: number;
  jenis_kelamin: "F" | "M";
  total_pemeriksaan: number;
  status_terkini: StatusTerkini;
  riwayat_pemeriksaan: PemeriksaanRiwayat[];
};

export type BalitaSearchParams = {
  nama?: string;
  nik?: string;
};

export type UpdateBalitaRequest = {
  nik: string;
  posyandu_id: number;
  tanggal_lahir: string;
  jenis_kelamin: "M" | "F";
  tinggi_badan: number;
  berat_badan: number;
  tanggal_pemeriksaan: string;
};

export type UpdateBalitaResponse = {
  id: number;
  nama: string;
  nik: string;
  nama_orang_tua: string;
  posyandu_id: number;
  tanggal_lahir: string;
  jenis_kelamin: "M" | "F";
  rt: string;
  rw: string;
  status: {
    zscore_tbu: number;
    kategori_tbu: string;
    zscore_bbtb: number;
    kategori_bbtb: string;
    status_stunting: string;
    rekomendasi: string;
  };
};
