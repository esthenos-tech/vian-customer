import React from "react";
import { Card, CardBody } from "reactstrap";

const InternalServerError = ({ content }) => {
  return (
    <Card>
      <CardBody>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </CardBody>
    </Card>
  );
};

export default InternalServerError;
