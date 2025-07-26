"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../services/dashboard";
import { DashboardSummary } from "../types/dashboard";

export const useDashboard = () => {
  return useQuery<DashboardSummary>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const data = await getDashboardSummary();
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
