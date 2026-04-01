import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/apiClient";
import { SignUpFormInputs , SignUpFormInputsWithProfile} from "../utils/type";

export const useProfile = (userId: string) => {

  const queryClient = useQueryClient();

  const { data: user , isLoading } = useQuery<SignUpFormInputsWithProfile>({
    queryKey: ["profile",userId],
    queryFn: async () => {
      const res = await api.get(`api/users?userID=${userId}`);
      return res.data.msg[0] || [];
    },
    enabled:!!userId
  });

 const editMutation = useMutation({
     mutationFn: async ({ user, id }: { user:SignUpFormInputs; id: string }) => {
       return api.put(`api/users?userID=${id}`, user);
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["profile"] });
     }
   });

  return {
    user,
    isLoading,
    editUser:editMutation.mutate
  };
};





