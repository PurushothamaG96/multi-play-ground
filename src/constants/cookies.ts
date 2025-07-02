import { getCookie, setCookie, deleteCookie } from "cookies-next";

import { addDays } from "date-fns";

export const COOKIE_AUTH_TOKEN = `__cookie_auth_token_client`;
export const COOKIE_LOGIN_MFA = `__cookie_login_mfa_client`;

export const getAuthTokenCookie = () => getCookie(COOKIE_AUTH_TOKEN);

export const setAuthTokenCookie = (token: string) =>
  setCookie(COOKIE_AUTH_TOKEN, token, { expires: addDays(new Date(), 30) });

export const removeAuthTokenCookie = () => deleteCookie(COOKIE_AUTH_TOKEN);
