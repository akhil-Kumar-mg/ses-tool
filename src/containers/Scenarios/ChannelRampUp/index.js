import React, { useState, useEffect } from "react";
import "./style.scss";
import cloneDeep from "lodash/cloneDeep";
import Modal from "./edit";
import useNotify from "../../../actions/Toast";

import Grid from "../../../components/Grid";
import schema from "./metadata/schema.json";
import data from "./metadata/data.json";
import { editChannelRampUps, getChannelRampUps } from "./service";

function ChannelRampUp(props) {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("ADD");
  const [rampUps, setRampUps] = useState([]);
  const { notify } = useNotify();
  const initialState = {
    project: "",
    period: "",
    forecast: "",
    type: "",
    increment_type: "",
    channel_count: ""
  };

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getChannelRampUps(props.match.params.forecastId)
      .then((res) => {
        setRampUps(res);
      })
      .catch((err) =>
        notify("Oops! Failed to fetch channel ramp ups", "error")
      );
  };

  const [formData, setFormData] = useState(cloneDeep(initialState));

  const onFormSubmit = () => {
    if (mode === "ADD") onSave();
    else onEdit();
  };

  const onEdit = () => {
    editChannelRampUps(formData)
      .then((res) => {
        notify(
          `channel rampup has been edited successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to edit channel rampup`, "error")
      );
  };

  const onSave = () => {
    // saveSubscribers(formData)
    //   .then((res) => {
    //     notify(
    //       `${formData.type} subscriber has been added successfully.`,
    //       "success"
    //     );
    //     onFormCancel();
    //     onLoad();
    //   })
    //   .catch((err) =>
    //     notify(`Oops! Failed to add new subscriber ${formData.type}.`, "error")
    //   );
  };

  const onFormCancel = () => {
    setShow(false);
    setFormData(cloneDeep(initialState));
  };

  const onGridChange = (event, item) => {
    switch (event) {
      case "edit":
        setShow(true);
        setMode("EDIT");
        setFormData(cloneDeep(item));
        break;
    }
  };

  return (
    <>
       <Modal
        show={show}
        onCancel={onFormCancel}
        formData={formData}
        onChange={setFormData}
        onSubmit={onFormSubmit}
        mode={mode}
      />
      <div className="header">
        <h1>Channel Ramp up</h1>
        {/* <button type="button" className="btn btn-primary" >
          SAVE
        </button> */}
      </div>
      <div className="sub-container">
        <Grid data={rampUps} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}

export default ChannelRampUp;
