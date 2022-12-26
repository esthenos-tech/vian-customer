import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { Plus } from "react-feather";
import axios from "axios";
import Cookies from "universal-cookie";
import "./log.scss";
const cookies = new Cookies();

class Log extends React.Component {
  state = {
    application_id: this.props.location.pathname.split("/")[2],
    loading: true,
    data: null,
    error: false,
    baseURL: process.env.REACT_APP_BASE_URL,
  };
  async componentDidMount() {
    const { data } = await axios.get(
      `${this.state.baseURL}/api/v2/application/${this.state.application_id}/track`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "instance-token": cookies.get("user"),
        },
      },
      {}
    );
    this.setState({ data });
  }
  render() {
    if (!this.state.data) return null;
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Application Track</CardTitle>
          </CardHeader>
          <CardBody>
            <ul className="activity-timeline timeline-left list-unstyled ml-3">
              {this.state.data.results.map((timeline, index) => (
                <li key={index}>
                  <div className="hover-eff p-2 rounded">
                    <div className="timeline-icon bg-primary">
                      <Plus size={16} />
                    </div>
                    <div className="timeline-info">
                      <p className="font-weight-bold mb-0">{timeline.status}</p>
                      <p className="font-small-3">{timeline.status_message}</p>
                      <p className="font-small-3">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          timeZone: "UTC",
                        }).format(timeline.updated_on.$date)}
                      </p>
                    </div>
                    {(() => {
                      if (timeline.updated_by_name) {
                        return (
                          <p className="text-muted">
                            Done By: {timeline.updated_by_name}
                          </p>
                        );
                      } else {
                        return (
                          <p className="text-muted">
                            Done By: {timeline.updated_by}
                          </p>
                        );
                      }
                    })()}
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </>
    );
  }
}
export default Log;
