import { rest_api_app_key, redirect_uri } from "@/const";

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
  const accessToken = localStorage.getItem("access_token");

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

export const kakaoApi = {
  getToken,
  getUserInfo,
};
