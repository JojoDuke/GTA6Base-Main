import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ADMIN_THEME_COOKIE, parseAdminTheme } from "@/lib/cms/admin-theme";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = parseAdminTheme((await cookies()).get(ADMIN_THEME_COOKIE)?.value);

  return (
    <div className="admin-theme" data-theme={theme}>
      {children}
    </div>
  );
}
