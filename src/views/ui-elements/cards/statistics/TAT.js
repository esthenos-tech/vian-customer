import React from "react";
import Chart from "react-apexcharts";
import Flatpickr from "react-flatpickr";
import { Calendar } from "react-feather";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const TAT = (props) => {
  const data = {
    title: "Turn Around Time",
    last_days: ["Last 28 Days", "Last Month", "Last Year"],
    totalTicket: 163,
    newTicket: 5,
    openTicket: 63,
    responseTime: 120,
  };
  const options = {
      plotOptions: {
        radialBar: {
          size: 150,
          offsetY: 20,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: "65%",
          },
          track: {
            background: "#fff",
            strokeWidth: "100%",
          },
          dataLabels: {
            name: {
              offsetY: -5,
              fontFamily: "Montserrat",
              fontSize: "1rem",
            },
            value: {
              offsetY: 15,
              fontFamily: "Montserrat",
              fontSize: "1.714rem",
            },
          },
        },
      },
      colors: [props.danger],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: [props.primary],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        dashArray: 8,
      },
      labels: ["Conversion"],
    },
    series = [70];
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle tag="h4">{data.title}</CardTitle>
        <UncontrolledDropdown className="chart-dropdown">
          <DropdownToggle
            color=""
            className="bg-transparent btn-sm border-0 p-50"
          ></DropdownToggle>
          <DropdownMenu end>
            {data.last_days.map((item) => (
              <DropdownItem className="w-100" key={item}>
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <Row style={{ marginTop: "-40px" }}>
          <Col sm="2" className="d-flex flex-column flex-wrap text-center">
            <h1 className="font-large-2 fw-bolder mt-3 text-warning mb-0">
              {data.totalTicket}
            </h1>
            <CardText className="text-bold-500">Processing</CardText>
          </Col>
          <Col sm="10" className="d-flex justify-content-center">
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={250}
              id="support-tracker-card"
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between pt-2">
          <div className="text-center">
            <CardText className="mb-50 text-bold-500">Fastest</CardText>
            <span className="font-large-1 fw-bold text-bold-500 text-success">
              {data.newTicket} min
            </span>
          </div>
          <div className="text-center">
            <CardText className="mb-50  text-bold-500">Average</CardText>
            <span className="font-large-1 fw-bold text-bold-500">22hr</span>
          </div>
          <div className="text-center">
            <CardText className="mb-50  text-bold-500">Slowest </CardText>
            <span className="font-large-1 fw-bold text-bold-500">
              {data.responseTime}hr
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TAT;
