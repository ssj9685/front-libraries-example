import { kakaoApi } from "@/api/kakao";
import { COOKIE_NAME, cookieUtil } from "@/util/cookie";
import { useEffect } from "react";

const { accessToken, refreshToken } = COOKIE_NAME;

const setTokenInCookie = (data: { [x: string]: any }) => {
  const { access_token, refresh_token, expires_in, refresh_token_expires_in } =
    data;

  cookieUtil.setCookie(accessToken, access_token, {
    "max-age": expires_in,
  });

  cookieUtil.setCookie(refreshToken, refresh_token, {
    "max-age": refresh_token_expires_in,
  });
};

const KakaoLoginTestPage = () => {
  useEffect(() => {
    if (!cookieUtil.getCookie(accessToken)) {
      const search = new URLSearchParams(window.location.search);
      const code = search.get("code") ?? "";
      kakaoApi.getToken(code).then(setTokenInCookie);
    }
  }, []);

  return (
    <>
      <div>
        <div>kakao login page</div>
        <a href={kakaoApi.authorizeUrl}>로그인하기</a>
        <br />
        <button
          onClick={async () => {
            const result = await kakaoApi.getTokenInfo();

            console.log(result);
          }}
        >
          토큰 검증
        </button>
      </div>
    </>
  );
};

export default KakaoLoginTestPage;
