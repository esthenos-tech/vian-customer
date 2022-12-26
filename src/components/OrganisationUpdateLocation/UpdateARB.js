import React, { Fragment, useState } from "react";
import AddArea from "./Forms/AddArea";
import AddBranch from "./Forms/AddBranch";
import AddCluster from "./Forms/AddCluster";
import AddZone from "./Forms/AddZone";
import SelectState from "./Forms/SelectState";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardBody,
} from "reactstrap";

const UpdateARB = ({ zone, state, area, cluster }) => {
  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const handletabSwitch = (data) => {
    setActive(data);
  };
  return (
    <Fragment>
      <div className="mint_tab">
        <Nav pills className="text-center mb-0 cust-nav-bg" justified>
          <NavItem>
            <NavLink
              active={active === "1"}
              className="m-0 font-clss"
              onClick={() => toggleTab("1")}
            >
              <span className="fw-bold">Add Zone </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "2"}
              className="m-0 font-clss"
              onClick={() => toggleTab("2")}
            >
              <span className="fw-bold">Select State </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "3"}
              className="m-0 font-clss"
              onClick={() => toggleTab("3")}
            >
              <span className="fw-bold">Add Area </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "4"}
              className="m-0 font-clss"
              onClick={() => toggleTab("4")}
            >
              <span className="fw-bold">Add Cluster </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "5"}
              className="m-0 font-clss"
              onClick={() => toggleTab("5")}
            >
              <span className="fw-bold">Add Branch </span>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <Card className="report-container">
        <CardBody>
          <TabContent activeTab={active}>
            <TabPane tabId="1">
              <AddZone handletabSwitch={handletabSwitch} />
            </TabPane>
            <TabPane tabId="2">
              <SelectState
                handletabSwitch={handletabSwitch}
                zone={zone}
                state={state}
              />
            </TabPane>
            <TabPane tabId="3">
              <AddArea handletabSwitch={handletabSwitch} state={state} />
            </TabPane>
            <TabPane tabId="4">
              <AddCluster handletabSwitch={handletabSwitch} area={area} />
            </TabPane>
            <TabPane tabId="5">
              <AddBranch handletabSwitch={handletabSwitch} cluster={cluster} />
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default UpdateARB;
