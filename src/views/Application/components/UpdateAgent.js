import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import Select from "react-select";

const UpdateAgent = ({
  handlerSubmitApplicationUpdateStatus,
  data,
  loading,
  heading,
  update_type_Value,
  inetialValues,
  namedValues,
}) => {
  const selectRef = useRef();
  const [pointer, setPointer] = useState("not-allowed");

  return (
    <Formik
      initialValues={inetialValues}
      onSubmit={(values, { resetForm }) => {
        const payload = {
          ...values,
          update_type: update_type_Value,
        };
        handlerSubmitApplicationUpdateStatus(payload);
        selectRef.current.select.clearValue();
        resetForm();
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
            <div className="d-flex">
              <h5 for="name">{heading}</h5>
              <span className="mandate-field text-label">*</span>
            </div>
            <Select
              className="react-select px-2"
              classNamePrefix="select"
              ref={selectRef}
              label="Select Status"
              isLoading={loading}
              name={namedValues}
              id={namedValues}
              options={data}
              placeholder="Select Status"
              onChange={(option) => {
                if (option) {
                  setFieldValue(namedValues, option.value);
                  setPointer("pointer");
                } else {
                  setFieldValue(namedValues, "");
                  setPointer("not-allowed");
                }
              }}
            />
            <div className="d-flex justify-content-center">
              {pointer === "pointer" ? (
                <button
                  className="btn btn-primary mt-1"
                  style={{ cursor: pointer }}
                  type="submit"
                >
                  Submit
                </button>
              ) : (
                <button
                  className="btn btn-primary mt-1"
                  style={{ cursor: pointer }}
                  type="submit"
                  disabled
                >
                  Submit
                </button>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateAgent;
