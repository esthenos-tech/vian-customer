import * as Yup from "yup";
const current = new Date();
const todaysDate = `${current.getFullYear()}-${(
  "0" +
  (current.getMonth() + 1)
).slice(-2)}-${("0" + current.getDate()).slice(-2)}`;

export const ReportsData = [
  {
    name: "Lead Report",
    report_name: "Lead_Report",
    reportType: "lead_report",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      report_start_date: "",
      report_end_date: "",
    },
    validateSchema: Yup.object().shape({
      report_start_date: Yup.string().required("Please select the start date"),
      report_end_date: Yup.string().required("Please select the end date"),
    }),
  },
  {
    name: "Processed Application Report",
    report_name: "PROCESSED_APP",
    reportType: "PA_report",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      report_start_date: "",
      report_end_date: "",
    },
    validateSchema: Yup.object().shape({
      report_start_date: Yup.string().required("Please select the start date"),
      report_end_date: Yup.string().required("Please select the end date"),
    }),
  },
  {
    name: "Sanctioned Application Report",
    report_name: "SANCTIONED_APP",
    reportType: "SA_report",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      report_start_date: "",
      report_end_date: "",
    },
    validateSchema: Yup.object().shape({
      report_start_date: Yup.string().required("Please select the start date"),
      report_end_date: Yup.string().required("Please select the end date"),
    }),
  },
  {
    name: "Disbursed Application Report",
    report_name: "DISBURSED_APP",
    reportType: "DA_report",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      report_start_date: "",
      report_end_date: "",
    },
    validateSchema: Yup.object().shape({
      report_start_date: Yup.string().required("Please select the start date"),
      report_end_date: Yup.string().required("Please select the end date"),
    }),
  },
  {
    name: "LUC Report",
    report_name: "LUC_Report",
    reportType: "LUC_report",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      report_start_date: "",
      report_end_date: "",
    },
    validateSchema: Yup.object().shape({
      report_start_date: Yup.string().required("Please select the start date"),
      report_end_date: Yup.string().required("Please select the end date"),
    }),
  },
  {
    name: "Collection Report",
    report_name: "Collection_Report",
    reportType: "Collection_report",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      report_start_date: "",
      report_end_date: "",
    },
    validateSchema: Yup.object().shape({
      report_start_date: Yup.string().required("Please select the start date"),
      report_end_date: Yup.string().required("Please select the end date"),
    }),
  },
  {
    name: "Employee Report",
    report_name: "Employee_Report",
    reportType: "Employees_report",
    buttonName: "Generate Report",
    isActive: false,
    isDisabledField: false,

    initialValues: {
      report_start_date: "2019-01-01",
      report_end_date: { todaysDate },
    },
  },
  {
    name: "Settlement report",
    report_name: "Settlement_report",
    reportType: "s_report",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      report_start_date: "",
      report_end_date: "",
    },
    validateSchema: Yup.object().shape({
      report_start_date: Yup.string().required("Please select the start date"),
      report_end_date: Yup.string().required("Please select the end date"),
    }),
  },
  {
    name: "Highmark report",
    report_name: "Highmark_Report",
    reportType: "h_report",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      report_start_date: "",
      report_end_date: "",
    },
    validateSchema: Yup.object().shape({
      report_start_date: Yup.string().required("Please select the start date"),
      report_end_date: Yup.string().required("Please select the end date"),
    }),
  },
  {
    name: "Branchwise Closing Report",
    report_name: "Branchwise_Closing_Report",
    reportType: "bc-report",
    buttonName: "Generate Report",
    isActive: false,
    isDisabledField: true,
    initialValues: {
      report_start_date: "",
      report_end_date: "",
    },
    validateSchema: Yup.object().shape({
      report_start_date: Yup.string().required("Please select the start date"),
      report_end_date: Yup.string().required("Please select the end date"),
    }),
  },
  {
    name: "LMS Collection Report",
    report_name: "LMS_Collection_Report",
    reportType: "lms_report",
    buttonName: "Generate Report",
    isActive: false,
    isDisabledField: true,
    initialValues: {
      report_start_date: "",
      report_end_date: "",
    },
    validateSchema: Yup.object().shape({
      report_start_date: Yup.string().required("Please select the start date"),
      report_end_date: Yup.string().required("Please select the end date"),
    }),
  },
];
