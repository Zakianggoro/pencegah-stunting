"use server";

import { apiClient } from "@/lib/api-client";
import {
  BalitaSearchParams,
  BalitaSearchResponse,
  RegisterBalitaRequest,
  RegisterBalitaResponse,
  UpdateBalitaRequest,
  UpdateBalitaResponse,
} from "../types/balita";

export async function register(
  body: RegisterBalitaRequest
): Promise<RegisterBalitaResponse> {
  const res = await apiClient<RegisterBalitaResponse>("/balita", "POST", {
    body: JSON.stringify(body),
  });
  return res;
}

export async function searchBalita(
  params: BalitaSearchParams = {}
): Promise<BalitaSearchResponse[]> {
  const query = new URLSearchParams();

  if (params.nama) query.append("nama", params.nama);
  if (params.nik) query.append("nik", params.nik);

  const url = `/balita/search?${query.toString()}`;
  const res = await apiClient<BalitaSearchResponse[]>(url, "GET");
  return res;
}

export async function update(
  body: UpdateBalitaRequest
): Promise<UpdateBalitaResponse> {
  const res = await apiClient<UpdateBalitaResponse>(
    "/pemeriksaan/tambah",
    "POST",
    {
      body: JSON.stringify(body),
    }
  );
  return res;
}
