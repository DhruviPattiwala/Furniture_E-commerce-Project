"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/apiClient";
import { products as productType } from "@/app/utils/type";

export const useProducts = () => {
  const queryClient = useQueryClient();
  const addProduct = useMutation({
    mutationFn: async (product: Partial<productType>) => {
      const res = await api.post("api/product", product);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: false,
        
      });
    },
  });

  const editProduct = useMutation({
    mutationFn: async ({ product, id }: { product: Partial<productType>; id: string }) => {
      const res = await api.put(`api/product/${id}`, product);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: false,
      });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`api/product/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: false,
      });
    },
  });

  return {
    addProduct: addProduct.mutate,
    editProduct: editProduct.mutate,
    deleteProduct: deleteProduct.mutate,
  };
};