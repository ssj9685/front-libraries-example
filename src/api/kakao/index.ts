import { COOKIE_NAME, cookieUtil } from "@/util/cookie";

const clientId = "77d5206d0ebe68b33f80bf59f1c7a2eb";
const redirectUri = "http://localhost:3000/kakao-login";
const responseType = "code";

const { accessToken, refreshToken } = COOKIE_NAME;

const authorizeParam = new URLSearchParams({
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: responseType,
});

const authorizeUrl = `https://kauth.kakao.com/oauth/authorize?${authorizeParam.toString()}`;

const getToken = async (code: string) => {
  if (!code) return;

  const url = "https://kauth.kakao.com/oauth/token";

  const param = {
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: new URLSearchParams(param).toString(),
  });

  const result = await response.json();

  return result;
};

const getTokenInfo = async () => {
  const url = "https://kapi.kakao.com/v1/user/access_token_info";
  const token = cookieUtil.getCookie(COOKIE_NAME.accessToken);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    cookieUtil.deleteCookie(accessToken);
    cookieUtil.deleteCookie(refreshToken);
  }

  const result = await response.json();

  return result;
};

export const kakaoApi = {
  authorizeUrl,
  getToken,
  getTokenInfo,
};
