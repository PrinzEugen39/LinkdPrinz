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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const search = formData.get("search") as string;
    const jobStatus = formData.get("jobStatus") as string;

    console.log(search, jobStatus);
  };

  return (
    <form
      className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      <Input placeholder="Search job" type="text" name="search" />
      <Select name="jobStatus">
        <SelectTrigger>
          <SelectValue placeholder="all" />
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
