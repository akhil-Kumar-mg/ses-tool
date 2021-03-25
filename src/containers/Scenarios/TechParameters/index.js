import React, { useState, useContext } from "react";
import "./style.scss";
import cloneDeep from "lodash/cloneDeep";
import Form from "./form";
import useNotify from "../../../actions/Toast";
import { saveTechParameters } from "./service";
import { Context as AppContext } from "../../../context/AppContext";

function TechParameters() {
  const { notify } = useNotify();
  const appContext = useContext(AppContext);

  const initialState = {
    abr_video: "",
    abr_audio: "",
    abr_bit_rate: "",
    vod_storage: "",
    vod_hit_rate: "",
    linear_hit_rate: "",
    catchup_hit_rate: "",
    project: appContext.state.selectedProject
  };

  const [formData, setFormData] = useState(cloneDeep(initialState));

  const onSave = () => {
    saveTechParameters(formData)
      .then((res) => {
        notify(
          `${formData.abr_video} tech parameters has been added successfully.`,
          "success"
        );
      })
      .catch((err) =>
        notify(
          `Oops! Failed to add new tech parameter ${formData.abr_video}.`,
          "error"
        )
      );
  };

  return (
    <>
      <div className="header">
        <h1>Tech Parameters</h1>
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

export default TechParameters;
