import React, { Component } from "react";
import "./Settings.css";
import * as Icon from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button,
} from "reactstrap";
import Checkbox from "../../Checkbox/Checkboxes";
import { Check } from "react-feather";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
class Settings extends Component {
  state = {
    partnerCode: this.props.location.pathname.split("/")[3],
    isPartnerSME: false,
    isSanctionHold: false,
    isDisbursementHold: false,
    isCustomerCreationHold: false,
    isSmsAllowed: false,
    partnerName: "",
    partnerNameToChange: "",
    partnerWebhookEndpoint: "",
    isCashFreeEnabled: false,
    isPartnerhasCashfreeAccess: false,
    btnLoading: false,
    hasPartnerNameError: false,
    baseURL: process.env.REACT_APP_BASE_URL,
  };

  componentDidMount() {
    axios
      .get(`${this.state.baseURL}/api/v2/partners/${this.state.partnerCode}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "instance-token": cookies.get("user"),
        },
      })
      .then((response) => {
        this.setState({
          isPartnerSME: response.data.is_sme,
          isSanctionHold: response.data.is_hold,
          isDisbursementHold: response.data.is_disbursement_hold,
          isCustomerCreationHold: response.data.is_customer_api_allowed,
          isSmsAllowed: response.data.is_sms_allowed,
          partnerName: response.data.name,
          partnerNameToChange: response.data.name,
          partnerWebhookEndpoint: response.data.webhook_endpoint,
          isCashFreeEnabled: response.data.is_cashfree_enabled,
          isPartnerhasCashfreeAccess:
            response.data.is_partner_has_cashfree_access,
        });
      });
  }

  smePartnerChageHandler = (e) => {
    this.setState({
      isPartnerSME: e.target.checked,
    });
  };

  sanctionHoldChageHandler = (e) => {
    this.setState({
      isSanctionHold: e.target.checked,
    });
  };

  disbursementHoldChageHandler = (e) => {
    this.setState({
      isDisbursementHold: e.target.checked,
    });
  };

  customerCreationHoldChageHandler = (e) => {
    this.setState({
      isCustomerCreationHold: e.target.checked,
    });
  };

  isCashFreeEnabledChageHandler = (e) => {
    this.setState({
      isCashFreeEnabled: e.target.checked,
    });
  };

  smsAllowedChageHandler = (e) => {
    this.setState({
      isSmsAllowed: e.target.checked,
    });
  };

  partnerChangeHandler = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  partnerSettingsFormValidation = () => {
    let isError = false;
    const errors = {
      hasPartnerNameError: false,
    };

    if (this.state.partnerName.length < 1) {
      isError = true;
      errors.hasPartnerNameError = true;
    }

    this.setState({
      ...this.state,
      ...errors,
    });
    return isError;
  };

  partnerSubmitHandler = (event) => {
    event.preventDefault();
    const err = this.partnerSettingsFormValidation();

    if (!err) {
      this.setState({
        btnLoading: true,
      });

      axios({
        method: "PUT",
        url: `${this.state.baseURL}/api/v2/partners/${this.state.partnerCode}`,
        data: {
          name: this.state.partnerName,
          code: this.state.partnerCode,
          is_sme: this.state.isPartnerSME,
          is_hold: this.state.isSanctionHold,
          is_disbursement_hold: this.state.isDisbursementHold,
          is_customer_api_allowed: this.state.isCustomerCreationHold,
          is_sms_allowed: this.state.isSmsAllowed,
          webhook_endpoint: this.state.partnerWebhookEndpoint,
          is_cashfree_enabled: this.state.isCashFreeEnabled,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "instance-token": cookies.get("user"),
        },
      })
        .then((response) => {
          this.setState({
            btnLoading: false,
            partnerNameToChange: response.data.name,
          });
          setTimeout(() => {
            toast.success(`${response.data.name} Partner Settings updated!`);
          });
        })
        .catch((error) => {
          this.setState({
            btnLoading: false,
          });
          setTimeout(() => {
            toast.error("Failed to update partner setting!");
          });
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle className="w-100">
              <Icon.ArrowLeft
                size={20}
                className="cursor-pointer"
                onClick={() => this.props.history.goBack()}
              />
              <h4 className="row">
                <p className="offset-md-4 col-sm-12 col-md-4">
                  {this.state.partnerNameToChange} Settings
                </p>
              </h4>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={this.partnerSubmitHandler}>
              <Row>
                <Col md="4" sm="12" className="offset-md-4">
                  <FormGroup className="form-label-group">
                    <Input
                      name="partnerName"
                      value={this.state.partnerName}
                      onChange={this.partnerChangeHandler}
                      placeholder="Input Partner Name"
                      type="text"
                    />
                    <Label for="floatingInput">Name</Label>
                    {this.state.hasPartnerNameError ? (
                      <p className="field-error text-danger">
                        Partner Name is required
                      </p>
                    ) : (
                      ""
                    )}
                  </FormGroup>
                </Col>

                <Col md="4" sm="12" className="offset-md-4">
                  <FormGroup className="form-label-group">
                    <Input
                      name="partnerWebhookEndpoint"
                      value={this.state.partnerWebhookEndpoint}
                      onChange={this.partnerChangeHandler}
                      placeholder="Input Partner Webhook endpoint"
                      type="text"
                    />
                    <Label for="floatingInput">Webhook endpoint</Label>
                  </FormGroup>
                </Col>

                <Col md="4" sm="12" className="offset-md-4">
                  <div className="d-inline-block mr-1">
                    <Checkbox
                      color="primary"
                      icon={<Check className="vx-icon" size={16} />}
                      label="SME Partner"
                      name="isPartnerSME"
                      value={this.state.isPartnerSME}
                      checked={this.state.isPartnerSME}
                      onChange={this.smePartnerChageHandler}
                    />
                    {this.state.isPartnerhasCashfreeAccess ? (
                      <Checkbox
                        color="primary"
                        icon={<Check className="vx-icon" size={16} />}
                        label="Enable Cashfree"
                        name="isCashFreeEnabled"
                        value={this.state.isCashFreeEnabled}
                        checked={this.state.isCashFreeEnabled}
                        onChange={this.isCashFreeEnabledChageHandler}
                      />
                    ) : null}
                    <Checkbox
                      color="primary"
                      icon={<Check className="vx-icon" size={16} />}
                      label="Sanction hold"
                      name="isSanctionHold"
                      value={this.state.isSanctionHold}
                      checked={this.state.isSanctionHold}
                      onChange={this.sanctionHoldChageHandler}
                    />
                    <Checkbox
                      color="primary"
                      icon={<Check className="vx-icon" size={16} />}
                      label="Disbursement hold"
                      name="isDisbursementHold"
                      value={this.state.isDisbursementHold}
                      checked={this.state.isDisbursementHold}
                      onChange={this.disbursementHoldChageHandler}
                    />
                    <Checkbox
                      color="primary"
                      icon={<Check className="vx-icon" size={16} />}
                      label="Customer creation hold"
                      name="isCustomerCreationHold"
                      value={this.state.isCustomerCreationHold}
                      checked={this.state.isCustomerCreationHold}
                      onChange={this.customerCreationHoldChageHandler}
                    />
                    <Checkbox
                      color="primary"
                      icon={<Check className="vx-icon" size={16} />}
                      label="Enable SMS"
                      name="isSmsAllowed"
                      value={this.state.isSmsAllowed}
                      checked={this.state.isSmsAllowed}
                      onChange={this.smsAllowedChageHandler}
                    />
                  </div>
                </Col>

                <Col md="4" sm="12" className="offset-md-4">
                  <FormGroup>
                    <Button color="primary" type="submit" className="mr-1 mb-1">
                      Submit
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Settings;
