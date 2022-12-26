import React from "react";

export const AddMoreFileLabelContent = (type) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="content-label">Drag &amp; drop to add more files</div>

      <div className="content-label">or</div>

      <div className="btn btn-primary mt-5 shadow">Browse files</div>

      <div className="inform-csv">
        <span className="d-inline text-danger" style={{ fontSize: "14px" }}>
          *
        </span>{" "}
        Upload {type} file only
      </div>
    </div>
  );
};
