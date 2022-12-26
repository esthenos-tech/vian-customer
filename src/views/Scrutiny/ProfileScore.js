import React, { useState } from "react";
import MyForm from "./ProfileScoreComponents/ProfileScoreForm";
import { Card, CardBody } from "reactstrap";
import { sendProfileScoreReport } from "../../components/dataLayer/ProfileScore/index";
import "./Style.scss";
import { toast } from "react-toastify";
const ProfileScore = () => {
  const initialProfileScoreState = {
    loading: false,
    data: [],
  };
  const [{ loading, data }, setProfileScoreData] = useState(
    initialProfileScoreState
  );

  const handlerProfileScoreData = async (payload) => {
    const response = await sendProfileScoreReport(payload);
    toast.success("Updated data did not go successfully...");
    if (response && response.results) {
      setProfileScoreData((prevState) => ({
        ...prevState,
        loading: false,
        // data: response?.results,
      }));
    }
  };
  return (
    <Card>
      <CardBody>
        <section className="container_section" style={{ fontSize: "16px" }}>
          <div className="mb-2">
            <div className="col  ml-2" style={{ width: "100%" }}>
              <p>
                <b>Application ID :</b>
                <span className="ml-1">SAMAPP220107000002</span>
              </p>
            </div>
            <div className="col ml-2" style={{ width: "100%" }}>
              <p>
                <b>Name of the Customer : </b>
                <span className="ml-line1">Nitin Gopalakrishnan</span>
              </p>
            </div>
          </div>
          <hr />
        </section>

        <MyForm handlerProfileScoreData={handlerProfileScoreData} />
      </CardBody>
    </Card>
  );
};

export default ProfileScore;
