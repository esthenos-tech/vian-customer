import React, { Component } from "react";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";
import * as Icon from "react-feather";
import Avatar from "@material-ui/core/Avatar";

class AverageRunningLoan extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle className="mb-2">Average Running Loan</CardTitle>
          <Row>
            <Col xs="2" className="text-center">
              <Avatar
                style={{
                  backgroundColor: "#e1cdfe",
                  borderRadius: "55px",
                  height: "55px",
                  width: "55px",
                }}
              >
                <Icon.ChevronsLeft size={22} color="#ab76f9" />
              </Avatar>
            </Col>
            <Col xs="2">
              <CardTitle className="pt-1 text-bold-600">- 2</CardTitle>
              <p className='card-text font-small-3 mb-0"'>56756</p>
            </Col>
            <Col xs="2" className="text-center">
              <Avatar
                style={{
                  backgroundColor: "#cdfafe",
                  borderRadius: "55px",
                  height: "55px",
                  width: "55px",
                }}
              >
                <Icon.ChevronsUp size={22} color="#00cfe8" />
              </Avatar>
            </Col>
            <Col xs="2 ">
              <CardTitle className="pt-1 text-bold-600">2 - 3</CardTitle>
              <p className="card-text font-small-3 mb-0">98756</p>
            </Col>
            <Col xs="2" className="text-center">
              <Avatar
                style={{
                  backgroundColor: "#fee3e7",
                  borderRadius: "55px",
                  height: "55px",
                  width: "55px",
                }}
              >
                <Icon.ChevronsRight size={22} color={"#ea5455"} />
              </Avatar>
            </Col>
            <Col xs="2">
              <CardTitle className="pt-1 text-bold-600">3 +</CardTitle>
              <p className='card-text font-small-3 mb-0"'>36756</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default AverageRunningLoan;
