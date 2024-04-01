"use client";
import { navLinks } from "@/utils/links";

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export default function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();  

  return (
    <aside className="py-4 px-8 h-full bg-muted">
      <Link href={"/"}>
        <div
          className={`flex justify-center items-center gap-x-2 ${
            theme === "dark" ? "text-white" : "text-blue-500"
          }`}
        >
          <Briefcase className="size-14" />
          <span className="text-3xl font-semibold">PrinzTrack</span>
        </div>
      </Link>
      <div className="flex flex-col gap-y-4 mt-20">
        {navLinks.map((navLink) => {
          return (
            <Button
              asChild
              key={navLink.href}
              variant={pathname === navLink.href ? "default" : "link"}
            >
              <Link href={navLink.href} className="flex items-center gap-x-2">
                {navLink.icon}{" "}
                <span className="capitalize">{navLink.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
}
