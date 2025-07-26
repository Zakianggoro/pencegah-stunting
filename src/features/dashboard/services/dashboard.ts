"use server";

import { apiClient } from "@/lib/api-client";
import { DashboardSummary } from "../types/dashboard";

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const res = await apiClient<DashboardSummary>("/dashboard", "GET");
  return res;
}
