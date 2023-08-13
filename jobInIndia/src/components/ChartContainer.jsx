import React, { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import BarchartContainer from "./BarchartContainer";
import AreachartContainer from "./AreachartContainer";

const ChartContainer = ({ data }) => {
  let [barChart, setBarChart] = useState(false);

  return (
    <Wrapper>
      <h4>Monthly Application</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (
        <BarchartContainer data={data} />
      ) : (
        <AreachartContainer data={data} />
      )}
    </Wrapper>
  );
};

export default ChartContainer;
