export const getClientCookie = (cookies: string, name: string) =>
  (cookies.split(';').find((cookie) => cookie.indexOf(`${name}=`) > -1) || '').split('=')[1];
