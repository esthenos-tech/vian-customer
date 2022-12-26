import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardBody } from "reactstrap";
const OrdersBarChart = ({ warning }) => {
  const data = {
    title: "Income",
    statistics: "650",
    series: [
      {
        name: "2020",
        data: [650, 750, 600],
      },
    ],
  };
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["20k -", "20-30k", "35k +"],
    },
  };

  // const options = {
  //     chart: {
  //         stacked: true,
  //         toolbar: {
  //             show: false
  //         }
  //     },
  //     grid: {
  //         show: false,
  //         padding: {
  //             left: 0,
  //             right: 0,
  //             top: -15,
  //             bottom: -15
  //         }
  //     },
  //     plotOptions: {
  //         bar: {
  //             horizontal: false,
  //             columnWidth: '20%',
  //             borderRadius: [0, 5],
  //             colors: {
  //                 backgroundBarColors: ['#f3f3f3', '#f3f3f3', '#f3f3f3', '#f3f3f3', '#f3f3f3'],
  //                 backgroundBarRadius: 5
  //             }
  //         }
  //     },
  //     legend: {
  //         show: false
  //     },
  //     dataLabels: {
  //         enabled: false
  //     },
  //     colors: [warning],
  //     xaxis: {
  //         labels: {
  //             show: false
  //         },
  //         axisBorder: {
  //             show: false
  //         },
  //         axisTicks: {
  //             show: false
  //         }
  //     },
  //     yaxis: {
  //         show: false
  //     },
  //     tooltip: {
  //         x: {
  //             show: false
  //         }
  //     }
  // }

  return data !== null ? (
    <Card className="card-tiny-line-stats">
      <CardBody className="pb-50" style={{ padding: "15px" }}>
        <h6>{data.title}</h6>
        {/* <h2 className='fw-bolder mb-1'>{data.statistics}</h2> */}
        <div id="chart">
          <ReactApexChart
            options={options}
            series={data.series}
            height={20}
            type="bar"
          />
        </div>
        {/* <Chart options={options} series={data.series} type='bar' height={70} /> */}
      </CardBody>
    </Card>
  ) : null;
};

export default OrdersBarChart;
