import { useMutation } from "@tanstack/react-query";

import { authenticatedAxios } from "./authenticatedAxios";

import { setAuthTokenCookie } from "@/constants/cookies";
import { Register } from "@/interfaces/login";

const register = async (requestPayload: Register) => {
  const {
    data: { data = {} },
  } = await authenticatedAxios({
    method: "POST",
    url: `/api/v1/auth/register`,
    data: requestPayload,
  });

  const token = data?.token || "";

  if (token) {
    setAuthTokenCookie(token);
  }

  return data;
};

export default function useRegister() {
  return useMutation({ mutationFn: (payload: Register) => register(payload) });
}
