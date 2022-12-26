import React from "react";
import { ErrorMessage } from "formik";
function CustError({ name }) {
  return (
    <ErrorMessage
      component="div"
      name={name}
      style={{
        color: "red",
        fontSize: ".8rem",
        position: "absolute",
        bottom: "15px",
      }}
    />
  );
}

export default CustError;
