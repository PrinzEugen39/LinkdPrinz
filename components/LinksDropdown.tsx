import { AlignLeft } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { navLinks } from "@/utils/links";
import Link from "next/link";

export default function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <Button variant={"outline"} size={"icon"}>
          <AlignLeft />
          <span className="sr-only">Toggle links</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 lg:hidden" align="start" sideOffset={25}>
        {navLinks.map((navLink) => {
          return (
            <DropdownMenuItem key={navLink.href}>
              <Link href={navLink.href} className="flex items-center gap-x-2">
                {navLink.icon}
                {navLink.label.slice(0, 1).toUpperCase() +
                  navLink.label.slice(1)}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
