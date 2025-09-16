// hooks/useLogIn.ts

import { useMutation } from "@tanstack/react-query";

import { Login } from "@/interfaces/login";
import authenticatedAxios from "./axios";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithCustomToken,
} from "firebase/auth";
import { getInstanceAuth } from "./authenticatedAxios";
import { COOKIE_AUTH_TOKEN, setAuthTokenCookie } from "@/constants/cookies";

import { setCookie } from "cookies-next/client";
import { addDays } from "date-fns";

const firebaseCustomLogIn = async (token: string, forceUpdate = true) => {
  if (!token) return { token: "" };
  const auth = getInstanceAuth();
  await setPersistence(auth, browserLocalPersistence);
  const userResponse = await signInWithCustomToken(auth, token);
  const tokenResult = userResponse.user.getIdTokenResult(forceUpdate);
  return tokenResult;
};

const logIn = async (payload: Login) => {
  const { data } = await authenticatedAxios({
    method: "POST",
    url: `/auth/login`,
    data: payload,
  });

  const user = await firebaseCustomLogIn(data?.token || "", false);
  const token = user?.token || "";

  console.log(data);


  if (!token) {
    setCookie(COOKIE_AUTH_TOKEN, token, {
      expires: addDays(new Date(), 30),
      path: "/",
      sameSite: "lax",
      secure: true,
    });
  }
  return { client: data?.client };
};

export default function useLogIn() {
  return useMutation({ mutationFn: logIn });
}
