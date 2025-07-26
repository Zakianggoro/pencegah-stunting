import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { register, searchBalita, update } from "../services/balita";
import {
  BalitaSearchParams,
  BalitaSearchResponse,
  RegisterBalitaRequest,
  RegisterBalitaResponse,
  UpdateBalitaRequest,
  UpdateBalitaResponse,
} from "../types/balita";
import { toast } from "sonner";

export const useRegisterBalita = (options?: {
  onSuccess?: (data: RegisterBalitaResponse) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<RegisterBalitaResponse, Error, RegisterBalitaRequest>({
    mutationFn: (data) => register(data),
    onSuccess: async (data) => {
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
      toast("Data Balita Berhasil ditambahkan");
      options?.onSuccess?.(data);
    },
    onError: (errors: Error) => {
      console.error("Register failed:", errors.message);
      toast(errors.message);
    },
  });
};

export const useSearchBalita = (params: BalitaSearchParams, enabled = true) => {
  return useQuery<BalitaSearchResponse[]>({
    queryKey: ["balita"],
    queryFn: () => searchBalita(params),
    refetchOnWindowFocus: false,
  });
};

export const useUpdateBalita = (options?: {
  onSuccess?: (data: UpdateBalitaResponse) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateBalitaResponse, Error, UpdateBalitaRequest>({
    mutationFn: (data) => update(data),
    onSuccess: async (data) => {
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
      toast("Data Balita Berhasil ditambahkan");
      options?.onSuccess?.(data);
    },
    onError: (errors: Error) => {
      console.error("Register failed:", errors.message);
      toast(errors.message);
    },
  });
};
