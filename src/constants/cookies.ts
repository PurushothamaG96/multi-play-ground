import { getCookie, setCookie, deleteCookie } from "cookies-next";

import { addDays } from "date-fns";

export const COOKIE_AUTH_TOKEN = `__cookie_auth_token_client`;

export const COOKIE_LOGIN_MFA = `_cookie_login_token_client`;

export const getAuthTokenCookie = () => getCookie(COOKIE_AUTH_TOKEN);

export const setAuthTokenCookie = (token: string) =>
  setCookie(COOKIE_AUTH_TOKEN, token, { expires: addDays(new Date(), 30) });

export const removeAuthTokenCookie = () => deleteCookie(COOKIE_AUTH_TOKEN);

export const getSchoolManagementCookie = (cookieName: string) =>
  getCookie(cookieName);

export const setSchoolManagementCookie = ({
  cookieName,
  value,
  expires = addDays(new Date(), 30),
}: {
  cookieName: string;
  value: any;
  expires: Date;
}) => setCookie(cookieName, value, { expires: expires });

export const removeSchoolManagementCookie = (cookieName: string) =>
  deleteCookie(cookieName);
