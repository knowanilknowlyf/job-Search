import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const BigSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${!showSidebar && "show-sidebar"}`}>
        <div className="content">
          <button type="button" onClick={toggleSidebar} className="close-btn">
            {/* <FaTimes /> */}
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar/>
        </div>
      </div>{" "}
    </Wrapper>
  );
};

export default BigSidebar;
