import React, { useState, useRef } from "react";
import MultiDatePicker from "./Component/MultiDatePicker";
import SelectState from "./Component/SelectState";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Card, CardBody, CardHeader, CardTitle, Col } from "reactstrap";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import moment from "moment";

const format = "YYYY/MM/DD";

const UpdateCollectionDates = ({ handlerSubmitUpdateCollection }) => {
  const stateRef = useRef();
  const dateRef = useRef();

  const [fieldValues, setFieldValues] = useState();
  const validate = Yup.object({
    states_code: Yup.array().required("This field is required"),
    collection_dates: Yup.array().required("This field is required"),
  });

  return (
    <Formik
      initialValues={{
        collection_dates: [],
        states_code: [],
      }}
      validationSchema={validate}
      onSubmit={(updateCollectionFormData, { resetForm }) => {
        handlerSubmitUpdateCollection(updateCollectionFormData);
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
            <Card>
              <CardHeader>
                <CardTitle>Update Collection Dates</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col-4">
                    <SelectState
                      name="Select_State"
                      id="Select_State"
                      placeholder="Select a state"
                      onChange={(option) => {
                        if (option) {
                          formik.setFieldValue(
                            "states_code",
                            option.map((op) => op.value)
                          );
                        } else {
                          formik.setFieldValue("states_code", []);
                        }
                      }}
                      ref={stateRef}
                    />
                  </div>
                  <div className="col-4">
                    <div style={{ textAlign: "start" }}>
                      <div className="input-text-label">
                        Select Dates
                        <span className="mandate-field text-label">*</span>
                      </div>
                      <DatePicker
                        value={fieldValues}
                        onChange={(option) => {
                          if (option) {
                            formik.setFieldValue(
                              "collection_dates",
                              option.map((date) => date.format())
                            );
                          } else {
                            formik.setFieldValue("collection_dates", []);
                          }
                        }}
                        multiple
                        placeholder="Select the dates"
                        sort
                        format={format}
                        calendarPosition="bottom-center"
                        plugins={[<DatePanel />]}
                        ref={dateRef}
                      />
                    </div>
                  </div>
                  <div className="col-4  d-flex align-items-start justify-content-end pr-3 pt-2">
                    <button className="btn btn-primary" type="submit">
                      Add
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateCollectionDates;
