import React from "react";
import { Row, Badge } from "reactstrap";
import Radio from "../../components/Radio/Radio";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import { Calendar } from "react-feather";
import "./DashboardFilter.scss";

class DashboardFilter extends React.Component {
  render() {
    return (
      <Row className="mb-2 d-flex justify-content-end">
        <div className="pt-2">
          <Badge
            pill
            className={`mx-1 ${
              this.props.defaultTimeFilter === "seven_days_stats" &&
              !this.props.customDateSelected
                ? "badge-glow"
                : "badge-light-primary"
            }`}
            color={
              this.props.defaultTimeFilter === "seven_days_stats"
                ? "primary"
                : "light-primary"
            }
          >
            <Radio
              label="7 DAYS"
              color="primary"
              value="seven_days_stats"
              onChange={() =>
                this.props.dateChangeHandler("seven_days_stats", 7)
              }
              size="sm"
              checked={
                this.props.defaultTimeFilter === "seven_days_stats"
                  ? true
                  : false
              }
            />
          </Badge>

          <Badge
            pill
            className={`mx-1 ${
              this.props.defaultTimeFilter === "one_month_stats" &&
              !this.props.customDateSelected
                ? "badge-glow"
                : "badge-light-primary"
            }`}
            color={
              this.props.defaultTimeFilter === "one_month_stats"
                ? "primary"
                : "light-primary"
            }
          >
            <Radio
              label="30 DAYS"
              color="primary"
              value="one_month_stats"
              onChange={() =>
                this.props.dateChangeHandler("one_month_stats", 30)
              }
              size="sm"
              checked={
                this.props.defaultTimeFilter === "one_month_stats"
                  ? true
                  : false
              }
            />
          </Badge>

          <Badge
            pill
            className={`mx-1 ${
              this.props.defaultTimeFilter === "half_yearly_stats" &&
              !this.props.customDateSelected
                ? "badge-glow"
                : "badge-light-primary"
            }`}
            color={
              this.props.defaultTimeFilter === "half_yearly_stats"
                ? "primary"
                : "light-primary"
            }
          >
            <Radio
              label="6 MONTHS"
              color="primary"
              value="half_yearly_stats"
              onChange={() =>
                this.props.dateChangeHandler("half_yearly_stats", 180)
              }
              size="sm"
              checked={
                this.props.defaultTimeFilter === "half_yearly_stats"
                  ? true
                  : false
              }
            />
          </Badge>

          <Badge
            pill
            className={`mx-1 ${
              this.props.defaultTimeFilter === "yearly_stats" &&
              !this.props.customDateSelected
                ? "badge-glow"
                : "badge-light-primary"
            }`}
            color={
              this.props.defaultTimeFilter === "yearly_stats"
                ? "primary"
                : "light-primary"
            }
          >
            <Radio
              label="YEARLY"
              color="primary"
              value="yearly_stats"
              onChange={() => this.props.dateChangeHandler("yearly_stats", 365)}
              size="sm"
              checked={
                this.props.defaultTimeFilter === "yearly_stats" ? true : false
              }
            />
          </Badge>

          <Flatpickr
            className="form-control mx-1"
            options={{
              mode: "range",
              defaultDate: this.props.customDefaultDate,
              static: true,
              altInput: true,
              altFormat: "d/m/Y",
            }}
            onChange={(date) => this.props.customDateChangeHandler(date)}
            value={this.props.customDefaultDate}
            ref={(flatpickerRef) => {
              this.flatpickerRef = flatpickerRef;
            }}
          />
          <Calendar
            className={`mx-1 ${
              this.props.customDateSelected ? "customDateSelected" : ""
            }`}
            size={20}
            onClick={() => this.flatpickerRef.node.click()}
            style={{
              position: "relative",
              right: "2rem",
              pointerEvents: "none",
            }}
          />
        </div>
      </Row>
    );
  }
}

export default DashboardFilter;
