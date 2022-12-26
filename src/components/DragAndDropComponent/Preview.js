import React from "react";

import { GrDocumentCsv } from "react-icons/gr";

export const Preview = ({ meta }) => {
  const { name, percent, status } = meta;

  var percentage = percent + "%";
  return (
    <div className="container d-flex justify-content-center">
      <div className="row py-0 w-75 dzu-previewContainer">
        <div className="col-1">
          <GrDocumentCsv className="csv-icon " />
        </div>
        <div className="col-11">
          <div className="row">
            <div className="preview-title col-6 ">
              {name}, {Math.round(percent)}%,{" "}
            </div>
            <div className="d-inline-flex justify-content-end preview-title col-6">
              {status}
            </div>
          </div>
          <div className="progress-outer d-flex">
            <div className="progress w-100 mt-1">
              <div
                className="progress-bar progress-bar-info progress-bar-striped active"
                style={{
                  width: percentage,
                  boxShadow: "-1px 10px 10px rgba(91, 192, 222, 0.7)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
