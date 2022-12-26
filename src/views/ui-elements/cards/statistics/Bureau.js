import React, { Component } from "react";
// ** Icons Imports
import * as Icon from "react-feather";
// import Avatar from '../../../../assets/scss/components/avatar.scss'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

const CardTransactions = () => {
  const transactionsArr = [
    {
      title: "Wallet",
      color: "light-primary",
      subtitle: "Starbucks",
      amount: "- $74",
      Icon: Icon["Pocket"],
      down: true,
    },
    {
      title: "Bank Transfer",
      color: "light-success",
      subtitle: "Add Money",
      amount: "+ $480",
      Icon: Icon["Check"],
    },
    {
      title: "Paypal",
      color: "light-danger",
      subtitle: "Add Money",
      amount: "+ $590",
      Icon: Icon["DollarSign"],
    },
    {
      title: "Mastercard",
      color: "light-warning",
      subtitle: "Ordered Food",
      amount: "- $12",
      Icon: Icon["CreditCard"],
      down: true,
    },
    {
      title: "Transfer",
      color: "light-info",
      subtitle: "Refund",
      amount: "+ $98",
      Icon: Icon["TrendingUp"],
    },
  ];

  const renderTransactions = () => {
    return transactionsArr.map((item) => {
      return (
        <div key={item.title} className="transaction-item">
          <div className="d-flex">
            {/* <Avatar className='rounded' color={item.color} icon={<item.Icon size={18} />} /> */}
            <item.Icon size={18} color={item.color} />
            <div>
              <h6 className="transaction-title">{item.title}</h6>
              <div
                className={`fw-bolder text-right ${
                  item.down ? "text-danger" : "text-success"
                }`}
              >
                {item.amount}
              </div>
              <small>{item.subtitle}</small>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <Card className="card-transaction">
      <CardHeader>
        <CardTitle tag="h4">Transactions</CardTitle>
        <Icon.MoreVertical size={18} className="cursor-pointer" />
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  );
};

export default CardTransactions;
