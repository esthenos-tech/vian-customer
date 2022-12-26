import React from "react";
// ** Third Party Components
import Chart from "react-apexcharts";
import Flatpickr from "react-flatpickr";
import { Calendar } from "react-feather";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Row, Col, CardBody } from "reactstrap";

const NewChart = () => {
  const columnColors = {
    series1: "#826af9",
    series2: "#d2b0ff",
    bg: "#FFA1A1",
  };

  // ** Chart Options
  const options = {
    chart: {
      type: "bar",
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "30%",
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "start",
    },
    colors: [columnColors.series1, columnColors.series2, columnColors.bg],
    stroke: {
      show: false,
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thrusday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    fill: {
      opacity: 1,
    },
  };

  const series = [
    {
      name: "NTC",
      data: [90, 120, 55, 100, 80, 125, 175],
    },
    {
      name: "NTV",
      data: [85, 100, 30, 40, 95, 90, 30],
    },
    {
      name: "ETV",
      data: [55, 70, 40, 60, 45, 100, 60],
    },
  ];

  return (
    <Card>
      <Row className="mb-0">
        <Col sm="7"></Col>
        <Col sm="5" className="pt-1">
          <div className="d-flex align-items-center mt-md-0 mt-1 mb-0 float-right pr-2">
            <Calendar size={17} />
            <Flatpickr
              className="form-control flat-picker bg-transparent border-0 shadow-none "
              options={{
                mode: "range",
                // eslint-disable-next-line no-mixed-operators
                defaultDate: [
                  new Date(),
                  new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
                ],
              }}
            />
          </div>
        </Col>
      </Row>

      <CardBody className="mt-0 pt-0">
        <Chart options={options} series={series} type="bar" height={300} />
      </CardBody>
    </Card>
  );
};

export default NewChart;
