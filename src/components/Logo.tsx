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
        src="/IVBase.png"
        alt="IV Base"
        width={48}
        height={48}
        className="h-10 w-10 object-contain md:h-12 md:w-12"
        priority
      />
    </Link>
  );
}
