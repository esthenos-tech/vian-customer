import React from "react";
// ** React Imports
import { useState } from "react";

// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ButtonGroup,
  Button,
} from "reactstrap";

const SimpleScatterChart = ({ direction, warning, primary, success }) => {
  // ** States
  const [active, setActive] = useState("daily");

  // ** Chart Options
  const ApexchartsXaxisTextsG = {
    display: "none",
  };
  const options = {
    chart: {
      zoom: {
        enabled: true,
        type: "xy",
      },
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "start",
    },
    colors: [warning, primary, success],

    xaxis: {
      tickAmount: 10,
      labels: {
        formatter(val) {
          return parseFloat(val).toFixed(1);
        },
      },
    },
    yaxis: {
      opposite: direction === "rtl",
    },
  };

  const series = [
    {
      name: "Enterprise",
      data: [
        [16.0, 250],
        [18.0, 210],
        [23.0, 200],
        [22.0, 340],
        [24.5, 220],
        [16.0, 120],
        [19.0, 160],
        [21.0, 450],
        [17.0, 240],
        [21.0, 190],
        [22.0, 90],
      ],
    },
    {
      name: "Education",
      data: [
        [11.0, 250],
        [12.0, 160],
        [22.0, 240],
        [14.0, 250],
        [11.5, 190],
        [15.0, 160],
        [16.0, 190],
        [21.0, 400],
        [23.0, 220],
        [21.0, 110],
        [13.0, 80],
      ],
    },
    {
      name: "Micro",
      data: [
        [14.0, 290],
        [13.0, 190],
        [20.0, 220],
        [21.0, 350],
        [21.5, 290],
        [22.0, 220],
        [23.0, 140],
        [19.0, 400],
        [20.0, 200],
        [22.0, 90],
        [20.0, 120],
      ],
    },
    {
      name: "Supply Chain",
      data: [
        [14.0, 220],
        [15.0, 280],
        [16.0, 230],
        [18.0, 320],
        [17.5, 280],
        [19.0, 250],
        [20.0, 350],
        [20.5, 320],
        [20.0, 320],
        [19.0, 280],
        [17.0, 280],
        [22.0, 300],
        [18.0, 120],
      ],
    },
    {
      name: "Two Wheeler",
      data: [
        [14.0, 220],
        [15.0, 280],
        [16.0, 230],
        [18.0, 320],
        [17.5, 280],
        [19.0, 250],
        [20.0, 350],
        [20.5, 320],
        [20.0, 320],
        [19.0, 280],
        [17.0, 280],
        [22.0, 300],
        [18.0, 120],
      ],
    },
  ];

  return (
    <Card>
      <CardHeader className="d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start">
        <CardTitle tag="h4">Collection </CardTitle>
        <ButtonGroup className="mt-md-0 mt-1">
          <Button
            active={active === "daily"}
            color="primary"
            outline
            onClick={() => setActive("daily")}
          >
            Daily
          </Button>
          <Button
            active={active === "monthly"}
            color="primary"
            outline
            onClick={() => setActive("monthly")}
          >
            Monthly
          </Button>
          <Button
            active={active === "yearly"}
            color="primary"
            outline
            onClick={() => setActive("yearly")}
          >
            Yearly
          </Button>
        </ButtonGroup>
      </CardHeader>
      <CardBody>
        <Chart
          options={options}
          series={series}
          className={ApexchartsXaxisTextsG}
          type="scatter"
          height={400}
        />
      </CardBody>
    </Card>
  );
};

export default SimpleScatterChart;
