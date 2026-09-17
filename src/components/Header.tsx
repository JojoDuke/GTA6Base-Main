"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { navLinks, utilityLinks } from "@/lib/data";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white">
      <nav className="border-b border-border">
        <div className="mx-auto flex max-w-[1450px] flex-wrap items-center justify-between px-4 py-3 lg:px-24 lg:py-4">
          <div className="flex items-center gap-2 lg:gap-6">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Logo />
            <ul className="mt-0.5 hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.95rem] text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {open && (
            <div className="w-full border-t border-border lg:hidden">
              <ul className="flex flex-col py-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-3 text-foreground hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>

      <div className="hidden w-full border-b border-border bg-white sm:block">
        <div className="mx-auto flex max-w-[1450px] items-center justify-end gap-2 px-4 py-2 lg:px-24">
          {utilityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex h-8 items-center rounded-md bg-muted px-3 text-sm font-semibold text-foreground transition-colors hover:bg-[#ececee]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
