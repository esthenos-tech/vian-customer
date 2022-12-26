import React, { Component } from "react";
import { Card, CardTitle, CardText, CardBody, Row, Col } from "reactstrap";

class CreditScore extends Component {
  render() {
    return (
      <Card>
        <CardBody style={{ padding: "0.7rem 1.5rem" }}>
          <CardTitle>Credit Score</CardTitle>
          <Row>
            <Col
              xs="4"
              className="text-center border-right-info"
              style={{ BorderRight: "1px solid #000000" }}
            >
              <CardText
                className="text-bold-600"
                style={{ marginBottom: "0px" }}
              >
                650-
              </CardText>
              <small>26326</small>
            </Col>
            <Col
              xs="4"
              className="text-center border-right-info"
              style={{ BorderRight: "1px solid #000000" }}
            >
              <CardText
                className="text-bold-600"
                style={{ marginBottom: "0px" }}
              >
                650-700
              </CardText>
              <small className="text-bold-600 text-danger">56326</small>
            </Col>
            <Col xs="4" className="text-center">
              <CardText
                className="text-bold-600"
                style={{ marginBottom: "0px" }}
              >
                700+
              </CardText>
              <small>46326</small>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default CreditScore;
