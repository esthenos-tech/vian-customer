import React from "react";
// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

const Data2 = () => {
  const donutColors = {
    series1: "#ffe700",
    series2: "#826bf8",
    series3: "#4CAF50",
  };

  // ** Chart Options
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      parentHeightOffset: 0,
      dropShadow: {
        enabled: false,
        blur: 8,
        left: 1,
        top: 1,
        opacity: 0.2,
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    yaxis: {
      show: false,
    },
    colors: [donutColors.series1, donutColors.series2, donutColors.series3],
    xaxis: {
      categories: [
        "Enetrprise",
        "Education",
        "Two Wheeler",
        "Supply Chain",
        "Micro",
      ],
    },
    fill: {
      opacity: [1, 0.8],
    },
    stroke: {
      show: false,
      width: 0,
    },
    markers: {
      size: 0,
    },
    grid: {
      show: false,
      padding: {
        top: -20,
        bottom: -20,
      },
    },
  };

  // ** Chart Series
  const series = [
    {
      name: "Own Book",
      data: [41, 64, 81, 60, 42],
    },
    {
      name: "Co-Lending",
      data: [65, 46, 42, 25, 58],
    },
    {
      name: "Off Book",
      data: [35, 26, 52, 85, 18],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4"> Portfolio Build Up</CardTitle>
      </CardHeader>
      <CardBody style={{ marginTop: "-20px" }}>
        <Chart options={options} series={series} type="radar" height={300} />
      </CardBody>
    </Card>
  );
};

export default Data2;
