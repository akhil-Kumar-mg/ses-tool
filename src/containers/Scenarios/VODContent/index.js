import React, { useState, useContext } from "react";
import "./style.scss";
import cloneDeep from "lodash/cloneDeep";
import Form from "./form";
import { saveVod } from "./service";
import useNotify from "../../../actions/Toast";
import { Context as AppContext } from "../../../context/AppContext";

function VODContent() {
  const { notify } = useNotify();
  const appContext = useContext(AppContext);

  const initialState = {
    min_library_size: "",
    max_library_size: "",
    month_ingest_hours: "",
    month_purge_hours: "",
    avg_asset_duration: "",
    archive: "",
    project: appContext.state.selectedProject,
  };

  const [formData, setFormData] = useState(cloneDeep(initialState));

  const onSave = () => {
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
