export const shouldBypassIntlMiddleware = (pathname: string): boolean =>
  pathname.startsWith("/_openclaw-dashboard");
