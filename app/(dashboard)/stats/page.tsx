import { getChartsDataAction, getStatsAction } from "@/utils/statActions";
import React from "react";

export default async function StatsPage() {
  const stats = await getChartsDataAction();
  console.log(stats);
  
  
  return <div>StatsPage</div>;
}
