import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import authenticatedAxios from "./axios";
import { USER_TYPE } from "@/constants/users";

type FetchTeachersParams = {
  page: number;
  pageSize: number;
  search: string;
};

export const useTeachersQuery = ({ page, pageSize, search }: FetchTeachersParams) => {
  return useQuery({
    queryKey: ["teachers", page, pageSize, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("name", search); // search by name
      params.append("page", String(page + 1));
      params.append("limit", String(pageSize));

      const res = await authenticatedAxios.get(`/teachers?${params.toString()}`);
      return {
        teachers: res.data.data,
        total: res.data.total,
      };
    },
  });
};

export const useCreateTeacherMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teacher: {
      name: string;
      email: string;
      phone: string;
      fullAddress: string;
      city: string;
      userType: USER_TYPE;
    }) => {
      const res = await authenticatedAxios.post("/teachers", teacher);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};

export const useUpdateTeacherMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teacher: {
      id: string;
      name: string;
      email: string;
      phone: string;
      fullAddress: string;
      city: string;
      userType: USER_TYPE;
    }) => {
      const res = await authenticatedAxios.put(`/teachers/${teacher.id}`, teacher);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};

export const useDeleteTeacherMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await authenticatedAxios.delete(`/teachers/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};
