"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="relative cursor-pointer"
              aria-label="Search"
            >
              <div className="rounded-lg p-2 xl:absolute xl:inset-y-0 xl:start-0 xl:flex xl:items-center xl:ps-3">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                readOnly
                placeholder="Search...."
                className="hidden h-9 w-52 cursor-pointer rounded-xl border border-border bg-white py-2 pe-8 ps-9 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none xl:block"
              />
              <div className="absolute inset-y-0 end-0 hidden items-center pe-2.5 xl:flex">
                <kbd className="pointer-events-none flex h-5 select-none items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  /
                </kbd>
              </div>
            </button>
            <Link
              href="/subscribe"
              className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Subscribe
            </Link>
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
