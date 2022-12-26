import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form } from "formik";
import { Label } from "reactstrap";
import Select from "react-select";
import { getteStatusDropdown } from "../../../components/dataLayer/ApplicationLayer";
import * as Yup from "yup";
import TextArea from "./FormInputComponents/TextArea";

const UpdateRegistrationReadyForm = ({
  handlerSubmitRegistrationReady,
  update_type,
  inetialValues,
}) => {
  const textRef = useRef();
  const validate = Yup.object({
    cm_comments: Yup.string(),
  });

  return (
    <Formik
      initialValues={inetialValues}
      validationSchema={validate}
      onSubmit={(values) => {
        const payload = {
          ...values,
          update_type: update_type,
        };
        handlerSubmitRegistrationReady(payload);
        debugger;
      }}
    >
      {(formik) => {
        const {
          values,
          touched,
          errors,
          handleSubmit,
          handleChange,
          handleBlur,
          handleReset,
          setFieldValue,
        } = formik;

        return (
          <Form>
            <TextArea
              label="Move to Registration Ready(Reflow)"
              name="cm_comments"
              rows="6"
              ref={textRef}
              placeholder="CM comments..."
            />
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary mt-1" type="submit">
                Submit
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateRegistrationReadyForm;
