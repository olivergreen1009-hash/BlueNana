"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/wins", label: "My Wins" },
] as const;

export function Nav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-sky-100 bg-white/95 backdrop-blur-md"
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {items.map(({ href, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-w-[5.5rem] flex-col items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-sky-100 text-sky-900"
                  : "text-slate-600 hover:bg-sky-50 hover:text-sky-800"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
