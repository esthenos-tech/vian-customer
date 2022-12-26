import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import BranchesClusterAreaStateZone from "./Tables/BranchesClusterAreaStateZone";
import ZoneUnassignForm from "./ZoneUnassignment/ZoneUnassignForm";
import { UnassignmentData } from "./ZoneUnassignment/UnassignmentData";
import { sendUnassignOwners } from "../../components/dataLayer/OrganisationUpdateLocation/index";
import { toast } from "react-toastify";
import { css } from "glamor";
const TableAndUnassignOwner = ({ zone, state, area, cluster, branch }) => {
  const [assignData, setUnassignmentData] = useState({});
  const [assignType, setAssignType] = useState("");

  const handlerUnassignment = (value, assignType) => {
    const payload = {
      ...value,
    };
    setUnassignmentData(payload);
    setAssignType(assignType);
    handlerSendUnassignment(assignType, payload);
  };
  const handlerSendUnassignment = async (type, payload) => {
    const response = await sendUnassignOwners(type, payload);
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
  const dropDownData = [
    {
      zone: zone,
      state: state,
      area: area,
      cluster: cluster,
      branch: branch,
    },
  ];
  return (
    <>
      <div className="tab-content">
        <Card>
          <BranchesClusterAreaStateZone />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle> Unassignement of Owner</CardTitle>
          </CardHeader>
          <CardBody>
            {UnassignmentData.map((data, index) => (
              <div key={index}>
                <ZoneUnassignForm
                  zoneLabel={data.zoneLabel}
                  selectPlaceholder={data.selectPlaceholder}
                  zoneSelectBoxType={data.zoneSelectBoxType}
                  buttonName={data.buttonName}
                  customClass={data.customClass}
                  validateSchema={data.validateSchema}
                  UnassignmentType={data.UnassignmentType}
                  initialValues={data.initialValues}
                  selectCodes={data.selectCodes}
                  handlerUnassignment={handlerUnassignment}
                  dropDownData={dropDownData}
                />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default TableAndUnassignOwner;
