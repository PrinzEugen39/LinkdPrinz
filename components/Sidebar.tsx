"use client";
import Logo from "@/assets/image-removebg.png";
import { navLinks } from "@/utils/links";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <aside className="py-4 px-8 h-full bg-muted">
      <Image src={Logo} alt="logo" className="w-64 mx-auto" />
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
