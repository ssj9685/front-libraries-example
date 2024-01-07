import { kakaoApi } from "@/api/kakao";
import { rest_api_app_key, redirect_uri } from "@/const";
import { useEffect, useState } from "react";

const KakaoLoginPage = () => {
  const [userInfo, setUserInfo] = useState<{ id: number }>();

  const authorizeParam = new URLSearchParams({
    client_id: rest_api_app_key,
    redirect_uri,
    response_type: "code",
  });

  const logoutParam = new URLSearchParams({
    client_id: rest_api_app_key,
    logout_redirect_uri: redirect_uri,
  });

  const handleGetToken = async (code: string) => {
    const {
      token_type,
      access_token,
      expires_in,
      refresh_token,
      refresh_token_expires_in,
    } = await kakaoApi.getToken(code);

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const handleGetUserInfo = async () => {
    const { id } = await kakaoApi.getUserInfo();

    setUserInfo({ id });
  };

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const code = search.get("code");
    const accessToken = localStorage.getItem("access_token");

    if (code && (accessToken === null || accessToken === "undefined")) {
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
      <a
        href={`https://kauth.kakao.com/oauth/authorize?${authorizeParam.toString()}`}
      >
        로그인
      </a>
      <a
        onClick={handleLogout}
        href={`https://kauth.kakao.com/oauth/logout?${logoutParam.toString()}`}
      >
        로그아웃
      </a>
      <button onClick={handleGetUserInfo}>유저 정보 가져오기</button>
      <div>{userInfo?.id}</div>
    </div>
  );
};

export default KakaoLoginPage;
