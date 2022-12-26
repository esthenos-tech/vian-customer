import React from "react";
// ** Third Party Components
import classnames from "classnames";
import { TrendingUp, Box, Users } from "react-feather";

import Avatar from "@material-ui/core/Avatar";

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import "./WelcomeCard.scss";
const StatsCard = ({ cols }) => {
  const data = [
    {
      title: "230k",
      subtitle: "Customer",
      color: "rgba(40, 199, 111, 0.15)",
      icon: <TrendingUp size={24} color={"#4CAF50"} />,
    },
    {
      title: "65",
      subtitle: "Partners",
      color: "rgba(255, 159, 67, 0.15)",
      icon: <Users size={24} color={"#ff9f43"} />,
    },
    {
      title: "1.423k",
      subtitle: "Products",
      color: "rgba(234, 84, 85, 0.15)",
      icon: <Box size={24} color={"#FF5252"} />,
    },
  ];

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols);
      const margin = index === 2 ? "sm" : colMargin[0];
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1,
          })}
        >
          <div className="d-flex align-items-center mt-1">
            <Avatar
              style={{
                backgroundColor: item.color,
                borderRadius: "50px",
                height: "50px",
                width: "50px",
              }}
              className="me-2"
            >
              {item.icon}
            </Avatar>
            <div className="pull-right">
              <h4 className="fw-bolder mb-0 float-right">{item.title}</h4>
              <CardText className="font-small-3 mb-0 float-right">
                {item.subtitle}
              </CardText>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">Statistics</CardTitle>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
