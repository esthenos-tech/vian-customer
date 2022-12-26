import React from "react";
import { useField } from "formik";
import "./styles.css";

const TextAreaRef = ({ label, ref, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <h5 htmlFor={props.id || props.name}>{label}</h5>
      <div className="d-flex justify-content-center mt-2 mb-1">
        <textarea className="text-area" {...field} {...props} ref={ref} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};
const TextArea = React.forwardRef(TextAreaRef);
export default TextArea;
