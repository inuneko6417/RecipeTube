"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RecipeTabs() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/recipes/everyonePosts",
      label: "🏠 みんなの投稿",
    },
    {
      href: "/recipes",
      label: "+ 投稿",
    },
    {
      href: "/recipes/favorites",
      label: "❤️ お気に入り",
    },
  ];

  return (
    <div className="flex gap-3">
      {navItems.map((item) => {
        // 今いるページなら表示しない
        if (pathname === item.href) return null;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-2 rounded-xl text-black border border-black transition duration-500 hover:-translate-y-2"
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
