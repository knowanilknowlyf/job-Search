/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { FaCaretDown, FaUser, FaUserCircle } from "react-icons/fa";
import { useDashboardContext } from "../pages/DashboardLayout";

const LogOutContainer = () => {
  const { toggleDarkTheme, themeColor, user, logoutUser } =
    useDashboardContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => {
          setShowLogout(!showLogout);
        }}
      >
        {user.avatar ? (
          <img src={user.avatar} alt="user" className="img" />
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={`dropdown ${showLogout && "show-dropdown"}`}>
        <button
          type="button"
          onClick={() => {
            logoutUser();
            setShowLogout(!showLogout);
          }}
          className="dropdown-btn"
        >
          Logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogOutContainer;
