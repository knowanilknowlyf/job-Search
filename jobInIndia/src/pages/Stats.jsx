import React from "react";
import { ChartContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const statsLoader = async () => {
  try {
    const response = await customFetch("jobs/stats");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();
  console.log(defaultStats, monthlyApplications);
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartContainer data={monthlyApplications} />
      )}
      
    </>
  );
};

export default Stats;
