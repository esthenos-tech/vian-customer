import React from "react";
import { Card, Row, Col, CardTitle, CardBody } from "reactstrap";

const SMAChart = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle></CardTitle>
        <Row className="mt-1">
          <Col xs="4" className="border-right-secondary">
            <div className="text-center" style={{ fontSize: "40px" }}>
              {" "}
              &#128533;
            </div>
            <div className="mt-1 ml-1 text-bold-600 ">SMA I</div>
            <div className="ml-2 text-danger text-bold-700">356</div>
          </Col>
          <Col xs="4" className="border-right-secondary">
            <div className="text-center" style={{ fontSize: "40px" }}>
              {" "}
              &#128532;
            </div>
            <div className="mt-1 ml-1 text-bold-600">SMA II</div>
            <div className="ml-2 text-danger text-bold-700">356</div>
          </Col>
          <Col xs="4">
            <div className="text-center" style={{ fontSize: "40px" }}>
              {" "}
              &#128542;
            </div>
            <div className="mt-1 ml-1 text-bold-600"> SAM IV</div>
            <div className="ml-2 text-danger text-bold-700">356</div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default SMAChart;
