export type AdminTheme = "light" | "dark";

export const ADMIN_THEME_COOKIE = "admin-theme";

export function parseAdminTheme(value: string | undefined): AdminTheme {
  return value === "light" ? "light" : "dark";
}
