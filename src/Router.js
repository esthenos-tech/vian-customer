import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/Spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";

// Route-based code splitting
const Dashboard = lazy(() => import("./views/dashboard/Dashboard"));
const Analytics = lazy(() => import("./views/dashboard/AnalyticsDashboard"));
const Organisations = lazy(() =>
  import("./components/Organisations/Organisations")
);
const BRE = lazy(() => import("./views/Bre"));
const BRETWL = lazy(() => import("./views/BreMainComponent"));

const Rules = lazy(() => import("./views/rules"));
const Partners = lazy(() => import("./components/Partners/Partners"));
const OrganisationStatusCreation = lazy(() =>
  import("./views/Organisation/OrganisationStatusCreation")
);
const Employee = lazy(() =>
  import("./views/Organisation/OrganisationEmployee")
);
const UpdateEmployee = lazy(() =>
  import("./components/Employees/UpdateEmployee/UpdateEmployee")
);
const ChangePassword = lazy(() =>
  import("./components/Employees/ChangePassword/ChangePassword")
);
const Settings = lazy(() => import("./components/Partners/Settings/Settings"));
const Customers = lazy(() => import("./views/Customers"));
const Customer = lazy(() => import("./views/Customer"));
const SMECustomers = lazy(() => import("./views/SMECustomers"));
const SMECustomer = lazy(() => import("./views/SMECustomer"));
// application page routs
const Applications = lazy(() => import("./views/Application/Applications"));
const ApplicationCaptainList = lazy(() =>
  import("./views/Application/ApplicationCaptainList")
);
const ApplicationSangam = lazy(() =>
  import("./views/Application/ApplicationSangamBranch")
);
const Application = lazy(() => import("./views/Application/Application"));
const UpdateRmsApplicationPage = lazy(() =>
  import("./views/Application/UpdateRmsApplicationPage")
);
const ApplicationOnlyPage = lazy(() =>
  import("./views/Application/ApplicationOnly")
);
const ViewApplications = lazy(() => import("./views/Applications"));
// const ViewApplication = lazy(() => import("./views/Application"));
const SMEApplications = lazy(() => import("./views/SMEApplications"));
const SMEApplication = lazy(() => import("./views/SMEApplication"));
const Log = lazy(() => import("./views/log"));
const Reports = lazy(() => import("./views/Reports"));
const OriginatorsReports = lazy(() =>
  import("./views/Originator/OriginatorReports")
);
const CashFlow = lazy(() => import("./views/Scrutiny/CashFlow"));
const BalanceSheet = lazy(() => import("./views/Scrutiny/BalanceSheet"));
const BreResult = lazy(() => import("./views/Scrutiny/BreResult"));
const AssessmentSheet = lazy(() => import("./views/Scrutiny/AssessmentSheet"));
const ProfileScore = lazy(() => import("./views/Scrutiny/ProfileScore"));

const OrganisationFileUpload = lazy(() =>
  import("./views/Organisation/OrganisationFileUpload")
);

const OrganisationProducts = lazy(() =>
  import("./views/Organisation/OrganisationProducts")
);
const OrganisationProductsUpdate = lazy(() =>
  import("./components/OrganisationProductsv2/UpdateProductsCategory")
);
const OrganisationUpdateLocation = lazy(() =>
  import("./views/Organisation/OrganisationUpdateLocation")
);
const OrganisationUpdateCollectionDates = lazy(() =>
  import("./views/Organisation/OrganisationUpdateCollectionDates")
);
const OrganisationUpdateSettings = lazy(() =>
  import("./views/Organisation/OrganisationSettings")
);
const FeesCollection = lazy(() =>
  import("./views/FeesCollection/FeesCollection")
);
const GenerateKit = lazy(() => import("./views/GenerateKit/GenerateKit"));
const Disbursement = lazy(() => import("./views/Disbursement/Disbursement"));
const leadSPage = lazy(() => import("./views/Leads"));
const leadProfilePage = lazy(() => import("./views/Leads/LeadsProfilePage"));
const UpdateApplicationDetailsPage = lazy(() =>
  import("./views/Application/UpdateApplicationDetails")
);

const NotFoundPage = lazy(() => import("./views/PageNotFound"));

// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute path="/health">
            <h3>Hey There!!! The App is Healthy</h3>
          </AppRoute>
          <AppRoute exact path="/" component={Dashboard} />
          <AppRoute exact path="/dashboard/analytics" component={Analytics} />
          <AppRoute exact path="/organisation" component={Organisations} />
          <AppRoute exact path="/organisation/partners" component={Partners} />
          <AppRoute
            exact
            path="/organisation/status"
            component={OrganisationStatusCreation}
          />
          <AppRoute exact path="/organisation/employee" component={Employee} />
          <AppRoute
            exact
            path="/organisation/update/:id"
            component={UpdateEmployee}
          />
          <AppRoute
            exact
            path="/organisation/employee/ChangePassword/:id"
            component={ChangePassword}
          />
          <AppRoute exact path="/bre" component={BRE} />
          <AppRoute exact path="/bre/:id" component={BRETWL} />
          {/* <AppRoute exact path="/bre/:id" component={Rules} /> */}
          <AppRoute
            path="/organisation/partners/:partner_code/settings"
            component={Settings}
          />
          <AppRoute exact path="/customers/sme" component={SMECustomers} />
          <AppRoute exact path="/customers/individual" component={Customers} />
          <AppRoute path="/customer/sme/:id" component={SMECustomer} />
          <AppRoute path="/customer/:id" component={Customer} />
          <AppRoute
            exact
            path="/applications/sme"
            component={SMEApplications}
          />
          <AppRoute
            exact
            path="/application/sme/:id"
            component={SMEApplication}
          />
          <AppRoute exact path="/applications" component={Applications} />
          <AppRoute
            exact
            path="/applications/individual"
            component={ViewApplications}
          />

          <AppRoute path="/application/form/:id" component={Application} />
          <AppRoute
            path="/branches/:id/rms"
            component={ApplicationCaptainList}
          />
          <AppRoute
            path="/application/:br/rms/:id"
            component={ApplicationSangam}
          />
          <AppRoute
            path="/branches/rms/:br/applications/:id/update/:st"
            component={UpdateRmsApplicationPage}
          />
          {/* <AppRoute path="/application/:id" component={ViewApplication} /> */}
          <AppRoute exact path="/application/:id/track" component={Log} />
          <AppRoute exact path="/generate_reports" component={Reports} />
          <AppRoute
            exact
            path="/originator_reports"
            component={OriginatorsReports}
          />
          <AppRoute
            exact
            path="/organisation/upload_document"
            component={OrganisationFileUpload}
          />
          <AppRoute
            path="/organisation/products"
            component={OrganisationProducts}
          />
          <AppRoute
            exact
            path="/organisation/updateproduct/:id"
            component={OrganisationProductsUpdate}
          />
          <AppRoute exact path="/cashflow_analysis/:id" component={CashFlow} />
          <AppRoute exact path="/balance_sheet/:id" component={BalanceSheet} />
          <AppRoute exact path="/bre_result/:id" component={BreResult} />
          <AppRoute
            exact
            path="/assessment_sheet/:id"
            component={AssessmentSheet}
          />
          <AppRoute exact path="/profile_score" component={ProfileScore} />

          <AppRoute
            exact
            path="/organisation/locationupdate"
            component={OrganisationUpdateLocation}
          />
          <AppRoute
            exact
            path="/organisation/update-collection-dates"
            component={OrganisationUpdateCollectionDates}
          />
          <AppRoute
            exact
            path="/organisation/settings"
            component={OrganisationUpdateSettings}
          />
          <AppRoute
            exact
            path="/generate-kit/applications"
            component={GenerateKit}
          />
          <AppRoute
            exact
            path="/fees-collection/applications"
            component={FeesCollection}
          />
          <AppRoute exact path="/check_disbursement" component={Disbursement} />
          <AppRoute exact path="/leadr" component={leadSPage} />
          <AppRoute exact path="/leadr/:id" component={leadProfilePage} />

          <AppRoute
            exact
            path="/application/:id/update_loan_details"
            component={UpdateApplicationDetailsPage}
          />
          <AppRoute
            exact
            path="/application/:id"
            component={ApplicationOnlyPage}
          />
          <AppRoute path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
