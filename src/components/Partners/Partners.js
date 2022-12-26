import React, { Component } from "react";
import Partner from "./Partner/Partner";
import { Row } from "reactstrap";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class Partners extends Component {
  state = {
    partners: [],
    loading: false,
    error: false,
    baseURL: process.env.REACT_APP_BASE_URL,
  };

  componentDidMount() {
    axios
      .get(`${this.state.baseURL}/api/v2/partners`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "instance-token": cookies.get("user"),
        },
      })
      .then((response) => {
        this.setState({
          partners: response.data.results,
        });
      });
  }

  partnerHandler = (partner_code) => {
    axios
      .get(`${this.state.baseURL}/api/v2/partners/${partner_code}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "instance-token": cookies.get("user"),
        },
      })
      .then((response) => {
        this.props.history.push(
          `/organisation/partners/${partner_code}/settings`,
          {
            partner_code: partner_code,
          }
        );
      });
  };

  render() {
    const smePartners = this.state.partners.filter((p) => p.is_sme);
    const individualPartners = this.state.partners.filter((p) => !p.is_sme);

    return (
      <React.Fragment>
        <div className="divider">
          <div className="divider-text bg-transparent text-bold-600">
            Individual Partners
          </div>
        </div>
        <Row>
          {individualPartners.map((partner) => (
            <Partner
              partner={partner}
              key={partner.code}
              partnerHandler={this.partnerHandler}
            />
          ))}
        </Row>

        <div className="divider">
          <div className="divider-text bg-transparent text-bold-600">
            SME Partners
          </div>
        </div>
        <Row>
          {smePartners.map((partner) => (
            <Partner
              partner={partner}
              key={partner.code}
              partnerHandler={this.partnerHandler}
            />
          ))}
        </Row>
      </React.Fragment>
    );
  }
}

export default Partners;
