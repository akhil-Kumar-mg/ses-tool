import React, { useState , useEffect} from "react";
import "./style.scss";
import cloneDeep from "lodash/cloneDeep";
import FaIcons from "../../../components/fa-icons";
import Modal from "./Add";

import Grid from "../../../components/Grid";
import schema from "./metadata/schema.json";
import useNotify from "../../../actions/Toast";
import { deleteChannel, editChannel, getChannels, saveChannel } from "./service";

function Channels(props) {
  const { notify } = useNotify();

  const initialState = {
    type: "",
    catchup_hours: "",
    source_mbps: "",
    codec: "",
    audio_type: "",
    source_type: "",
    subtitle_type: "",
    channel_quality: "",
    epg_source: "",
    cue_tones: "",
    audio_track: "",
    subtitle_of: "",
    project: props.match.params.projectId,
    forecast: props.match.params.forecastId,
  };

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("ADD");
  const [channels, setChannels] = useState([]);
  const [formData, setFormData] = useState(cloneDeep(initialState));

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getChannels(props.match.params.forecastId)
      .then((res) => {
        setChannels(res);
      })
      .catch((err) => notify("Oops! Failed to fetch channels", "error"));
  };

  const handleShow = () => {
    setMode("ADD");
    setShow(true);
  };

  const onFormSubmit = () => {
    if (mode === "ADD") onSave();
    else onEdit();
  };

  const onEdit = () => {
    editChannel(formData)
      .then((res) => {
        notify(
          `Channel has been added successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to edit channel.`, "error")
      );
  };

  const onSave = () => {
    saveChannel(formData)
      .then((res) => {
        notify(
          `Channel has been added successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to add new channel`, "error")
      );
  };

  const onDelete = (data) => {
    const r = window.confirm(
      `Do you wish to remove '${data.type}' channel?`
    );
    if (r === true) {
      deleteChannel(data.id)
        .then((res) => {
          notify(
            `'${data.type}' channel has been removed successfully.`,
            "success"
          );
          onLoad();
        })
        .catch((err) =>
          notify(`Oops! Failed to remove ${data.type} channel.`, "error")
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
        <h1>Channels</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          SET CHANNEL TYPE <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container">
        <Grid data={channels} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}

export default Channels;
