"use client";
import { getAllJobsAction } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import JobCard from "./JobCard";

export default function JobsList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";

  const pageNumber = Number(searchParams.get("page")) || 1;

  const { data, isPending } = useQuery({
    queryKey: ["jobs", search, jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  });

  const jobs = data?.jobs || [];

  if (isPending) {
    return <h2 className="text-xl font-medium capitalize">Loading...</h2>;
  }

  if (!jobs.length) {
    return <h2 className="text-xl font-medium capitalize">No jobs found</h2>;
  }

  return (
    <>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </>
  );
}
