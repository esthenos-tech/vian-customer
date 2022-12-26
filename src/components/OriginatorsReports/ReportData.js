import * as Yup from "yup";
const current = new Date();
const todaysDate = `${current.getFullYear()}-${(
  "0" +
  (current.getMonth() + 1)
).slice(-2)}-${("0" + current.getDate()).slice(-2)}`;

export const ReportsData = [
  {
    name: "Customer Report",
    reportType: "customer",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      start_date: "",
      end_date: "",
      partner_code: "",
    },
    validateSchema: Yup.object().shape({
      start_date: Yup.string().required("Please select the start date"),
      end_date: Yup.string().required("Please select the end date"),
      partner_code: Yup.string().required("Please select the partner"),
    }),
    menuPlacement: "auto",
  },
  {
    name: "Application Report",
    reportType: "application",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      start_date: "",
      end_date: "",
      partner_code: "",
    },
    validateSchema: Yup.object().shape({
      start_date: Yup.string().required("Please select the start date"),
      end_date: Yup.string().required("Please select the end date"),
      partner_code: Yup.string().required("Please select the partner"),
    }),
    menuPlacement: "auto",
  },
  {
    name: "GST Report",
    reportType: "gst",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      start_date: "",
      end_date: "",
      partner_code: "",
    },
    validateSchema: Yup.object().shape({
      start_date: Yup.string().required("Please select the start date"),
      end_date: Yup.string().required("Please select the end date"),
      partner_code: Yup.string().required("Please select the partner"),
    }),
    menuPlacement: "auto",
  },
  {
    name: "Collection Report",
    reportType: "collection",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      start_date: "",
      end_date: "",
      partner_code: "",
    },
    validateSchema: Yup.object().shape({
      start_date: Yup.string().required("Please select the start date"),
      end_date: Yup.string().required("Please select the end date"),
      partner_code: Yup.string().required("Please select the partner"),
    }),
    menuPlacement: "auto",
  },
  {
    name: "Application Master Report",
    reportType: "data_dump",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      start_date: "",
      end_date: "",
      partner_code: "",
    },
    validateSchema: Yup.object().shape({
      start_date: Yup.string().required("Please select the start date"),
      end_date: Yup.string().required("Please select the end date"),
      partner_code: Yup.string().required("Please select the partner"),
    }),
    menuPlacement: "auto",
  },
  {
    name: "Cancelled Loans Report",
    reportType: "cancel-applications",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      start_date: "",
      end_date: "",
      partner_code: "",
    },
    validateSchema: Yup.object().shape({
      start_date: Yup.string().required("Please select the start date"),
      end_date: Yup.string().required("Please select the end date"),
      partner_code: Yup.string().required("Please select the partner"),
    }),
    menuPlacement: "auto",
  },
  {
    name: "Sanction hold Report",
    reportType: "cancel-applications",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      start_date: "",
      end_date: "",
      partner_code: "",
    },
    validateSchema: Yup.object().shape({
      start_date: Yup.string().required("Please select the start date"),
      end_date: Yup.string().required("Please select the end date"),
      partner_code: Yup.string().required("Please select the partner"),
    }),
    menuPlacement: "auto",
  },
  {
    name: "Employee Report",
    reportType: "employees",
    buttonName: "Generate Report",
    isActive: false,
    isDisabledField: false,

    initialValues: {
      start_date: "2019-01-01",
      end_date: { todaysDate },
    },
    menuPlacement: "auto",
  },
];

export const AdvanceReportsData = [
  {
    name: "NEFT Report for pending status",
    reportType: "application_neft",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      start_date: "",
      end_date: "",
      partner_code: "",
    },
    validateSchema: Yup.object().shape({
      start_date: Yup.string().required("Please select the start date"),
      end_date: Yup.string().required("Please select the end date"),
      partner_code: Yup.string().required("Please select the partner"),
    }),
    menuPlacement: "auto",
  },
  {
    name: "Upload CKYC files",
    reportType: "ckyc_upload",
    buttonName: "Upload CKYC",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      start_date: "",
      end_date: "",
      partner_code: "",
    },
    validateSchema: Yup.object().shape({
      start_date: Yup.string().required("Please select the start date"),
      end_date: Yup.string().required("Please select the end date"),
      partner_code: Yup.string().required("Please select the partner"),
    }),
    menuPlacement: "auto",
  },
  {
    name: "SME Loan Report",
    reportType: "sme-report",
    buttonName: "Generate Report",
    isActive: false,
    isDisabledField: true,
    initialValues: {
      start_date: "",
      end_date: "",
    },
    validateSchema: Yup.object().shape({
      start_date: Yup.string().required("Please select the start date"),
      end_date: Yup.string().required("Please select the end date"),
    }),
    menuPlacement: "auto",
  },
  {
    name: "User Audit Report",
    reportType: "user-audit",
    buttonName: "Generate Report",
    isActive: false,
    isDisabledField: true,
    initialValues: {
      start_date: "",
      end_date: "",
    },
    validateSchema: Yup.object().shape({
      start_date: Yup.string().required("Please select the start date"),
      end_date: Yup.string().required("Please select the end date"),
    }),
    menuPlacement: "auto",
  },
  {
    name: "LMS Upload",
    reportType: "ckyc_upload",
    buttonName: "Generate Report",
    isActive: true,
    isDisabledField: true,
    initialValues: {
      start_date: "",
      end_date: "",
      partner_code: "",
    },
    validateSchema: Yup.object().shape({
      start_date: Yup.string().required("Please select the start date"),
      end_date: Yup.string().required("Please select the end date"),
      partner_code: Yup.string().required("Please select the partner"),
    }),
    menuPlacement: "top",
  },
];
