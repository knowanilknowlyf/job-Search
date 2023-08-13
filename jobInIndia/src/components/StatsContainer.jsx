import React from "react";
import StatsItem from "./StatsItem";
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = (props) => {
  console.log(props);
  return (
    <Wrapper>
      <StatsItem
        title="jobs pending"
        count={props.defaultStats.pending}
        color="#f59e0b"
        bcg="#fef3c7"
        icon={<FaSuitcaseRolling />}
      />
      <StatsItem
        title="Interview scheduled"
        count={props.defaultStats.interview}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
      <StatsItem
        title="jobs declined"
        count={props.defaultStats.declined}
        color="#d66a6a"
        bcg="#ffeeee"
        icon={<FaBug />}
      />
    </Wrapper>
  );
};

export default StatsContainer;
