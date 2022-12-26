import React from "react";
import { CustomInput } from "reactstrap";
import { Settings, X } from "react-feather";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { ContextLayout } from "../../utility/context/Layout";
import Radio from "../Radio/Radio";
import "../../assets/scss/components/customizer.scss";

class Customizer extends React.Component {
  state = {
    activeNavbar: this.props.activeNavbar,
    navbarType: null,
    footerType: null,
    menuTheme: null,
    collapsedSidebar: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.navbarType !== state.navbarType ||
      props.footerType !== state.footerType ||
      props.menuTheme !== state.menuTheme ||
      props.activeMode !== state.activeMode ||
      props.sidebarState !== state.collapsedSidebar
    ) {
      return {
        activeNavbar: props.activeNavbar,
        navbarType: props.navbarType,
        footerType: props.footerType,
        menuTheme: props.menuTheme,
        activeMode: props.activeMode,
        collapsedSidebar: props.sidebarState,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  handleNavbarChange = (color) => {
    this.props.changeNavbar(color);
    this.setState({
      activeNavbar: color,
    });
  };

  componentDidMount() {
    this.setState({
      navbarType: this.props.navbarType,
      footerType: this.props.footerType,
      menuTheme: this.props.menuTheme,
      activeMode: this.props.activeMode,
      collapseSidebar: this.props.sidebarState,
    });
  }

  render() {
    const { activeMode, collapsedSidebar } = this.state;
    return (
      <ContextLayout.Consumer>
        {(context) => {
          return (
            <div
              className={classnames("customizer d-none d-md-block", {
                open: this.props.customizerState === true,
              })}
            >
              <div
                className="customizer-toggle"
                onClick={() =>
                  this.props.handleCustomizer(!this.props.customizerState)
                }
              >
                <Settings className="open-icon" size={15} />
              </div>
              <div className="header d-flex justify-content-between px-2 pt-2">
                <div
                  className="close-icon cursor-pointer"
                  onClick={() => this.props.handleCustomizer(false)}
                >
                  <X size={24} />
                </div>
              </div>
              <hr />
              <PerfectScrollbar
                options={{
                  wheelPropagation: false,
                }}
                className="customizer-content p-2"
              >
                <div className="theme-mode">
                  <h5 className="mt-1">Theme Mode</h5>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="Light"
                      color="primary"
                      checked={
                        activeMode === "light" ||
                        !["light", "dark", "semi-dark"].includes(activeMode)
                          ? true
                          : false
                      }
                      name="themeLayout"
                      onChange={() => this.props.changeMode("light")}
                    />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="Dark"
                      color="primary"
                      checked={activeMode === "dark" ? true : false}
                      name="themeLayout"
                      onChange={() => this.props.changeMode("dark")}
                    />
                  </div>
                  {context.state.activeLayout !== "horizontal" && (
                    <div className="d-inline-block">
                      <Radio
                        label="Semi Dark"
                        color="primary"
                        checked={activeMode === "semi-dark" ? true : false}
                        name="themeLayout"
                        onChange={() => this.props.changeMode("semi-dark")}
                      />
                    </div>
                  )}
                </div>
                {context.state.activeLayout !== "horizontal" && (
                  <React.Fragment>
                    <hr />
                    <div className="collapse-sidebar d-flex justify-content-between align-items-center">
                      <h5 className="pt-25">Collapse Sidebar</h5>
                      <CustomInput
                        type="switch"
                        id="collapseSidebar"
                        name="collapseSidebar"
                        checked={collapsedSidebar}
                        onChange={() => {
                          this.props.collapseSidebar(!collapsedSidebar);
                        }}
                        inline
                      />
                    </div>
                  </React.Fragment>
                )}
              </PerfectScrollbar>
            </div>
          );
        }}
      </ContextLayout.Consumer>
    );
  }
}

export default Customizer;
