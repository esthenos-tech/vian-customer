// baseUrl
export const baseUrl = process.env.REACT_APP_BASE_URL;

// All employee endpoint
export const createEmployeeUrl = `${baseUrl}/api/v2/employees`;
export const getEmployeeDetailsUrl = `${baseUrl}/api/v2/employees`;
export const getParticularEmployeeUrl = (employeeId) =>
  `${baseUrl}/api/v2/employee/${employeeId}`;
export const employeePasswordUrl = (employeeId) =>
  `${baseUrl}/api/v2/employee/password/${employeeId}`;
export const getParticularEmployeeAccessLocationUrl = (employeeId) =>
  `${baseUrl}/api/v2/employee/${employeeId}/access_location`;

//Reports layer endpoints
export const reportsPartners = `${baseUrl}/api/v2/originator_report/partners`;
export const reportUrl = (urlType) => {
  return `${baseUrl}/api/v2/originator_report/${urlType}`;
};

//User reportsurl end-points
export const userReportUrl = `${baseUrl}/api/v2/reports`;

// Organisation Status endpoint
export const organisationStatusUrl = `${baseUrl}/api/v2/organisation/status`;

//Organisation All CSV file URL Endpoints

export const getPerticularFileUploadTabledataUrl = `${baseUrl}/api/v2/upload/files`;

export const CSVDumpAllUrl = (urlType) => {
  return `${baseUrl}/api/v2/${urlType}`;
};

//Organisation APK files URL Endpoints

export const getAPKTableDetailsUrl = (urlType) => {
  return `${baseUrl}/api/v2/${urlType}`;
};
export const APKDumpAllUrl = (urlType) => {
  return `${baseUrl}/api/v2/${urlType}`;
};

//Organisation Manage Leads All CSV file URL Endpoints

export const getLeadCSVTableDetailsUrl = `${baseUrl}/api/v2/CSV`;
export const CSVDumpAllLeadUrl = `${baseUrl}/api/v2/CSV`;

//Organisation Manage Collections All CSV file URL Endpoints

export const getCollectionsCSVTableDetailsUrl = `${baseUrl}/api/v2/CSV`;
export const CSVDumpAllCollectionsUrl = `${baseUrl}/api/v2/CSV`;

//Orgainsation manage

export const organisationUpdateLocationUrl = `${baseUrl}/api/v2/admin/organisation/update_collection_dates`;

//Organisation Settings endpoint
export const organisationSettingsUrl = `${baseUrl}/api/v2/organisation/settings`;

//Bre API endpoints

export const getPerticularBreRule = `${baseUrl}/api/v2/category`;
export const getPerticularBreRuleTable = (urlType) => {
  return `${baseUrl}/api/v2/category/rules/${urlType}`;
};
export const getHardCodedRules = (urlType) => {
  return `${baseUrl}/api/v2/category/hardcoded/rules/${urlType}`;
};
export const deleteAndPutDataBreRuleData = (urlType, ruleId) => {
  return `${baseUrl}/api/v2/category/${urlType}/rules/${ruleId}`;
};
//profile score url

export const reportProfileScoreUrl = `${baseUrl}/api/profile_score/`;

//Organisation products details URL Endpoints

export const getProductsDetails = `${baseUrl}/api/v2/product`;
export const getProductsCategoryDetails = `${baseUrl}/api/v2/category`;

export const getParticularProductDetail = (code) =>
  `${baseUrl}/api/v2/product/${code}`;
//Organisation Update location API end points

export const zoneLocation = `${baseUrl}/api/v2/zone_location`;
export const stateLocation = `${baseUrl}/api/v2/state_location`;
export const areaLocation = `${baseUrl}/api/v2/area_location`;
export const clusterLocation = `${baseUrl}/api/v2/cluster_location`;
export const branchLocation = `${baseUrl}/api/v2/branch_location`;
export const getLocationTableDetailsUrl = `${baseUrl}/api/v2/get_location`;
export const unassignUrl = (urlType) => {
  return `${baseUrl}/api/v2/${urlType}`;
};
export const profileScoreUrl = `${baseUrl}/api/profile_score/`;
//Application dalta layer

export const applicationCustomerUrl = `${baseUrl}/api/v2/application/loan/branch_list`;
export const applicationCustomerGetUrl = (urlParams) => {
  return `${baseUrl}/api/v2/application/loan/branch_list/${urlParams}`;
};
export const getCaptainDetailsUrl = (urlType) => {
  return `${baseUrl}/api/v2/application/loan/branch/${urlType}/agent_list`;
};
export const getSangamData = (urlType) => {
  return `${baseUrl}/api/v2/application/agent/${urlType}`;
};
export const getApplicationDataUrl = (urlType) => {
  return `${baseUrl}/api/v2/agent/application/${urlType}`;
};
export const getStatusFilterData = `${baseUrl}/api/v2/applications/status/type`;
export const getBreResults = (urlType) => {
  return `${baseUrl}/api/v2/application/${urlType}/bre_result`;
};
export const getCashFLowResults = (urlType) => {
  return `${baseUrl}/api/v2/application/${urlType}/cashflow_analysis`;
};

export const getBalanceSheetResults = (urlType) => {
  return `${baseUrl}/api/v2/application/${urlType}/balance_sheet`;
};
export const getAssessmentSheetResults = (urlType) => {
  return `${baseUrl}/api/v2/applications/${urlType}/assessment`;
};
export const postUpdateFormData = (urlType) => {
  return `${baseUrl}/api/v2/application/${urlType}/update`;
};
export const putUpdateApplicationForm = (urlType) => {
  return `${baseUrl}/api/v2/application/${urlType}/update`;
};

// Generate kit URL
export const generateKitUrl = `${baseUrl}/api/v2/disbursement/kit_generation/applications`;

//Disbursement url
export const disbursementUrl = `${baseUrl}/api/v2/check_disbursement/applications`;
export const postDisburseData = (urlType) => {
  return `${baseUrl}/api/v2/download/application/${urlType}/kit`;
};

//Registration ready Api endpoints
export const searchReadyFormDataUrl = (urlType) => {
  return `${baseUrl}/api/v2/agent/application/status/${urlType}`;
};
//Application failed ready Api endpoints
export const searchFaildFormDataUrl = (urlType) => {
  return `${baseUrl}/api/v2/agent/application/status/${urlType}`;
};

//Leads Api endpoints
export const getLeadsFormData = (urlType) => {
  return `${baseUrl}/api/v2/lead/${urlType}/list`;
};
export const postUpdateLeadsData = (urlType) => {
  return `${baseUrl}/api/v2/${urlType}/update`;
};
export const getLeadsPersonalDetails = (urlType) => {
  return `${baseUrl}/api/v2/lead/${urlType}`;
};
//Fees Collection URL
export const feesCollectionUrl = `${baseUrl}/api/v2/fees_collection/applications`;
export const postfeesCollectionUrl = `${baseUrl}/api/v2/fees_collection/applications`;
