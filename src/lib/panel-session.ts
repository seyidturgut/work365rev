import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const PANEL_SESSION_COOKIE = "work365_panel_session";

export function getSessionUserId(cookieStore: Pick<ReadonlyRequestCookies, "get">) {
  return cookieStore.get(PANEL_SESSION_COOKIE)?.value ?? null;
}
