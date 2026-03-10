import type { NextResponse } from "next/server";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { PanelSessionUser } from "@/lib/panel-types";

export const PANEL_SESSION_COOKIE = "work365_panel_session";
export const PANEL_SESSION_STATE_COOKIE = "work365_panel_state";

export function getSessionUserId(cookieStore: Pick<ReadonlyRequestCookies, "get">) {
  return cookieStore.get(PANEL_SESSION_COOKIE)?.value ?? null;
}

export function getSessionUserState(cookieStore: Pick<ReadonlyRequestCookies, "get">) {
  const rawValue = cookieStore.get(PANEL_SESSION_STATE_COOKIE)?.value;

  if (!rawValue) {
    return null;
  }

  try {
    const json = Buffer.from(rawValue, "base64url").toString("utf8");
    return JSON.parse(json) as PanelSessionUser;
  } catch {
    return null;
  }
}

export function setPanelSessionCookies(response: NextResponse, user: PanelSessionUser) {
  response.cookies.set(PANEL_SESSION_COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  response.cookies.set(PANEL_SESSION_STATE_COOKIE, Buffer.from(JSON.stringify(user), "utf8").toString("base64url"), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearPanelSessionCookies(response: NextResponse) {
  response.cookies.set(PANEL_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(PANEL_SESSION_STATE_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
