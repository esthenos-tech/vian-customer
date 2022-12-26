import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import Chart from "react-apexcharts";

class GoalOverview extends React.Component {
  state = {
    options: {
      chart: {
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1,
        },
      },
      colors: [this.props.success],
      plotOptions: {
        radialBar: {
          size: 110,
          startAngle: -140,
          endAngle: 150,
          hollow: {
            size: "77%",
          },
          track: {
            background: this.props.strokeColor,
            strokeWidth: "50%",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: 18,
              color: this.props.strokeColor,
              fontSize: "4rem",
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#00b5b5"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
    },
  };
  render() {
    const disbursement_static = [
      {
        _id: {
          disbursement_date: "2022-06-20",
          month: 1,
          partner: "ziel",
          year: 2022,
        },
        total_amount: 6814252,
        total_loans: 20,
      },
    ];
    const applied_static = [
      {
        _id: {
          submission_date: "2022-06-20",
          month: 1,
          partner: "ziel",
          year: 2022,
        },
        total_amount: 9914252,
        total_loans: 22,
      },
    ];
    const customDefaultDate = this.props.customDefaultDate;
    const disbursement = disbursement_static.filter(
      (dt) =>
        dt["_id"].disbursement_date <= customDefaultDate[1] &&
        dt["_id"].disbursement_date >= customDefaultDate[0]
    );
    const applied = applied_static.filter(
      (dt) =>
        dt["_id"].submission_date <= customDefaultDate[1] &&
        dt["_id"].submission_date >= customDefaultDate[0]
    );

    const totalDisbursedAmount = Math.round(
      disbursement.reduce((total, app) => total + app.total_amount, 0)
    );

    const totalAppliedAmount = Math.round(
      applied.reduce((total, app) => total + app.total_amount, 0)
    );

    var conversionRatioPercentage;
    if (totalDisbursedAmount === 0 || totalAppliedAmount === 0) {
      conversionRatioPercentage = 0;
    } else {
      conversionRatioPercentage = parseInt(
        (totalDisbursedAmount / totalAppliedAmount) * 100
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Goal</CardTitle>
        </CardHeader>
        <CardBody>
          <Chart
            options={this.state.options}
            series={[conversionRatioPercentage]}
            type="radialBar"
            height={260}
          />
        </CardBody>
        <div className="d-flex mt-2">
          <div className="completed border-top border-right text-center w-50 py-1">
            <p className="mb-50">Applied Amt</p>
            <p className="text-bold-600 mb-50">{`\u20B9 ${totalAppliedAmount.toLocaleString(
              "en-IN"
            )}`}</p>
          </div>
          <div className="in-progress border-top border-right text-center w-50 py-1">
            <p className="mb-50">Disbursed Amt</p>
            <p className="text-bold-600 mb-50">{`\u20B9 ${totalDisbursedAmount.toLocaleString(
              "en-IN"
            )}`}</p>
          </div>
        </div>
      </Card>
    );
  }
}
export default GoalOverview;
