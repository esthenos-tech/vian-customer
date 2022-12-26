import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import Chart from "react-apexcharts";
import moment from "moment";

class DisbursementChart extends React.Component {
  state = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: [4, 2],
      },
      grid: {
        borderColor: this.props.labelColor,
      },
      legend: {
        show: false,
      },
      colors: ["#28C76F", this.props.strokeColor],
      markers: {
        size: 0,
        hover: {
          size: 5,
        },
      },
      xaxis: {
        tooltip: {
          enabled: false,
        },
        labels: {
          show: false,
        },
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          style: {
            color: this.props.strokeColor,
          },
          // formatter: (val) => {
          //   return val > 999 ? (val / 1000).toFixed(1) + "k" : val;
          // },
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return `\u20B9` + y.toFixed(2);
            }
            return y;
          },
        },
      },
    },
  };
  render() {
    const disbursement_static = [
      {
        _id: {
          disbursement_date: "2022-06-04",
          month: 1,
          partner: "ziel",
          year: 2022,
        },
        total_amount: 164222,
        total_loans: 20,
      },
      {
        _id: {
          disbursement_date: "2022-06-02",
          month: 6,
          partner: "slice",
          year: 2022,
        },
        total_amount: 5133,
        total_loans: 2,
      },
      {
        _id: {
          disbursement_date: "2022-05-31",
          month: 5,
          partner: "kb",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-05-31",
          month: 5,
          partner: "lk",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-05-31",
          month: 5,
          partner: "mv",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-05-31",
          month: 5,
          partner: "moc",
          year: 2022,
        },
        total_amount: 46200,
        total_loans: 1,
      },
      {
        _id: {
          disbursement_date: "2022-05-31",
          month: 5,
          partner: "smc",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-01",
          month: 6,
          partner: "kb",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-01",
          month: 6,
          partner: "moc",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-01",
          month: 6,
          partner: "es",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-01",
          month: 6,
          partner: "slice",
          year: 2022,
        },
        total_amount: 1101,
        total_loans: 2,
      },
      {
        _id: {
          disbursement_date: "2022-06-02",
          month: 6,
          partner: "mv",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-02",
          month: 6,
          partner: "moc",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-02",
          month: 6,
          partner: "kb",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-02",
          month: 6,
          partner: "chqbook",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-03",
          month: 6,
          partner: "kb",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-03",
          month: 6,
          partner: "lk",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-03",
          month: 6,
          partner: "mv",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-03",
          month: 6,
          partner: "slice",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-03",
          month: 6,
          partner: "zm",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-04",
          month: 6,
          partner: "zm",
          year: 2022,
        },
        total_amount: 102000,
        total_loans: 2,
      },
      {
        _id: {
          disbursement_date: "2022-06-04",
          month: 6,
          partner: "mv",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-05-31",
          month: 6,
          partner: "es",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-01",
          month: 6,
          partner: "es",
          year: 2022,
        },
        total_amount: 80450,
        total_loans: 2,
      },
      {
        _id: {
          disbursement_date: "2022-06-02",
          month: 6,
          partner: "kb",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-03",
          month: 6,
          partner: "slice",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-04",
          month: 6,
          partner: "zm",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-05",
          month: 6,
          partner: "slice",
          year: 2022,
        },
        total_amount: 600,
        total_loans: 6,
      },
      {
        _id: {
          disbursement_date: "2022-06-06",
          month: 6,
          partner: "zm",
          year: 2022,
        },
        total_amount: 51000,
        total_loans: 1,
      },
      {
        _id: {
          disbursement_date: "2022-06-07",
          month: 6,
          partner: "mv",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-08",
          month: 6,
          partner: "kb",
          year: 2022,
        },
        total_amount: 0,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-09",
          month: 6,
          partner: "smc",
          year: 2022,
        },
        total_amount: 545456,
        total_loans: 0,
      },
      {
        _id: {
          disbursement_date: "2022-06-10",
          month: 6,
          partner: "lk",
          year: 2022,
        },
        total_amount: 889687,
        total_loans: 50,
      },
      {
        _id: {
          disbursement_date: "2022-06-11",
          month: 6,
          partner: "es",
          year: 2022,
        },
        total_amount: 23872,
        total_loans: 2,
      },
      {
        _id: {
          disbursement_date: "2022-06-12",
          month: 6,
          partner: "mv",
          year: 2022,
        },
        total_amount: 87858,
        total_loans: 30,
      },
      {
        _id: {
          disbursement_date: "2022-06-13",
          month: 6,
          partner: "zm",
          year: 2022,
        },
        total_amount: 972000,
        total_loans: 3,
      },
      {
        _id: {
          disbursement_date: "2022-06-14",
          month: 6,
          partner: "es",
          year: 2022,
        },
        total_amount: 252570,
        total_loans: 19,
      },
      {
        _id: {
          disbursement_date: "2022-06-15",
          month: 6,
          partner: "kb",
          year: 2022,
        },
        total_amount: 383263,
        total_loans: 30,
      },
      {
        _id: {
          disbursement_date: "2022-06-16",
          month: 6,
          partner: "smc",
          year: 2022,
        },
        total_amount: 839875,
        total_loans: 50,
      },
      {
        _id: {
          disbursement_date: "2022-06-17",
          month: 6,
          partner: "es",
          year: 2022,
        },
        total_amount: 290240,
        total_loans: 4,
      },
      {
        _id: {
          disbursement_date: "2022-06-18",
          month: 6,
          partner: "ziel",
          year: 2022,
        },
        total_amount: 766252,
        total_loans: 40,
      },
      {
        _id: {
          disbursement_date: "2022-06-19",
          month: 6,
          partner: "kb",
          year: 2022,
        },
        total_amount: 336938,
        total_loans: 17,
      },
      {
        _id: {
          disbursement_date: "2022-06-20",
          month: 6,
          partner: "chqbook",
          year: 2022,
        },
        total_amount: 567324,
        total_loans: 24,
      },
    ];
    const currentCustomDate = this.props.customDefaultDate;
    const currentCustomDaysDiff = moment(currentCustomDate[1]).diff(
      moment(currentCustomDate[0]),
      "days"
    );
    const previousCustomDate = [
      currentCustomDate[0],
      moment(currentCustomDate[0])
        .subtract(currentCustomDaysDiff, "days")
        .format("YYYY-MM-DD"),
    ];
    let currentDisbursement = disbursement_static.filter(
      (dt) =>
        dt["_id"].disbursement_date <= currentCustomDate[1] &&
        dt["_id"].disbursement_date >= currentCustomDate[0]
    );
    const currentDisbursement2 = currentDisbursement.map((item) => ({
      x: moment(item._id.disbursement_date).format("DD/MM/YYYY"),
      y: item.total_amount,
    }));
    let previousDisbursement = disbursement_static.filter(
      (dt) =>
        dt["_id"].disbursement_date <= previousCustomDate[0] &&
        dt["_id"].disbursement_date >= previousCustomDate[1]
    );
    const previousDisbursement2 = previousDisbursement.map((item) => ({
      x: moment(item._id.disbursement_date).format("DD/MM/YYYY"),
      y: item.total_amount,
    }));
    const disbursementSeries = [
      {
        name: "Current Time Period",
        data: currentDisbursement2,
      },
      {
        name: "Previous Time Period",
        data: previousDisbursement2,
      },
    ];

    const currentDisbursementAmount = currentDisbursement.map(
      (amount) => amount.total_amount
    );

    const previousDisbursementAmount = previousDisbursement.map(
      (amount) => amount.total_amount
    );

    const totalCurrentDisbursement = currentDisbursementAmount.reduce(
      (a, b) => a + b,
      0
    );
    const totalPreviousDisbursement = previousDisbursementAmount.reduce(
      (a, b) => a + b,
      0
    );

    return (
      <Card>
        <CardHeader>
          <CardTitle>Disbursement</CardTitle>
        </CardHeader>
        <CardBody style={{ paddingTop: "5px", paddingBottom: "10px" }}>
          <div className="d-flex justify-content-start ">
            <div className="mr-2">
              <p className="mb-50 font-small-3">
                From {moment(currentCustomDate[0]).format("DD/MM/YYYY")} to{" "}
                {moment(currentCustomDate[1]).format("DD/MM/YYYY")}
              </p>
              <h4 className="text-bold-400">
                <span className="font-medium-5 mr-50">&#x20B9;</span>
                {/* indian currency symbol */}
                <span className="text-success">
                  {Math.round(totalCurrentDisbursement).toLocaleString("en-IN")}
                </span>
              </h4>
            </div>
            <div>
              <p className="mb-50 font-small-3">
                From {moment(previousCustomDate[1]).format("DD/MM/YYYY")} to{" "}
                {moment(previousCustomDate[0]).format("DD/MM/YYYY")}
              </p>
              <h4 className="text-bold-400">
                <span className="font-medium-5 mr-50">&#x20B9;</span>
                <span style={{ color: `${this.props.strokeColor}` }}>
                  {Math.round(totalPreviousDisbursement).toLocaleString(
                    "en-IN"
                  )}
                </span>
              </h4>
            </div>
          </div>
          <Chart
            options={this.state.options}
            series={disbursementSeries}
            type="line"
            height={260}
          />
        </CardBody>
      </Card>
    );
  }
}
export default DisbursementChart;
