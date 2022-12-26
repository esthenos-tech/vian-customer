import React, { Component } from "react";
import { Card, CardTitle, CardText, CardBody, Row, Col } from "reactstrap";

class EducationChart extends Component {
  render() {
    return (
      <Card>
        <CardBody style={{ padding: "1rem 1.5rem" }}>
          <CardTitle>Education</CardTitle>
          <Row>
            <Col xs="4" className="text-center border-right-danger">
              <CardText
                className="text-bold-600"
                style={{ marginBottom: "0px" }}
              >
                10th-
              </CardText>
              <small>246326</small>
            </Col>
            <Col xs="4" className="text-center border-right-danger p-0">
              <CardText
                className="text-bold-600"
                style={{ marginBottom: "0px" }}
              >
                10th-Grad
              </CardText>
              <small className="text-bold-600 text-danger">846326</small>
            </Col>
            <Col xs="4" className="text-center">
              <CardText
                className="text-bold-600"
                style={{ marginBottom: "0px" }}
              >
                Grad+
              </CardText>
              <small>646326</small>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default EducationChart;
