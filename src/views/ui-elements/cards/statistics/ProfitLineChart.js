import React from "react";
import Chart from "react-apexcharts";
import { Card, CardBody } from "reactstrap";

const ProfitLineChart = ({ info }) => {
  const data = {
    title: "Average Income",
    statistics: "25k",
    series: [
      {
        data: [0, 20, 5, 30, 15, 45],
      },
    ],
  };

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    grid: {
      borderColor: "#EBEBEB",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: -30,
        bottom: -10,
      },
    },
    stroke: {
      width: 3,
    },
    colors: [info],
    series: [
      {
        data: [0, 20, 5, 30, 15, 45],
      },
    ],
    markers: {
      size: 2,
      colors: info,
      strokeColors: info,
      strokeWidth: 2,
      strokeOpacity: 1,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [
        {
          seriesIndex: 0,
          dataPointIndex: 5,
          fillColor: "#ffffff",
          strokeColor: info,
          size: 5,
        },
      ],
      shape: "circle",
      radius: 2,
      hover: {
        size: 3,
      },
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: "0px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      x: {
        show: false,
      },
    },
  };

  return data !== null ? (
    <Card className="card-tiny-line-stats">
      <CardBody className="pb-50" style={{ padding: "15px" }}>
        <h6>{data.title}</h6>
        <h2 className="fw-bolder mb-1">{data.statistics}</h2>
        <Chart options={options} series={data.series} type="line" height={70} />
      </CardBody>
    </Card>
  ) : null;
};

export default ProfitLineChart;
