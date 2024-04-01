"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { JobStatus } from "@/utils/types";
import { Button } from "./ui/button";

export default function JobSearch() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const search = formData.get("search") as string;
    const jobStatus = formData.get("jobStatus") as string;

    let params = new URLSearchParams();
    params.set("search", search);
    params.set("jobStatus", jobStatus);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Search job"
        type="text"
        name="search"
        defaultValue={search}
      />
      
      <Select name="jobStatus">
        <SelectTrigger>
          <SelectValue placeholder={jobStatus} defaultValue={jobStatus} />
        </SelectTrigger>
        <SelectContent>
          {["all", ...Object.values(JobStatus)].map((job) => {
            return (
              <SelectItem key={job} value={job}>
                {job}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Button type="submit" variant={"outline"}>
        Search
      </Button>
    </form>
  );
}
