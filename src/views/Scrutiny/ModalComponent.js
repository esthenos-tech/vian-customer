import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Select from "react-select";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const ModalComponent = ({
  title,
  modalIsOpen,
  options,
  handleFormClose,
  msg,
}) => {
  const [openState, setOPenState] = useState(false);

  const validateSchema = Yup.object({
    selectValue: Yup.string().required("This field is required"),
  });

  useEffect(() => {
    setOPenState(modalIsOpen);
  });
  return (
    <Formik
      initialValues={{
        selectValue: "",
      }}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        handleFormClose();
        toast.success(msg);
        resetForm();
      }}
      validationSchema={validateSchema}
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
          <form onSubmit={handleSubmit}>
            <Modal isOpen={openState}>
              <ModalHeader>{title}</ModalHeader>
              <ModalBody>
                <Select
                  classNamePrefix="select"
                  options={options}
                  placeholder="select"
                  name="selectValue"
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("selectValue", option.value);
                    } else {
                      setFieldValue("selectValue", "");
                    }
                  }}
                  onBlur={handleBlur}
                />

                {errors.selectValue && touched.selectValue && (
                  <div
                    className="input-feedback error-message text-left"
                    style={{ color: "red", fontSize: "0.8rem" }}
                  >
                    {errors.selectValue}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button className="btn btn-danger" onClick={handleFormClose}>
                  Close
                </button>
              </ModalFooter>
            </Modal>
          </form>
        );
      }}
    </Formik>
  );
};

export default ModalComponent;
