"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePemeriksaan, getAllPemeriksaan } from "../services/pemeriksaan";
import { PemeriksaanResponse } from "../types/pemeriksaan";
import { toast } from "sonner";

export const usePemeriksaanQuery = () => {
  return useQuery<PemeriksaanResponse>({
    queryKey: ["Pemeriksaan"],
    queryFn: async () => {
      const data = await getAllPemeriksaan();
      return data;
    },
  });
};

export const useDeletePemeriksaan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePemeriksaan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["balita"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["pemeriksaan"],
        refetchType: "active",
      });
      toast("Data berhasil dihapus");
    },
    onError: (error) => {
      console.error("Gagal menghapus pemeriksaan:", error);
      toast("Data tidak berhasil dihapus");
    },
  });
};
