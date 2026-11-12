"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome,
  IconHomeOutline,
  IconLightbulb,
  IconLightbulbOutline,
  IconStar,
  IconStarOutline,
} from "@/components/icons";

const items = [
  {
    href: "/",
    label: "Home",
    Icon: IconHome,
    IconOutline: IconHomeOutline,
  },
  {
    href: "/ideas",
    label: "Ideas",
    Icon: IconLightbulb,
    IconOutline: IconLightbulbOutline,
  },
  {
    href: "/wins",
    label: "My Wins",
    Icon: IconStar,
    IconOutline: IconStarOutline,
  },
] as const;

export function Nav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white"
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {items.map(({ href, label, Icon, IconOutline }) => {
          const active = isActive(href);
          const IconComp = active ? Icon : IconOutline;
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-w-[5.5rem] flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                active
                  ? "text-[#1A5AD7]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <IconComp
                size={24}
                className={active ? "text-[#1A5AD7]" : "text-slate-400"}
              />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
