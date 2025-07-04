import { config } from "@/config/vars";
import {
  getAuthTokenCookie,
  removeAuthTokenCookie,
  setAuthTokenCookie,
} from "@/constants/cookies";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { authenticatedAxios } from "./axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { AxiosRequestConfig } from "axios";

const instance = initializeApp(config.firebaseConfig);
const auth = getAuth(instance);
export const fetchFirebaseCurrentUser = async (): Promise<User | null> =>
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error || new Error("Error logging out");
  }
};

const fetchToken = (currentUser: User) => currentUser.getIdToken(true);

export const refreshFirebaseToken = async () => {
  try {
    const user = await fetchFirebaseCurrentUser();

    if (!user) {
      return { token: null, error: "User not found" };
    }

    const token = await fetchToken(user);
    setAuthTokenCookie(token);
    return { token, error: null };
  } catch (error) {
    removeAuthTokenCookie();
    logout();
    window.location.href = window.location.host;
    return { token: null, error };
  }
};

authenticatedAxios.interceptors.request.use(
  function (con) {
    const token = getAuthTokenCookie();
    if (token && con.headers) {
      con.headers.Authorization = `Bearer ${token}`;
    }
    return con;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const refreshAuthToken = async (failedRequest: { response: { config: AxiosRequestConfig } }) => {
  const { token } = await refreshFirebaseToken();

  if (token && failedRequest?.response?.config?.headers) {
    failedRequest.response.config.headers.Authorization = `Bearer ${token}`;
    return Promise.resolve();
  }

  return Promise.reject(failedRequest);
};

createAuthRefreshInterceptor(authenticatedAxios, refreshAuthToken, {
  statusCodes: [403],
});

export { authenticatedAxios };
