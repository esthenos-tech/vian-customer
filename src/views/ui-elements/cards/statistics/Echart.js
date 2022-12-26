// ** Third Party Components
import React from "react";
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "reactstrap";

const Echart = () => {
  const donutColors = {
    series1: "#826af9",
    series2: "#d2b0ff",
    series3: "#FFA1A1",
  };

  // ** Chart Options
  const options = {
    legend: {
      show: true,
      position: "bottom",
    },
    labels: ["NTC", "NTV", "ETV"],

    colors: [donutColors.series1, donutColors.series2, donutColors.series3],
    dataLabels: {
      enabled: false,
      formatter(val) {
        return `${parseInt(val)}%`;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: "2rem",
              fontFamily: "Montserrat",
            },
            value: {
              fontSize: "1rem",
              fontFamily: "Montserrat",
              formatter(val) {
                return `${parseInt(val)}%`;
              },
            },
            total: {
              show: true,
              fontSize: "1.5rem",
              label: "Disbursed",
              formatter() {
                return " ₹ 68,14,252 ";
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: "1.5rem",
                  },
                  value: {
                    fontSize: "1rem",
                  },
                  total: {
                    fontSize: "1.5rem",
                  },
                },
              },
            },
          },
        },
      },
    ],
  };

  // ** Chart Series
  const series = [745, 470, 430];

  return (
    <Card>
      <CardHeader>
        <div>
          {/* <CardTitle className='mb-75' tag='h4'>
            Expense Ratio
          </CardTitle> */}
        </div>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type="donut" height={350} />
      </CardBody>
    </Card>
  );
};

export default Echart;
