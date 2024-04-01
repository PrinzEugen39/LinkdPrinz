import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "./db";
import dayjs from "dayjs";

function authAndRedirect(): string {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return userId;
}

export async function getStatsAction(): Promise<{
  pending: number;
  interview: number;
  declined: number;
}> {
  const clerkId = authAndRedirect();

  try {
    const stats = await prisma.job.groupBy({
      where: {
        clerkId,
      },
      by: ["status"],
      _count: {
        status: true,
      },
    });
    // console.log("hitung");
    
    // console.log(stats);

    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      // console.log(acc);

      return acc;
    }, {} as Record<string, number>);

    const defaultStats = {
      pending: 0,
      interview: 0,
      declined: 0,
      ...statsObject,
    };

    return defaultStats;
  } catch (error) {
    console.log(error);
    redirect("/jobs");
  }
}

export async function getChartsDataAction(): Promise<
  Array<{ date: string; count: number }>
> {
  const userId = authAndRedirect();
  const sixMonthsAgo = dayjs().subtract(6, 'month').toDate();
  try {
    const jobs = await prisma.job.findMany({
      where: {
        clerkId: userId,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    let applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YYYY');

      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);

    return applicationsPerMonth;
  } catch (error) {
    redirect('/jobs');
  }
}