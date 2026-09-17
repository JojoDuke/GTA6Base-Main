"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const adsenseClientId = "ca-pub-9782488419505594";

export function AdSenseScript() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
      crossOrigin="anonymous"
    />
  );
}
