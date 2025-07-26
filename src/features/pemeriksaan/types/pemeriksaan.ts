export type Posyandu = {
  nama_posyandu: string;
  alamat: string;
};

export type Balita = {
  nama: string;
  nik: string;
  nama_orang_tua: string;
  posyandu: Posyandu;
};

export type Pemeriksaan = {
  id: number;
  balita_id: number;
  tanggal_pemeriksaan: string;
  usia_bulan: number | null;
  tinggi_badan: string;
  berat_badan: string;
  status_stunting: "NORMAL" | "STUNTING" | null;
  created_at: string;
  updated_at: string;
  balita: Balita;
};

export type PemeriksaanResponse = Pemeriksaan[];
