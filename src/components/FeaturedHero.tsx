"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Article } from "@/lib/data";

export function FeaturedHero({ slides }: { slides: Article[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  if (!slides.length) {
    return null;
  }

  const activeIndex = index % slides.length;

  return (
    <div className="relative mb-4 aspect-[16/9] h-auto w-full overflow-hidden min-[1200px]:mb-0 lg:rounded-md">
      {slides.map((item, i) => (
        <Link
          key={item.id}
          href={`/news/${item.slug}`}
          className={`group absolute inset-0 transition-opacity duration-700 ${
            i === activeIndex
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== activeIndex}
          tabIndex={i === activeIndex ? 0 : -1}
          aria-label={`Read ${item.title}`}
        >
          <div
            className="absolute inset-0 origin-top bg-cover bg-top transition-transform duration-500 group-hover:scale-[1.02]"
            style={{ backgroundImage: item.image }}
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/70 via-black/25 to-transparent"
            aria-hidden
          />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-4 sm:gap-3 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              {item.tag && item.tag !== "Featured" ? (
                <span className="rounded bg-primary px-2 py-0.5 text-xs font-semibold text-white">
                  {item.tag}
                </span>
              ) : null}
              <span className="text-xs font-medium text-white/80">
                {item.category} · {item.date}
              </span>
            </div>
            <h1 className="max-w-2xl font-display text-xl font-bold leading-tight text-white transition-colors group-hover:text-white/90 sm:text-3xl">
              {item.title}
            </h1>
            <p className="hidden max-w-xl text-sm text-white/85 sm:block sm:text-base">
              {item.excerpt}
            </p>
          </div>
        </Link>
      ))}

      {slides.length > 1 ? (
        <>
          <div className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 gap-1 sm:left-4 sm:flex">
            <button
              type="button"
              aria-label="Previous slide"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50"
              onClick={() =>
                setIndex((i) => (i - 1 + slides.length) % slides.length)
              }
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50"
              onClick={() => setIndex((i) => (i + 1) % slides.length)}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="absolute bottom-3 right-4 z-10 flex gap-1.5 sm:bottom-5 sm:right-6">
            {slides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 cursor-pointer rounded-full transition-all hover:bg-white ${
                  i === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
