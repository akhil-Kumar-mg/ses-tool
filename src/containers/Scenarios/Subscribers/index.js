import cloneDeep from "lodash/cloneDeep";
import React, { useEffect, useState } from "react";
import useNotify from "../../../actions/Toast";
import FaIcons from "../../../components/fa-icons";
import Grid from "../../../components/Grid";
import Modal from "./Add";
import schema from "./metadata/schema.json";
import { deleteSubscribers, editSubscribers, getSubscribers, saveSubscribers } from "./service";
import "./style.scss";


function Subscribers(props) {
  const { notify } = useNotify();

  const initialState = {
    type: "",
    viewing_hours: "",
    impression_hours: "",
    viewing_bitrate: "",
    vod_hours: "",
    linear_hours: "",
    catchup_hours: "",
    project: props.match.params.projectId,
    forecast: props.match.params.forecastId,
  };

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("ADD");
  const [subscribers, setSubscribers] = useState([]);
  const [formData, setFormData] = useState(cloneDeep(initialState));

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getSubscribers(props.match.params.forecastId)
      .then((res) => {
        setSubscribers(res);
      })
      .catch((err) => notify("Oops! Failed to fetch subscribers", "error"));
  };

  const handleShow = () => {
    setMode("ADD");
    setShow(true);
  };

  const onSetup = () => {};

  const onFormSubmit = () => {
    if (mode === "ADD") onSave();
    else onEdit();
  };

  const onEdit = () => {
    editSubscribers(formData)
      .then((res) => {
        notify(
          `${formData.type} subscriber has been added successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to add save subscriber ${formData.type}.`, "error")
      );
  };

  const onSave = () => {
    saveSubscribers(formData)
      .then((res) => {
        notify(
          `${formData.type} subscriber has been added successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to add new subscriber ${formData.type}.`, "error")
      );
  };

  const onDelete = (data) => {
    const r = window.confirm(
      `Do you wish to remove '${data.type}' subscriber?`
    );
    if (r === true) {
      deleteSubscribers(data.id)
        .then((res) => {
          notify(
            `'${data.type}' subscriber has been removed successfully.`,
            "success"
          );
          onLoad();
        })
        .catch((err) =>
          notify(`Oops! Failed to remove ${data.type} subscriber.`, "error")
        );
    } else {
    }
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

      case "delete":
        onDelete(item);
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
        <h1>Subscribers</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          SET SUBSCRIBER TYPE <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container">
        <Grid data={subscribers} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}

export default Subscribers;
