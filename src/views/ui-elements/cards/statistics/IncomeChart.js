import React, { Component } from "react";
import { Card, CardTitle, CardText, CardBody, Row, Col } from "reactstrap";

class IncomeChart extends Component {
  render() {
    return (
      <Card>
        <CardBody style={{ padding: "0.7rem 1.5rem" }}>
          <CardTitle>Income</CardTitle>
          <Row>
            <Col xs="4" className="text-center border-right-warning">
              <CardText
                className="text-bold-600"
                style={{ marginBottom: "0px" }}
              >
                -20k
              </CardText>
              <small>246326</small>
            </Col>
            <Col xs="4" className="text-center border-right-warning">
              <CardText
                className="text-bold-600"
                style={{ marginBottom: "0px" }}
              >
                20-35k
              </CardText>
              <small>462326</small>
            </Col>
            <Col xs="4" className="text-center">
              <CardText
                className=" text-bold-600"
                style={{ marginBottom: "0px" }}
              >
                35k+
              </CardText>
              <small className="text-bold-600 text-danger">546326</small>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default IncomeChart;
