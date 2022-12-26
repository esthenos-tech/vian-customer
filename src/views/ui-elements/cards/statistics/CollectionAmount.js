import React from "react";
import StatisticsCard from "../../../../components/StatisticsCard/StatisticsCard";
import { TrendingDown } from "react-feather";
import moment from "moment";

class CollectionAmount extends React.Component {
  render() {
    const collection1 = {
      datewise: [
        {
          _id: {
            collection_date: "2022-06-11",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 404578,
          total_loans: 23,
        },
        {
          _id: {
            collection_date: "2022-06-12",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 334578,
          total_loans: 1,
        },
        {
          _id: {
            collection_date: "2022-06-13",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 11678,
          total_loans: 23,
        },
        {
          _id: {
            collection_date: "2022-06-14",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 11478,
          total_loans: 23,
        },
        {
          _id: {
            collection_date: "2022-06-15",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 424678,
          total_loans: 16,
        },
        {
          _id: {
            collection_date: "2022-06-16",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 1178,
          total_loans: 1,
        },
        {
          _id: {
            collection_date: "2022-06-17",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 300678,
          total_loans: 5,
        },
        {
          _id: {
            collection_date: "2022-06-18",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 20078,
          total_loans: 2,
        },
        {
          _id: {
            collection_date: "2022-06-19",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 1514578,
          total_loans: 6,
        },
        {
          _id: {
            collection_date: "2022-06-20",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 30172,
          total_loans: 8,
        },
      ],
    };
    const customDefaultDate = this.props.customDefaultDate;
    const collection = collection1.datewise.filter(
      (dt) =>
        dt["_id"].collection_date <= customDefaultDate[1] &&
        dt["_id"].collection_date >= customDefaultDate[0]
    );
    const totalApps = collection.reduce(
      (total, app) => total + app.total_loans,
      0
    );
    const totalAmount = Math.round(
      collection.reduce((total, app) => total + app.total_amount, 0)
    ).toLocaleString("en-IN");
    const totalAmountArr = [
      {
        name: "Collection Amount",
        data: collection.map((amt) => amt.total_amount.toFixed(2)),
      },
    ];
    const collectionAmt = {
      chart: {
        id: "collection",
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
      colors: ["#7367F0"],
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
        categories: collection.map((date) =>
          moment(date["_id"]["collection_date"]).format("DD/MM/YYYY")
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
        icon={<TrendingDown className="primary" size={22} />}
        stat={`\u20B9${totalAmount}`} // "\u20B9" unicode for indian currency
        statTitle={`Total apps: ${totalApps}`}
        options={collectionAmt}
        series={totalAmountArr}
        type="area"
        cardTitle="Collection Amt"
      />
    );
  }
}
export default CollectionAmount;
