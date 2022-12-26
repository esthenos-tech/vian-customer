import React from "react";
// ** Icons Imports
import { Award } from "react-feather";

// ** Custom Components
import Avatar from "@material-ui/core/Avatar";

// ** Reactstrap Imports
import { Card, CardBody, CardText, Row, Col } from "reactstrap";

// ** Images
import decorationLeft from "../../../../assets/img/elements/decore-left.png";
import decorationRight from "../../../../assets/img/elements/decore-right.png";
import "./WelcomeCard.scss";
const WelcomeCard = () => {
  return (
    <Card className="card-congratulations">
      <CardBody className="text-center">
        <img
          className="congratulations-img-left"
          src={decorationLeft}
          alt="decor-left"
        />
        <img
          className="congratulations-img-right"
          src={decorationRight}
          alt="decor-right"
        />
        <Avatar
          className="shadow-lg"
          style={{
            margin: "auto",
            backgroundColor: "transparent",
            borderRadius: "65px",
            height: "65px",
            width: "65px",
          }}
        >
          <Award size={28} />
        </Avatar>
        <div className="text-center">
          <h1 className=" text-white"> Welcome to eSthenos</h1>
          <p className="m-auto w-75 text-white" style={{ fontWeight: "500" }}>
            We have processed <strong>543</strong> applications today worth{" "}
            <strong>INR 13 Crs. 20% </strong>
            up from yesterday
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default WelcomeCard;
