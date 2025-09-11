import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import authenticatedAxios from "./axios";
import { USER_TYPE } from "@/constants/users";

type FetchUsersParams = {
  page: number;
  pageSize: number;
  search: string;
};

export const useUsersQuery = ({ page, pageSize, search }: FetchUsersParams) => {
  return useQuery({
    queryKey: ["users", page, pageSize, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("userName", search);
      params.append("page", String(page + 1));
      params.append("limit", String(pageSize));

      const res = await authenticatedAxios.get(`/users?${params.toString()}`);
      return {
        users: res.data.data,
        total: res.data.total,
      };
    },
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: {
      userName: string;
      email: string;
      userType: USER_TYPE;
      password: string;
    }) => {
      const res = await authenticatedAxios.post("/users", user);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: {
      id: string;
      userName: string;
      email: string;
      userType: USER_TYPE;
    }) => {
      const res = await authenticatedAxios.put(`/users/${user.id}`, user);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await authenticatedAxios.delete(`/users/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
