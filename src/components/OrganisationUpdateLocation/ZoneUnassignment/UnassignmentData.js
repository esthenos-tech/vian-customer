import * as Yup from "yup";
export const UnassignmentData = [
  {
    zoneLabel: "Zone Unassignment",
    selectPlaceholder: "Select a Zone",
    zoneSelectBoxType: "zone2",
    buttonName: "Unassign",
    UnassignmentType: "unassign_zone_location",
    customClass: "",
    selectCodes: "zone_code",
    validateSchema: Yup.object().shape({
      zone_code: Yup.string().required("This field is required"),
    }),
    initialValues: {
      zone_code: "",
    },
  },
  {
    zoneLabel: "State head Unassignment",
    selectPlaceholder: "Select a State",
    zoneSelectBoxType: "state",
    buttonName: "Unassign",
    UnassignmentType: "unassign_state_location",
    customClass: "",
    selectCodes: "state_code",
    validateSchema: Yup.object().shape({
      state_code: Yup.string().required("This field is required"),
    }),
    initialValues: {
      state_code: "",
    },
  },
  {
    zoneLabel: "Area manager Unassignment",
    selectPlaceholder: "Select a Area",
    zoneSelectBoxType: "area",
    buttonName: "Unassign",
    UnassignmentType: "unassign_area_location",
    customClass: "",
    selectCodes: "area_code",
    validateSchema: Yup.object().shape({
      area_code: Yup.string().required("This field is required"),
    }),
    initialValues: {
      area_code: "",
    },
  },
  {
    zoneLabel: "Cluster manager Unassignment",
    selectPlaceholder: "Select a Cluster",
    zoneSelectBoxType: "cluster",
    buttonName: "Unassign",
    UnassignmentType: "unassign_cluster_location",
    customClass: "",
    selectCodes: "cluster_code",
    validateSchema: Yup.object().shape({
      cluster_code: Yup.string().required("This field is required"),
    }),
    initialValues: {
      cluster_code: "",
    },
  },
  {
    zoneLabel: "Branch owner Unassignment",
    selectPlaceholder: "Select a Branch",
    zoneSelectBoxType: "branch",
    buttonName: "Unassign",
    UnassignmentType: "unassign_branch_location",
    customClass: "",
    selectCodes: "branch_code",
    validateSchema: Yup.object().shape({
      branch_code: Yup.string().required("This field is required"),
    }),
    initialValues: {
      branch_code: "",
    },
  },
];
