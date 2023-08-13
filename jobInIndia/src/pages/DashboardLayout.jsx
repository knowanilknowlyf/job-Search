/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from "react";
import Wrapper from "../assets/wrappers/Dashboard";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import customFetch from "../utils/customFetch";

export const dashboardLoader = async () => {
  try {
    const { data } = await customFetch("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const [themeColor, setThemeColor] = useState(isDarkThemeEnabled);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleDarkTheme = () => {
    const newThemeColor = !themeColor;
    setThemeColor(newThemeColor);
    localStorage.setItem("darkTheme", newThemeColor);
    document.body.classList.toggle("dark-theme", newThemeColor);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const logoutUser = async () => {
    await customFetch.get("/auth/logout");
    navigate("/");
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        themeColor,
        toggleSidebar,
        toggleDarkTheme,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{user}}/>
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
export default DashboardLayout;
