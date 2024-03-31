"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs";
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

function authAndRedirect(): string {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return userId;
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = authAndRedirect();

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    createAndEditJobSchema.parse(values);

    const job: JobType = await prisma.job.create({
      data: { ...values, clerkId: userId },
    });

    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
}

type TGetAllJobsActionType = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: TGetAllJobsActionType): Promise<{
  jobs: JobType[];
  count: number;
  totalPages: number;
  page: number;
}> {
  const clerkId = authAndRedirect();

  try {
    let whereQuery: Prisma.JobWhereInput = {
      clerkId,
    };

    console.log("awal where:", whereQuery);

    if (search) {
      whereQuery = {
        ...whereQuery,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      };
    }

    if (jobStatus && jobStatus !== "all") {
      whereQuery = {
        ...whereQuery,
        status: jobStatus,
      };
    }

    console.log("akhir where:", whereQuery);

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereQuery,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    console.log(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}
