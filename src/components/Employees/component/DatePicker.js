import React from "react";
import { ErrorMessage, useField } from "formik";
import { FormGroup, Input, Label } from "reactstrap";
import moment from "moment";

export const DatePickerSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // const { setFieldValue } = useFormikContext();
  var dtToday = new Date();
  const dateTime = moment(dtToday).format("YYYY-MM-DD");
  return (
    <>
      <div className="dates mb-1">
        <Label for={field.name}>{label}</Label>
        <span className="mandate-field text-label">*</span>

        <Input
          type="date"
          className={`form-control shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
          max={dateTime}
          autoComplete="off"
        />
        <ErrorMessage
          component="div"
          name={field.name}
          style={{ color: "red", fontSize: ".8rem", position: "relative" }}
        />
      </div>
    </>
  );
};
