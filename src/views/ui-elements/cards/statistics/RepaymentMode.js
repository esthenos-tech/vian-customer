import Avatar from "@material-ui/core/Avatar";
import React from "react";
import * as Icon from "react-feather";
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from "reactstrap";

const RepaymentMode = () => {
  const transactionsArr = [
    {
      title: "eNACH",
      color: "#a3d5ff",
      subtitle: "Electronic Transfers",
      amount: " ₹122k",
      Icon: <Icon.Pocket size={18} color="#042b4d" />,
    },
    {
      title: "NACH",
      color: "#c0fac0",
      subtitle: "Money Transfer",
      amount: " ₹423k",
      Icon: <Icon.Check size={18} color="#0d300d" />,
    },
    {
      title: "Wallet",
      color: "#f5c0bf",
      subtitle: "Add Money",
      amount: " ₹234k",
      Icon: <Icon.Briefcase size={18} color="#cc3d39" />,
    },
    {
      title: "Net Banking",
      color: "#ffdcab",
      subtitle: "Payment Processing",
      amount: " ₹323k",
      Icon: <Icon.TrendingUp size={18} color="#d97f00" />,
    },
    {
      title: "Cash",
      color: "#cff4ff",
      subtitle: "Payment",
      amount: " ₹241k",
      Icon: <Icon.CreditCard size={18} color="#025770" />,
    },
  ];

  const renderTransactions = () => {
    return transactionsArr.map((item, index) => {
      return (
        <Row className="match-height" key={index}>
          <Col sm="2 pt-1">
            <Avatar
              variant="rounded"
              style={{ backgroundColor: item.color, opacity: "0.5" }}
            >
              {item.Icon}
            </Avatar>
          </Col>
          <Col
            sm="6 pt-2 ml-1"
            style={{ paddingRight: "1px", marginBottom: "3px" }}
          >
            <h6 className="mb-0">{item.title}</h6>
            <small>{item.subtitle}</small>
          </Col>
          <Col sm="3 p-0 pt-1 ">
            <div className="text-success text-right text-bold-600 pt-1">
              {item.amount}
            </div>
          </Col>
        </Row>
      );
    });
  };

  return (
    <Card className="card-transaction">
      <CardHeader>
        <CardTitle tag="h4">Repayment Mode</CardTitle>
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  );
};

export default RepaymentMode;
