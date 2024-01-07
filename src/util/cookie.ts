const client = typeof window !== "undefined";

export const COOKIE_NAME = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const;

type ValueOf<T> = T[keyof T];

const getCookie = (name: ValueOf<typeof COOKIE_NAME>): string | undefined => {
  if (!client) return undefined;

  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1")}=([^;]*)`
    )
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = (
  name: ValueOf<typeof COOKIE_NAME>,
  value: string,
  options: { [key: string]: number | string } = { path: "/" }
): void => {
  if (!client) return;

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}`;

  Object.keys(options).forEach((key) => {
    updatedCookie += `; ${key}`;
    const optionValue = options[key];
    updatedCookie += `=${optionValue}`;
  });

  document.cookie = updatedCookie;
};

const deleteCookie = (name: ValueOf<typeof COOKIE_NAME>): void => {
  if (!client) return;

  setCookie(name, "", {
    "max-age": -1,
  });
};

const deleteAllCookies = (): void => {
  if (!client) return;

  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    deleteCookie(name.trim() as ValueOf<typeof COOKIE_NAME>);
  }
};

export const cookieUtil = {
  getCookie,
  setCookie,
  deleteCookie,
  deleteAllCookies,
};
