import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import authenticatedAxios from "./axios";
import { USER_TYPE } from "@/constants/users";

type FetchStudentsParams = {
  page: number;
  pageSize: number;
  search: string;
};

export const useStudentsQuery = ({ page, pageSize, search }: FetchStudentsParams) => {
  return useQuery({
    queryKey: ["students", page, pageSize, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("name", search);
      params.append("page", String(page + 1));
      params.append("limit", String(pageSize));

      const res = await authenticatedAxios.get(`/students?${params.toString()}`);
      return {
        students: res.data.data,
        total: res.data.total,
      };
    },
  });
};

export const useCreateStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (student: {
      name: string;
      email: string;
      phone: string;
      fullAddress: string;
      city: string;
      userType: USER_TYPE;
    }) => {
      const res = await authenticatedAxios.post("/students", student);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

export const useUpdateStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (student: {
      id: string;
      name: string;
      email: string;
      phone: string;
      fullAddress: string;
      city: string;
      userType: USER_TYPE;
    }) => {
      const res = await authenticatedAxios.put(`/students/${student.id}`, student);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

export const useDeleteStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await authenticatedAxios.delete(`/students/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
