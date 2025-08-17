import { useQuery } from "@tanstack/react-query";
import authenticatedAxios from "./axios";

export const useGetStudents = () =>
  useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const { data } = await authenticatedAxios.get(
        "/parent-student/parents"
      );
      return { data };
    },
  });
