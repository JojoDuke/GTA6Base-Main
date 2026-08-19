"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Article } from "@/lib/data";

export function FeaturedHero({ slides }: { slides: Article[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const slide = slides[index];

  return (
    <div className="relative mb-4 aspect-[1.91/1] h-auto w-full overflow-hidden sm:aspect-[40/21] sm:h-[414px] min-[1200px]:mb-0 min-[1200px]:w-[800px] lg:rounded-md">
      {slides.map((item, i) => (
        <div
          key={item.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: item.image }}
          aria-hidden={i !== index}
        />
      ))}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/70 via-black/25 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-4 sm:gap-3 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {slide.tag ? (
            <span className="rounded bg-primary px-2 py-0.5 text-xs font-semibold text-white">
              {slide.tag}
            </span>
          ) : null}
          <span className="text-xs font-medium text-white/80">
            {slide.category} · {slide.date}
          </span>
        </div>
        <Link href={`/news/${slide.slug}`} className="group">
          <h1 className="max-w-2xl font-display text-xl font-bold leading-tight text-white sm:text-3xl">
            <span className="transition-colors group-hover:text-white/90">
              {slide.title}
            </span>
          </h1>
        </Link>
        <p className="hidden max-w-xl text-sm text-white/85 sm:block sm:text-base">
          {slide.excerpt}
        </p>
      </div>

      <div className="absolute left-3 top-1/2 hidden -translate-y-1/2 gap-1 sm:flex sm:left-4">
        <button
          type="button"
          aria-label="Previous slide"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50"
          onClick={() =>
            setIndex((i) => (i - 1 + slides.length) % slides.length)
          }
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="absolute bottom-3 right-4 flex gap-1.5 sm:bottom-5 sm:right-6">
        {slides.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
