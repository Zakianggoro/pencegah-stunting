"use server";

import { apiClient } from "@/lib/api-client";
import { PemeriksaanResponse } from "../types/pemeriksaan";

export async function getAllPemeriksaan(): Promise<PemeriksaanResponse> {
  const res = await apiClient<PemeriksaanResponse>("/pemeriksaan", "GET");
  return res;
}

export async function deletePemeriksaan({ id }: { id: string }): Promise<void> {
  const res = await apiClient<void>(`/pemeriksaan/${id}`, "DELETE");
  return res;
}
