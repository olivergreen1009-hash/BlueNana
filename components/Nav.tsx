"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/ideas", label: "Ideas", icon: IdeasIcon },
  { href: "/wins", label: "My Wins", icon: WinsIcon },
] as const;

export function Nav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith("/better");
    }
    if (href === "/ideas") {
      return pathname === "/ideas" || pathname.startsWith("/ideas/");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 bg-white/95 backdrop-blur-md"
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-[26rem] items-stretch justify-around px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-w-[5.5rem] flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                active
                  ? "text-bluenana"
                  : "text-slate-500 hover:text-bluenana"
              }`}
            >
              <Icon active={active} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  const fill = active ? "#1A5AD7" : "none";
  const stroke = active ? "#1A5AD7" : "#94a3b8";
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IdeasIcon({ active }: { active: boolean }) {
  const stroke = active ? "#1A5AD7" : "#94a3b8";
  const fill = active ? "#1A5AD7" : "none";
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M9 18h6M10 22h4M12 3a6 6 0 0 0-3 11v2h6v-2a6 6 0 0 0-3-11Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WinsIcon({ active }: { active: boolean }) {
  const fill = active ? "#1A5AD7" : "none";
  const stroke = active ? "#1A5AD7" : "#94a3b8";
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 3l2.2 5.3 5.8.5-4.4 3.8 1.3 5.7L12 16.2l-5.3 2.1 1.3-5.7-4.4-3.8 5.8-.5L12 3Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
