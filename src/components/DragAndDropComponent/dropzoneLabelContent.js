import React from "react";

export const dropzoneLabelContent = (name, type, subCategoryName) => {
  return (
    <div className="d-flex flex-column align-items-center mt-2">
      <div className="content-label">Drag &amp; drop your file here for</div>
      <div className="content-label-name">
        {name} {subCategoryName}
      </div>

      <div className="content-label">or</div>

      <div
        className="btn btn-primary mt-5 shadow"
        style={{
          backgroundColor: "#7367f08a !important",
          padding: "0.6rem 1.8rem",
        }}
      >
        Browse files
      </div>

      <div className="inform-csv">
        <span className="d-inline text-danger" style={{ fontSize: "14px" }}>
          *
        </span>
        Upload {type} file only
      </div>
    </div>
  );
};
