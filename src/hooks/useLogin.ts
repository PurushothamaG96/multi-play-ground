import { useMutation } from "@tanstack/react-query";

import { authenticatedAxios } from "./authenticatedAxios";

import {
  COOKIE_LOGIN_MFA,
  setAuthTokenCookie,
  setSchoolManagementCookie,
} from "@/constants/cookies";
import { Login } from "@/interfaces/login";
import { addHours } from "date-fns";

const logIn = async (requestPayload: Login) => {
  const {
    data: { data = {} },
  } = await authenticatedAxios({
    method: "POST",
    url: `/api/v1/auth/login`,
    data: requestPayload,
  });

  const token = data?.token || "";

  console.log(token);

  if (token) {
    if (token) {
      setSchoolManagementCookie({
        cookieName: COOKIE_LOGIN_MFA,
        value: token,
        expires: addHours(new Date(), 1),
      });
    }
  }

  return data;
};

export default function useLogIn() {
  return useMutation({ mutationFn: (payload: Login) => logIn(payload) });
}
