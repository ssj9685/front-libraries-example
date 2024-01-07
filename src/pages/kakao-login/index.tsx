import { kakaoApi } from "@/api/kakao";
import { COOKIE_NAME, cookieUtil } from "@/util/cookie";
import { useEffect, useState } from "react";

const { ACCESS_TOKEN, REFRESH_TOKEN } = COOKIE_NAME;

const KakaoLoginPage = () => {
  const [userInfo, setUserInfo] = useState<{ id: number }>();
  const [tokenInfo, setTokenInfo] = useState<{
    expiresInMillis: number;
    id: number;
    expires_in: number;
    app_id: number;
    appId: number;
  }>();

  const handleGetToken = async (code: string) => {
    const {
      access_token,
      expires_in,
      refresh_token,
      refresh_token_expires_in,
    } = await kakaoApi.getToken(code);

    cookieUtil.setCookie(ACCESS_TOKEN, access_token, {
      "max-age": expires_in,
    });

    cookieUtil.setCookie(REFRESH_TOKEN, refresh_token, {
      "max-age": refresh_token_expires_in,
    });
  };

  const handleLogout = () => {
    cookieUtil.deleteCookie(ACCESS_TOKEN);
    cookieUtil.deleteCookie(REFRESH_TOKEN);
  };

  const handleGetTokenInfo = async () => {
    const result = await kakaoApi.getTokenInfo();

    setTokenInfo(result);
  };

  const handleGetUserInfo = async () => {
    const result = await kakaoApi.getUserInfo();

    setUserInfo(result);
  };

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const code = search.get("code");
    const accessToken = cookieUtil.getCookie(ACCESS_TOKEN);

    if (code && !accessToken) {
      handleGetToken(code);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <a href={kakaoApi.getAuthorizeUrl()}>로그인</a>
      <a onClick={handleLogout} href={kakaoApi.getLogoutUrl()}>
        로그아웃
      </a>
      <button onClick={handleGetTokenInfo}>
        토큰 검증: {JSON.stringify(tokenInfo)}
      </button>
      <button onClick={handleGetUserInfo}>
        유저 정보 {JSON.stringify(userInfo)}
      </button>
    </div>
  );
};

export default KakaoLoginPage;
