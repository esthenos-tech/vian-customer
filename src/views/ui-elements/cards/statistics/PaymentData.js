import React from "react";
import * as Icon from "react-icons/fc";
import { Row, Col, Card, CardBody } from "reactstrap";

const PaymentData = () => {
  const transactionsArr = [
    {
      title: "Ontime payment",
      color: "#f5c0bf",
      amount: "90%",
      class: "h6 border-bottom-secondary pb-1",
      fontWeight: "800",
      Icon: <Icon.FcAcceptDatabase size={24} />,
    },
    {
      title: "Payment after follow-ups",
      color: "#ffdcab",
      amount: "8%",
      class: "h6 border-bottom-secondary pb-1",
      fontWeight: "700",
      Icon: <Icon.FcExternal size={24} />,
    },
    {
      title: "Non-payment",
      color: "#cff4ff",
      amount: "2%",
      class: "h6",
      fontWeight: "800",
      Icon: <Icon.FcExpired size={24} />,
    },
  ];
  const renderTransactions = () => {
    return transactionsArr.map((item, index) => {
      return (
        <Row className="match-height" key={index}>
          <Col sm="2 " style={{ margin: "7px 0px" }}>
            {item.Icon}
          </Col>
          <Col sm="8 pr-0 " style={{ margin: "7px 0px", paddingLeft: "7px" }}>
            <p className={`mb-0 text-dark ${item.class}`}>{item.title}</p>
          </Col>
          <Col sm="2 pl-0" style={{ margin: "7px 0px" }}>
            <p
              className="text-primary text-right"
              style={{ fontWeight: "800" }}
            >
              {item.amount}
            </p>
          </Col>
        </Row>
      );
    });
  };
  return (
    <Card className="card-transaction">
      <CardBody className="pt-1 pb-1">{renderTransactions()}</CardBody>
    </Card>
  );
};

export default PaymentData;
