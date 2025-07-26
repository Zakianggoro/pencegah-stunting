"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateBalitaSchema, updateBalitaSchema } from "../schemas/balita";
import { UpdateBalitaResponse } from "../types/balita";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateBalita } from "../hooks/balita";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

interface UpdateBalitaFormProps {
  onSuccess: (data: UpdateBalitaResponse) => void;
}

export default function BalitaUpdateForm({ onSuccess }: UpdateBalitaFormProps) {
  const form = useForm<UpdateBalitaSchema>({
    resolver: zodResolver(updateBalitaSchema),
    defaultValues: {
      nik: "",
      posyandu_id: 1,
      tanggal_lahir: "",
      jenis_kelamin: "M",
      tinggi_badan: 0,
      berat_badan: 0,
      tanggal_pemeriksaan: new Date().toISOString().split("T")[0],
    },
  });

  const { mutate: updateBalita, isPending } = useUpdateBalita({
    onSuccess: (data: any) => {
      onSuccess(data);
      form.reset();
    },
  });

  const onSubmit = (values: UpdateBalitaSchema) => {
    updateBalita(values);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Pemeriksaan Terbaru</CardTitle>
        <CardDescription>
          Masukkan data pemeriksaan terbaru untuk anak yang sudah terdaftar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nik"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIK Balita</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan NIK 16 digit"
                      maxLength={16}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="posyandu_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Posyandu</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih posyandu" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Tekik</SelectItem>
                      <SelectItem value="2">Tambakan</SelectItem>
                      <SelectItem value="3">Kantor Desa</SelectItem>
                      <SelectItem value="4">Sukorejo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tanggal_lahir"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jenis_kelamin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="M">Laki-laki</SelectItem>
                      <SelectItem value="F">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tinggi_badan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tinggi Badan (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        value={field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? "" : parseFloat(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="berat_badan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Berat Badan (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        value={field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? "" : parseFloat(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isPending}
            >
              {isPending ? (
                "Mengirim..."
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" />
                  Hitung Status Stunting
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
