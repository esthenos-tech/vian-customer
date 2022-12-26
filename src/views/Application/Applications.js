import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import React, { useEffect, useState } from "react";
import "./../Customers.scss";
import CustomersFilter from "./../CustomersFilter";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
} from "reactstrap";
import { GiTakeMyMoney } from "react-icons/gi";
import { Edit, MoreVertical } from "react-feather";
import { createFilterFormData } from "../../components/dataLayer/ApplicationLayer";
import { toast } from "react-toastify";
import VianTableComponent from "../../components/VianTableComponent";

// const sizePerPageRenderer = ({
//   options,
//   currSizePerPage,
//   onSizePerPageChange,
// }) => (
//   <div className="btn-group" role="group">
//     {options.map((option) => {
//       const isSelect = currSizePerPage === `${option.page}`;
//       return (
//         <button
//           key={option.text}
//           type="button"
//           onClick={() => onSizePerPageChange(option.page)}
//           className={`btn ${isSelect ? "btn-secondary" : "btn-warning"}`}
//         >
//           {option.text}
//         </button>
//       );
//     })}
//   </div>
// );
// const options = {
//   sizePerPageRenderer,
// };

const Applications = () => {
  const initialFilterForm = {
    loading: true,
    data: [],
  };
  const [{ loading, data }, setFilterCreation] = useState(initialFilterForm);
  let history = useHistory();
  const handlerSubmitFilterFormDate = async (payload) => {
    const response = await createFilterFormData(payload);
    if (
      Array.isArray(response.results) ||
      (typeof response.results === "object" && response.results !== null)
    ) {
      if (response?.results) {
        if ("branch_code" in response?.results[0])
          setFilterCreation((prevState) => ({
            ...prevState,
            loading: false,
            data: response?.results,
          }));
        if ("application_id" in response?.results[0]) {
          setFilterCreation((prevState) => ({
            ...prevState,
            loading: false,
            data: response?.results,
          }));
          const location = {
            pathname: `/application/${response.results[0].application_id}`,
            state: { data: response?.results },
          };

          history.push(location);
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
    }
  };
  useEffect(() => {
    handlerSubmitFilterFormDate();
  }, []);

  return (
    <div>
      <CustomersFilter handlerSubmitFilterDate={handlerSubmitFilterFormDate} />
      <Card>
        <CardBody>
          {loading ? (
            <div className="text-center">
              <Spinner type="grow" color="primary" size="lg" />
            </div>
          ) : (
            <>
              <VianTableComponent
                options={data}
                keyValue="branch_code"
                columns={serverSideColumns}
                tabletitle="List of Branches"
              />
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
export default Applications;

const serverSideColumns = [
  {
    dataField: "branch_name",
    sort: true,
    name: "BRANCH NAME",
    text: "BRANCH NAME",
    formatter: (cell, row) => (
      <Link to={`/branches/${row.branch_code}/rms`}> {cell} </Link>
    ),
  },
  {
    dataField: "cluster_name",
    sort: true,
    text: "CLUSTER NAME",
  },
  {
    dataField: "owner_id",
    sort: true,
    text: "OWNER (EMP ID)",
  },
];
