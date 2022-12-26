import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "flatpickr/dist/themes/light.css";
import { Card, Spinner } from "reactstrap";
import EmployeeTable from "../../components/Employees/EmployeeTable/EmployeeTable";
import EmployeeForm from "../../components/Employees/EmployeeForm/EmployeeForm";
import {
  createEmployee,
  getEmployeeDetails,
} from "../../components/dataLayer/EmployeeLayer";
import "./OrganisationEmployee.scss";
import {
  columns,
  agentColumns,
} from "../../components/Employees/EmployeeTable/EmployeeTableData";

const Employees = () => {
  const initialEmployeeCreationState = {
    loading: false,
    data: [],
    agentData: [],
  };

  const [{ loading, data, agentData }, setEmployeeCreation] = useState(
    initialEmployeeCreationState
  );

  const employeeHirarchyPartnerInitialState = {
    hirarchy: [],
    partner_code_list: [],
  };
  const [
    { hirarchy, partner_code_list },
    setEmployeeHirarchyPartner,
  ] = useState(employeeHirarchyPartnerInitialState);

  const getOrganisationEmployeeDetails = async () => {
    const response = await getEmployeeDetails();
    if (response?.status === 200) {
      if (response?.data?.emps)
        setEmployeeCreation((prevState) => ({
          ...prevState,
          loading: false,
          data: response?.data?.emps,
          agentData: response?.data?.agents,
        }));

      setEmployeeHirarchyPartner((prevState) => ({
        ...prevState,
        hirarchy: response.data.hierarchy,
        partner_code_list: response.data.partner_code_list,
      }));
    } else {
      return;
    }
  };

  const handlerOrganisationEmployeeCreation = async (payload) => {
    const response = await createEmployee(payload);

    if (response && response.errors) {
      if (Array.isArray(response.errors)) {
        toast.error(response.errors[0]);
        return;
      }
      toast.error(response.errors);
    }
    if (response && response.results) {
      setEmployeeCreation((prevState) => ({
        ...prevState,
        loading: false,
        data: response?.results,
      }));
      getOrganisationEmployeeDetails();
      return;
    }
  };

  useEffect(() => {
    getOrganisationEmployeeDetails();
  }, []);

  return (
    <div className="divider-text bg-transparent text-bold-600">
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <EmployeeForm
                handlerSubmitEmployeeCreation={
                  handlerOrganisationEmployeeCreation
                }
                designationDropdwonList={hirarchy}
                accesspartnerDropDownList={partner_code_list}
              />
              {loading ? (
                <div className="text-center" style={{ marginTop: "12rem" }}>
                  <Spinner type="grow" color="primary" size="lg" />
                </div>
              ) : (
                <Card>
                  <ul className="nav nav-tabs nav-justified report-tab mb-2">
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link active font-cls"
                        href="#reports"
                        data-toggle="tab"
                        data-target="#reports"
                      >
                        Employee
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link font-cls"
                        href="#advance_reports"
                        data-toggle="tab"
                        data-target="#advance_reports"
                      >
                        Agents
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane active" id="reports">
                      <EmployeeTable
                        employeeCreationData={data}
                        columns={columns}
                        title="Employee List"
                      />
                    </div>
                    <div className="tab-pane" id="advance_reports">
                      <EmployeeTable
                        employeeCreationData={agentData}
                        columns={agentColumns}
                        title="Agents List"
                      />
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default Employees;
