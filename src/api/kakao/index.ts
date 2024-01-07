import { rest_api_app_key, redirect_uri } from "@/const";
import { COOKIE_NAME, cookieUtil } from "@/util/cookie";

const { ACCESS_TOKEN } = COOKIE_NAME;

const getAuthorizeUrl = () => {
  const url = "https://kauth.kakao.com/oauth/authorize";
  const query = new URLSearchParams({
    client_id: rest_api_app_key,
    redirect_uri,
    response_type: "code",
  });

  return `${url}?${query.toString()}`;
};

const getLogoutUrl = () => {
  const url = "https://kauth.kakao.com/oauth/logout";
  const query = new URLSearchParams({
    client_id: rest_api_app_key,
    logout_redirect_uri: redirect_uri,
  });

  return `${url}?${query.toString()}`;
};

const getToken = async (code: string) => {
  const param = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_app_key,
    redirect_uri,
    code,
  });

  const response = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: param.toString(),
  });

  const result = await response.json();

  return result;
};

const getUserInfo = async () => {
  const accessToken = cookieUtil.getCookie(ACCESS_TOKEN);

  const response = await fetch("https://kapi.kakao.com/v2/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  const result = await response.json();

  return result;
};

const getTokenInfo = async () => {
  const url = "https://kapi.kakao.com/v1/user/access_token_info";
  const token = cookieUtil.getCookie(ACCESS_TOKEN);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  return result;
};

export const kakaoApi = {
  getAuthorizeUrl,
  getLogoutUrl,
  getToken,
  getTokenInfo,
  getUserInfo,
};
