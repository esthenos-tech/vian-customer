import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
} from "reactstrap";
import { Edit, MoreVertical } from "react-feather";
import { GiTakeMyMoney } from "react-icons/gi";
import {
  createFilterFormData,
  getSngamListDetails,
} from "../../components/dataLayer/ApplicationLayer/index";
import VianTableComponent from "../../components/VianTableComponent";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CustomFilterForOneApplicationOnly from "../CustomFilterForOneApplicationOnly";

const ApplicationOnly = (props) => {
  const initialFilterForm = {
    loading: false,
    data: props.location.state.data,
  };

  const [{ loading, data }, setFilterCreation] = useState(initialFilterForm);
  const application_Id_Prefield = props.match.params.id;
  const handlerSubmitFilterSingleApplicationData = async (payload) => {
    setFilterCreation((prevState) => ({
      ...prevState,
      loading: true,
      data: [],
    }));
    const response = await createFilterFormData(payload);
    if (
      Array.isArray(response.results) ||
      (typeof response.results === "object" && response.results !== null)
    ) {
      if (response?.results) {
        if ("application_id" in response?.results[0]) {
          setFilterCreation((prevState) => ({
            ...prevState,
            loading: false,
            data: response?.results,
          }));
        }
      }
    } else {
      if (response && response?.message) {
        setFilterCreation((pervState) => ({
          ...pervState,
          loading: true,
        }));
        toast.error(response?.response?.data?.message);
      }
      setFilterCreation((pervState) => ({
        ...pervState,
        loading: false,
        data: props.location.state.data,
      }));
    }
  };

  const serverSideColumns = () => {
    return data[0].branch_code;
  };
  return (
    <div>
      <CustomFilterForOneApplicationOnly
        handlerSubmitFilterSingleApplicationData={
          handlerSubmitFilterSingleApplicationData
        }
        application_Id_Prefield={application_Id_Prefield}
      />
      <Card>
        <CardBody>
          {loading ? (
            <div className="text-center">
              <Spinner type="grow" color="primary" size="lg" />
            </div>
          ) : (
            <VianTableComponent
              options={data}
              keyValue="application_id"
              columns={columndata(serverSideColumns)}
              tabletitle="Branch: sangam Applications"
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default withRouter(ApplicationOnly);
const columndata = (callback) => {
  return [
    {
      dataField: "application_id",
      sort: true,
      name: "APPLICATION ID",
      text: "APPLICATION ID",
      // minWidth: "225px",
      formatter: (cell, row) => (
        <Link to={`/application/form/${row.application_id}`}> {cell} </Link>
      ),
    },
    {
      dataField: "applicant_name",
      sort: true,
      text: "APPLICANT NAME",
    },
    {
      dataField: "product_name",
      sort: true,
      text: "PRODUCT NAME",
    },
    {
      dataField: "applied_loan",
      sort: true,
      text: "APPLIED LOAN",
    },
    {
      dataField: "date_created",
      sort: true,
      text: "DATE",
    },
    {
      dataField: "current_status",
      sort: true,
      text: "PROGRESS STATUS",
    },
    {
      dataField: "action",
      text: "Action",
      sort: true,
      formatter: (cell, row) => (
        <>
          <UncontrolledDropdown>
            <DropdownToggle
              className="icon-btn hide-arrow"
              color="transparent"
              size="sm"
              caret
            >
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu style={{ padding: "10px" }}>
              <Link
                to={`/branches/rms/${callback()}/applications/${
                  row.application_id
                }/update/${row.status}`}
              >
                <DropdownItem
                  className="w-100"
                  // onClick={() => handlerColumnAction(row, callback, "edit")}
                >
                  <Edit style={{ height: "29px", width: "29px" }} />
                  Update
                </DropdownItem>
              </Link>
              <DropdownItem className="w-100">
                {row.disbursement_kit == undefined ? (
                  <div className="text-danger">
                    No Disbursment-kit Available
                  </div>
                ) : (
                  <>
                    <GiTakeMyMoney style={{ height: "29px", width: "29px" }} />
                    <a href={`${row.disbursement_kit}`} download>
                      Disbursment-kit
                    </a>
                  </>
                )}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      ),
    },
  ];
};
