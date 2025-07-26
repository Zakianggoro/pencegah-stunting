import { z } from "zod";

export const registerBalitaSchema = z.object({
  nama: z.string(),
  nik: z.string().min(16, "NIK harus 16 digit").max(16),
  nama_orang_tua: z.string(),
  posyandu_id: z.number(),
  tanggal_lahir: z.string(),
  jenis_kelamin: z.enum(["M", "F"]),
  rt: z.string(),
  rw: z.string(),
  tinggi_badan: z.number(),
  berat_badan: z.number(),
});

export type RegisterBalitaSchema = z.infer<typeof registerBalitaSchema>;

export const updateBalitaSchema = z.object({
  nik: z.string().min(16, "NIK harus 16 digit").max(16),
  posyandu_id: z.number(),
  tanggal_lahir: z.string(),
  jenis_kelamin: z.enum(["M", "F"]),
  tinggi_badan: z.number(),
  berat_badan: z.number(),
  tanggal_pemeriksaan: z.string(),
});

export type UpdateBalitaSchema = z.infer<typeof updateBalitaSchema>;
