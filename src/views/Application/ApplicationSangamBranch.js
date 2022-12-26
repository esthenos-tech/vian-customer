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
import { getSngamListDetails } from "../../components/dataLayer/ApplicationLayer/index";
import VianTableComponent from "../../components/VianTableComponent";
import { Link } from "react-router-dom";
import CustomFilterForApplication from "../CustomFilterForApplication";
import { toast } from "react-toastify";

const ApplicationSangamBranch = (props) => {
  const initialState = {
    loading: true,
    data: [],
  };
  const [{ loading, data }, setState] = useState(initialState);
  const handlerSubmitFilterFormDate = async (payload) => {
    const response = await getSngamListDetails(props.match.params.id, payload);
    if (Array.isArray(response.data.results)) {
      if (response && response?.data && response?.data?.results) {
        setState((pervState) => ({
          ...pervState,
          loading: false,
          data: response?.data?.results,
        }));
      }
    } else {
      if (response && response?.data && response?.data?.results) {
        setState((pervState) => ({
          ...pervState,
          loading: false,
          data: [],
        }));
        toast.error(response?.data?.results);
      }
    }
  };
  const serverSideColumns = () => {
    return props.match.params.br;
  };

  useEffect(() => {
    handlerSubmitFilterFormDate();
  }, []);
  return (
    <div>
      <CustomFilterForApplication
        handlerSubmitFilterDate={handlerSubmitFilterFormDate}
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

export default withRouter(ApplicationSangamBranch);
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
