import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex ${className}`}
      aria-label="GTA6Base home"
    >
      <Image
        src="/logos/VIBase.png"
        alt="VI Base"
        width={120}
        height={80}
        className="h-10 w-auto object-contain md:h-12"
        priority
      />
    </Link>
  );
}
