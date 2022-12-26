import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import MapPicker from "react-google-map-picker";
import { Map } from "react-feather";
import { FaGlobe } from "react-icons/fa";
import "./GeolocationContainer.scss";

// const DefaultLocation = { lat: 12.96456705437624, lng: 77.64380317571583 };
const DefaultZoom = 16;

export const GeolocationContainer = ({
  handleSubmitGeolocation,
  defaultLocationOnload,
  textToDiisplay,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isDisabledField, setIsDisabledField] = useState(true);
  const [latitudeData, longitudeData] = defaultLocationOnload;
  const [latitude, setLatitude] = useState(latitudeData);
  const [longitude, setLongitude] = useState(longitudeData);
  const DefaultLocation = { lat: latitude, lng: longitude };
  //   const DefaultLocation = { lat: latitude, lng: longitude };
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }
  const handleSubmit = () => {
    handleClose();
    handleSubmitGeolocation(location);
    setIsDisabledField(false);
    setLatitude(location.lat);
    setLongitude(location.lng);
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  };

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   let latitude = position.coords.latitude;
    //   setLatitude(latitude);
    //   console.log("Latitude is on :", latitude);
    //   let longitude = position.coords.longitude;
    //   setLongitude(longitude);
    //   console.log("Longitude is on:", longitude);
    //   console.log(navigator.userAgent);
    //   console.log(navigator.appCodeName);
    // });
  }, []);

  return (
    <>
      {/* <Button > */}
      {isDisabledField ? (
        <>
          <div
            onClick={handleShow}
            style={{ cursor: "pointer", height: "36px" }}
          >
            {textToDiisplay === undefined ? (
              <Map variant="primary" />
            ) : (
              <>
                <div className="gio-location-tag row m-0 ">
                  <div className="col-10 m-0 map-text">{textToDiisplay}</div>
                  <div className="col-2 m-0 p-0 map-icon">
                    <FaGlobe />
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <div onClick={handleShow} style={{ cursor: "pointer" }}>
          <label style={{ cursor: "pointer" }}>Latitute:{latitude}</label>
          <label style={{ cursor: "pointer" }}>Latitute:{longitude}</label>
        </div>
      )}

      {/* <span>
        <label>Latitute:{location.lat}</label>
        <label>Latitute:{location.lng}</label>
      </span> */}
      {/* </Button> */}
      <Modal show={show} size="lg" onHide={handleClose}>
        <MapPicker
          defaultLocation={defaultLocation}
          zoom={zoom}
          mapTypeId="roadmap"
          style={{ height: "500px" }}
          onChangeLocation={handleChangeLocation}
          onChangeZoom={handleChangeZoom}
          apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
        />
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleResetLocation}>
            Reset Location
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <button onClick={handleResetLocation}>Reset Location</button>
      <label>Latitute:</label>
      <input type="text" value={location.lat} disabled />
      <label>Longitute:</label>
      <input type="text" value={location.lng} disabled />
      <label>Zoom:</label>
      <input type="text" value={zoom} disabled /> */}
    </>
  );
};

export default GeolocationContainer;
