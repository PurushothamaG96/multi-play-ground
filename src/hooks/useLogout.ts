// hooks/useLogOut.ts
import { useMutation } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next/client";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import { COOKIE_AUTH_TOKEN } from "@/constants/cookies";
import { getInstanceAuth } from "./authenticatedAxios";
import { useAuth } from "@/contexts/auth-context";

const logOut = async () => {
  const auth = getInstanceAuth();
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Firebase signOut failed:", err);
  }

  deleteCookie(COOKIE_AUTH_TOKEN, { path: "/" });
  return true;
};

export default function useLogOut() {
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      setIsLoggedIn(false);
      router.push("/login"); // ⬅️ instant redirect
    },
  });
}
