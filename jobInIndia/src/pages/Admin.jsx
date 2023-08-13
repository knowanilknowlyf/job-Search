import React from "react";
import Wrapper from "../assets/wrappers/StatsContainer";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import { StatsItem } from "../components";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
export const adminLoader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("you are not the admin");
    return redirect("/dashboard");
  }
};
const Admin = () => {
  const { user, job } = useLoaderData();
  console.log(user, job);
  return (
    <Wrapper>
      <StatsItem
        title="Current User"
        count={user}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatsItem
        title="Current Jobs"
        count={job}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
