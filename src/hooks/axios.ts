import { getAuthTokenCookie } from "@/constants/cookies";
import axios from "axios";
import { refreshFirebaseToken } from "./authenticatedAxios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const authenticatedAxios = axios.create({
  baseURL: `http://localhost:9200/api/v1/`,
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor
authenticatedAxios.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    const token = getAuthTokenCookie(); // Retrieve auth token from localStorage

    console.log(token, "TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

// Add a response interceptor
authenticatedAxios.interceptors.response.use(
  function (response) {
    // Do something with the response data
    console.log("Response:", response);
    return response;
  },
  function (error) {
    // Handle the response error
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
      console.error("Unauthorized, logging out...");
      // Perform any logout actions or redirect to login page
    }
    return Promise.reject(error);
  }
);

const refreshAuthToken = async (failedRequest: any) => {
  const { token } = await refreshFirebaseToken();

  if (token) {
    failedRequest.response.config.headers.Authorization = `Bearer ${token}`;
    return Promise.resolve();
  }

  return Promise.reject(failedRequest);
};

createAuthRefreshInterceptor(authenticatedAxios, refreshAuthToken, {
  statusCodes: [403, 401],
});

export default authenticatedAxios;
