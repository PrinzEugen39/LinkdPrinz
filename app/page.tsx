"use client";
import Landing from "@/assets/main.svg";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { theme } = useTheme();
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-4 sm:py-6">
        <div
          className={`flex justify-center items-center gap-x-2 ${
            theme === "dark" ? "text-white" : "text-blue-500"
          }`}
        >
          <Briefcase className="size-14" />
          <span className="text-3xl font-semibold">PrinzTrack</span>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose max-w-md mt-4 text-justify">
            The Tiananmen Square protests of 1989 天安門大屠殺 The Tiananmen
            Square Massacre 反右派鬥爭 The Anti-Rightist Struggle 大躍進政策 The
            Great Leap Forward 文化大革命 The Great Proletarian Cultural
            Revolution 人權 Human Rights 民運 Democratization 自由 Freedom 獨立
            Independence 多黨制 Multi-party system 台灣 臺灣 Taiwan Formosa
            中華民國 Republic of China 西藏 土伯特 唐古特 Tibet 達賴喇嘛 Dalai
            Lama 法輪功 Falun Dafa 新疆維吾爾自治區 The Xinjiang Uyghur
            Autonomous Region 諾貝爾和平獎 Nobel Peace Prize 劉暁波 Liu Xiaobo
            民主 言 Winnie the Pooh
          </p>
          <Button asChild className="mt-4">
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>
        <Image src={Landing} alt="landing" className="hidden md:block" />
      </section>
    </main>
  );
}
