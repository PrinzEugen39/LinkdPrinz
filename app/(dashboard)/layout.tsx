import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

interface IDashboard {
  children: ReactNode;
}

export default function DashboardLayout({ children }: IDashboard) {
  return (
    <main className="grid lg:grid-cols-5 divide-x">
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen">
        <Sidebar />
      </div>
      <div className="lg:col-span-4 divide-y">
        <Navbar />
        <div className="py-16 px-4 sm:px-8 lg:px-16">{children}</div>
      </div>
    </main>
  );
}
