import React, { useState } from "react";
import { Formik, Field } from "formik";
import "./style.scss";
import { Spinner } from "react-bootstrap";
import { Label } from "reactstrap";
import * as Yup from "yup";

const CheckBoxContainer = ({
  data,
  loading,
  handleSendCheckedData,
  HeadingText,
  name,
  inetialValues,
}) => {
  const [nameValue] = useState(name);
  return (
    <div>
      <Formik
        initialValues={inetialValues}
        onSubmit={async (values) => {
          await handleSendCheckedData(values);
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleSubmit,
            handleChange,
            handleBlur,
            handleReset,
            setFieldValue,
          } = props;
          return (
            <div onChange={handleSubmit} className=" mb-1">
              <div className="col">
                {loading ? (
                  <div className="text-center" style={{ marginTop: "12rem" }}>
                    <Spinner type="grow" color="primary" size="lg" />
                  </div>
                ) : (
                  <>
                    <Label for={HeadingText} className="mb-1">
                      {HeadingText}
                    </Label>
                    {data.map((options, index) => {
                      return (
                        <div
                          key={index}
                          role="group"
                          aria-labelledby="checkbox-group"
                        >
                          <label>
                            {/* <Field
                              type="radio"
                              name={nameValue}
                              value={options.code}
                            /> */}
                            <Field
                              type="checkbox"
                              name={nameValue}
                              value={options.code}
                              className="checkbox_container"
                            />
                            {options.name}
                          </label>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};
export default CheckBoxContainer;
