import React from "react";
import Chart from "react-apexcharts";
import Flatpickr from "react-flatpickr";
import { Calendar } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "reactstrap";

const FailureReasonChart = ({ info, direction }) => {
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "35%",
        columnWidth: "10%",
        borderRadius: [5],
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    colors: info,
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      show: false,
      categories: [
        "Poor CB score",
        "Eligibility criteria",
        "KYC verification failed",
        "Haigh DPD",
        "Job stability",
        "Insufficient income",
        "Existing Loans",
      ],
    },
    yaxis: {
      show: false,
      opposite: direction === "rtl",
    },
  };

  // ** Chart Series
  const series = [
    {
      name: ["Applications"],
      data: [700, 350, 480, 600, 210, 550, 150],
    },
  ];

  return (
    <Card>
      <CardHeader className="d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start">
        <div>
          <CardTitle className="fw-bolder" tag="h4">
            Failed Applications
          </CardTitle>
          <CardSubtitle>3,040</CardSubtitle>
        </div>
        <div className="d-flex align-items-center mt-md-0 mt-1">
          <Calendar size={17} />
          <Flatpickr
            className="form-control flat-picker bg-transparent border-0 shadow-none"
            options={{
              mode: "range",
              defaultDate: [
                new Date(),
                new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
              ],
            }}
          />
        </div>
      </CardHeader>
      <CardBody className="pt-0" style={{ marginTop: "-20px" }}>
        <Chart options={options} series={series} type="bar" height={250} />
      </CardBody>
    </Card>
  );
};

export default FailureReasonChart;
