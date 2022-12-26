import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import React, { useState } from "react";
import "./Reports.scss";
import "flatpickr/dist/themes/light.css";
import ReportForm from "../components/Reports/Forms/ReportForm";
import { ReportsData } from "../components/Reports/ReportData";
import moment from "moment";
import { toast } from "react-toastify";
import { sendReports } from "../components/dataLayer/Reports/ReportsLayer";
import { Card, CardBody, CardHeader, CardTitle, Col } from "reactstrap";
import { css } from "glamor";

const Reports = () => {
  const [reportData, setReportData] = useState({});

  const handlerReport = (reportDetails, report_name) => {
    const payload = {
      ...reportDetails,
      report_name,
      report_start_date: moment(reportDetails.report_start_date).format(
        "DD-MM-YYYY"
      ),
      report_end_date: moment(reportDetails.report_end_date).format(
        "DD-MM-YYYY"
      ),
    };
    setReportData(payload);
    handlerSendReport(payload);
  };

  const handlerSendReport = async (payload) => {
    const response = await sendReports(payload);
    if (response && response.data && response.data.results) {
      if (response.data.results) {
        toast.success(response.data.results, {
          className: css({
            width: "635px !important",
          }),
          position: "top-right",
          autoClose: 7000,
        });
        return;
      }
    }
  };
  return (
    <>
      <Card className="report-container">
        <CardBody>
          <Col lg="12" md="12" sm="12">
            <div className="tab-content">
              <div className="tab-pane active" id="reports">
                {ReportsData.map((report, index) => (
                  <div className="row" key={index}>
                    <Col md="3" xs="12" className="report-sub-head px-0">
                      <span className="sub-head-text ">{report.name}</span>
                    </Col>
                    <ReportForm
                      customClass="col-md-9"
                      initialValues={report.initialValues}
                      validateSchema={report.validateSchema}
                      buttonName={report.buttonName}
                      handlerReport={handlerReport}
                      isDisabledField={report.isDisabledField}
                      menuPlacement={report.menuPlacement}
                      report_name={report.report_name}
                    />
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </CardBody>
      </Card>
    </>
  );
};

export default Reports;
