import cloneDeep from "lodash/cloneDeep";
import React, { useState, useEffect } from "react";
import useNotify from "../../../actions/Toast";
import Form from "./form";
import { getVod, saveVod } from "./service";
import "./style.scss";

function VODContent(props) {
  const { notify } = useNotify();

  const initialState = {
    min_library_size: "",
    max_library_size: "",
    month_ingest_hours: "",
    month_purge_hours: "",
    avg_asset_duration: "",
    archive: "",
    forecast: props.match.params.forecastId,
    project: props.match.params.projectId,
  };

  const [formData, setFormData] = useState(cloneDeep(initialState));

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getVod(props.match.params.forecastId, props.match.params.projectId)
      .then((res) => {
        if(res && res.length > 0) {
          setFormData(cloneDeep(res[0]));
        }
      })
      .catch((err) => notify("Oops! Failed to fetch vod", "error"));
  };


  const onSave = () => {
    let _formData = cloneDeep(formData);
    _formData.forecast = props.match.params.forecastId;
    _formData.project = props.match.params.projectId;

    saveVod(formData)
      .then((res) => {
        notify(`vod has been added successfully.`, "success");
      })
      .catch((err) => notify(`Oops! Failed to add new vod.`, "error"));
  };

  return (
    <>
      <div className="header">
        <h1>VOD Content</h1>
        <button type="button" className="btn btn-primary" onClick={onSave}>
          SAVE
        </button>
      </div>
      <div className="sub-container">
        <Form formData={formData} onChange={setFormData} />
      </div>
    </>
  );
}

export default VODContent;
