import React from "react";
import StatisticsCard from "../../../../components/StatisticsCard/StatisticsCard";
import { Package } from "react-feather";
import moment from "moment";

class AppliedAmount extends React.Component {
  render() {
    const applied1 = {
      datewise: [
        {
          _id: {
            submission_date: "2022-06-07",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 225678,
          total_loans: 23,
        },
        {
          _id: {
            submission_date: "2022-06-08",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 5678,
          total_loans: 23,
        },
        {
          _id: {
            submission_date: "2022-06-09",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 1678,
          total_loans: 23,
        },
        {
          _id: {
            submission_date: "2022-06-10",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 1145678,
          total_loans: 23,
        },
        {
          _id: {
            submission_date: "2022-06-11",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 95678,
          total_loans: 23,
        },
        {
          _id: {
            submission_date: "2022-06-12",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 3678,
          total_loans: 23,
        },
        {
          _id: {
            submission_date: "2022-06-13",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 45678,
          total_loans: 23,
        },
        {
          _id: {
            submission_date: "2022-06-14",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 22678,
          total_loans: 23,
        },
        {
          _id: {
            submission_date: "2022-06-15",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 455678,
          total_loans: 23,
        },
        {
          _id: {
            submission_date: "2022-06-16",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 5678,
          total_loans: 23,
        },
        {
          _id: {
            submission_date: "2022-06-17",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 345678,
          total_loans: 23,
        },
        {
          _id: {
            submission_date: "2022-06-18",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 34578,
          total_loans: 13,
        },
        {
          _id: {
            submission_date: "2022-06-19",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 1784578,
          total_loans: 13,
        },
        {
          _id: {
            submission_date: "2022-06-20",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 33478,
          total_loans: 13,
        },
      ],
    };
    const customDefaultDate = this.props.customDefaultDate;
    const applied = applied1.datewise.filter(
      (dt) =>
        dt["_id"].submission_date <= customDefaultDate[1] &&
        dt["_id"].submission_date >= customDefaultDate[0]
    );
    const totalApps = applied.reduce(
      (total, app) => total + app.total_loans,
      0
    );
    const totalAmount = Math.round(
      applied.reduce((total, app) => total + app.total_amount, 0)
    ).toLocaleString("en-IN");
    const totalAmountArr = [
      {
        name: "Applied Amount",
        data: applied.map((amt) => amt.total_amount.toFixed(2)),
      },
    ];
    const appliedAmt = {
      chart: {
        id: "applied",
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      grid: {
        show: false,
      },
      colors: ["#FF9F43"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2.5,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.9,
          opacityFrom: 0.7,
          opacityTo: 0.5,
          stops: [0, 80, 100],
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: applied.map((date) =>
          moment(date["_id"]["submission_date"]).format("DD/MM/YYYY")
        ),
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        x: {
          show: true,
        },
        y: [
          {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return `\u20B9` + y.toFixed(2);
              }
              return y;
            },
          },
        ],
      },
    };

    return (
      <StatisticsCard
        icon={<Package className="warning" size={22} />}
        iconBg="warning"
        stat={`\u20B9${totalAmount}`} // "\u20B9" unicode for indian currency
        statTitle={`Total apps: ${totalApps}`}
        options={appliedAmt}
        series={totalAmountArr}
        type="area"
        cardTitle="Applied Amt"
      />
    );
  }
}
export default AppliedAmount;
