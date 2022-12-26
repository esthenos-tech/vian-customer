import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import React, { useState, useEffect } from "react";
import "./OriginatorReports.scss";
import "flatpickr/dist/themes/light.css";
import ReportForm from "../../components/OriginatorsReports/Forms/ReportForm";
import {
  ReportsData,
  AdvanceReportsData,
} from "../../components/OriginatorsReports/ReportData";
import moment from "moment";
import { toast } from "react-toastify";
import {
  sendReports,
  getReportsPartners,
} from "../../components/dataLayer/OriginatorReports/OriginatorsReportsLayer";
import { Card, CardBody, CardHeader, CardTitle, Col } from "reactstrap";
import { css } from "glamor";

const OriginatorReports = () => {
  const [reportData, setReportData] = useState({});
  const [reportType, setReportType] = useState("");

  const handlerReport = (reportDetails, reportType) => {
    const payload = {
      ...reportDetails,
      start_date: moment(reportDetails.start_date).format("DD-MM-YYYY"),
      end_date: moment(reportDetails.end_date).format("DD-MM-YYYY"),
    };
    setReportData(payload);
    setReportType(reportType);
    handlerSendReport(reportType, payload);
  };
  const initialReportsPartnerState = {
    loading: true,
    partner_code: [],
  };
  const [{ partner_code, loading }, setReportsPartners] = useState(
    initialReportsPartnerState
  );
  const handlerSendReport = async (type, payload) => {
    const response = await sendReports(type, payload);
    if (response && response.data && response.data.results) {
      if (Array.isArray(response.data.results)) {
        toast.success(response.data.results[0], {
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
  const getReportsPartnersDetails = async () => {
    const response = await getReportsPartners();
    if (response.status === 200) {
      setReportsPartners((prevState) => ({
        ...prevState,
        loading: false,
        partner_code: response.data.partner_code,
      }));
    } else {
      toast.warn(response.message);
    }
  };
  useEffect(() => {
    getReportsPartnersDetails();
  }, []);
  return (
    <>
      <Card className="report-container">
        <CardBody>
          <Col lg="12" md="12" sm="12">
            <ul className="nav nav-tabs nav-justified report-tab mb-2">
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link active font-cls"
                  href="#reports"
                  data-toggle="tab"
                  data-target="#reports"
                >
                  Reports
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link font-cls"
                  href="#advance_reports"
                  data-toggle="tab"
                  data-target="#advance_reports"
                >
                  Advance Reports
                </a>
              </li>
            </ul>
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
                      reportType={report.reportType}
                      handlerReport={handlerReport}
                      isActive={report.isActive}
                      isDisabledField={report.isDisabledField}
                      partnerCode={partner_code}
                      isLoading={loading}
                      menuPlacement={report.menuPlacement}
                    />
                    <hr />
                  </div>
                ))}
              </div>
              <div className="tab-pane" id="advance_reports">
                {AdvanceReportsData.map((report, index) => (
                  <div className="row" key={index}>
                    <Col md="3" xs="12" className="report-sub-head px-0">
                      <span className="sub-head-text ">{report.name}</span>
                    </Col>
                    <ReportForm
                      customClass="col-md-9"
                      initialValues={report.initialValues}
                      validateSchema={report.validateSchema}
                      buttonName={report.buttonName}
                      reportType={report.reportType}
                      handlerReport={handlerReport}
                      isActive={report.isActive}
                      isDisabledField={report.isDisabledField}
                      partnerCode={partner_code}
                      isLoading={loading}
                      menuPlacement={report.menuPlacement}
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

export default OriginatorReports;
