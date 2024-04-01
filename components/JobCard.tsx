import { JobStatus, JobType } from "@/utils/types";
import { MapPin, Briefcase, CalendarDays, RadioTower } from "lucide-react";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import JobDelete from "./JobDelete";
import JobInfo from "./JobInfo";

export default function JobCard({ job }: { job: JobType }) {
  const date = new Date(job.createdAt).toLocaleDateString();
  const isDeclined = job.status === JobStatus.Declined

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle className="capitalize"> {job.position} </CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>

      <Separator className="my-2 bg-primary-foreground" />

      <CardContent className="mt-4 grid grid-cols-2 gap-4">
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <Badge
          variant={isDeclined ? "destructive" : "default"}
          className="w-32 justify-center"
        >
          <JobInfo icon={<RadioTower className="size-4"/>} text={job.status} />
        </Badge>
      </CardContent>

      <CardFooter className="flex gap-4">
        <Button asChild size={"sm"}>
          <Link href={`/jobs/${job.id}`}>Edit</Link>
        </Button>
        <JobDelete id={job.id}/>
      </CardFooter>
    </Card>
  );
}
