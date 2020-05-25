import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ columnLabels, chartLabel, rawData }) => {
  const data = {
    labels: columnLabels,
    datasets: [
      {
        label: chartLabel,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: rawData,
      },
    ],
  };

  return (
    <div>
      <Bar
        data={data}
        height={200}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default BarChart;
