import { ReactNode } from "react";
import { AppWindow, AreaChart, Layers } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  icon: ReactNode;
};

export const navLinks: NavLink[] = [
  {
    href: "/add-job",
    label: "add Job",
    icon: <Layers />,
  },
  {
    href: "/jobs",
    label: "jobs",
    icon: <AppWindow />,
  },
  {
    href: "/stats",
    label: "stats",
    icon: <AreaChart />,
  },
];
