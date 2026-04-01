import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/apiClient";
import {   products } from "../utils/type";
import { payloadType } from "../utils/type";

export const useWishlist = (userId: string) => {

  const queryClient = useQueryClient();

  const { data: wishlist = [], isLoading } = useQuery<products[]>({
    queryKey: ["wishlist", userId],
    queryFn: async () => {
      const res = await api.get(`/api/wishList?userID=${userId}`);
      return res.data.msg[0].wishListItems || [];
    },
    enabled:!!userId
  });

 
  const addMutation = useMutation({
    mutationFn: async (payload : payloadType) => {
      return api.post("api/wishList", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", userId] });
    }
  });

  return {
    wishlist,
    isLoading,
    addToWishlist: addMutation.mutate,
   
  };
};





