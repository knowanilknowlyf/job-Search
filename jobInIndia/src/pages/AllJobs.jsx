import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { SearchContainer } from "../components";
import JobsContainer from "../components/jobsContainer";

export const allJobsLoader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("./jobs");
    return data;
  } catch (error) {
    toast.error(error?.reaponse?.data?.msg);
    return error;
  }
};
const AllJobContext = createContext();
const AllJobs = () => {
  const data = useLoaderData();
  return (
    <AllJobContext.Provider value={{data}}>
      {/* <SearchContainer /> */}
      <JobsContainer />
    </AllJobContext.Provider>
  );
};
export const useAllJobContext=()=>useContext(AllJobContext)
export default AllJobs;
