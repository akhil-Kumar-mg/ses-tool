import cloneDeep from "lodash/cloneDeep";
import React, { useState, useEffect } from "react";
import useNotify from "../../actions/Toast";
import Form from "./form";
import { getProjectConfiguration , saveProjectConfiguration} from "./service";
import "./style.scss";

function ProjectConfiguration(props) {
  const { notify } = useNotify();

  const initialState = {
    sga_percent: "",
    sga_cap: "",
    tax_percent: "",
    capex_depreciation_duration: "",
    project: props.match.params.projectId,
  };

  const [formData, setFormData] = useState(cloneDeep(initialState));

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getProjectConfiguration(props.match.params.projectId)
      .then((res) => {
        if(res) {
          setFormData(cloneDeep(res));
        }
      })
      .catch((err) => notify("Oops! Failed to fetch project configuration", "error"));
  };

  const onSave = () => {
    let _formData = cloneDeep(formData);
    _formData.forecast = props.match.params.forecastId;
    _formData.project = props.match.params.projectId;
    
    saveProjectConfiguration(_formData)
      .then((res) => {
        notify(
          `project configuration has been added successfully.`,
          "success"
        );
      })
      .catch((err) =>
        notify(
          `Oops! Failed to updated project configuration.`,
          "error"
        )
      );
  };

  return (
    <>
      <div className="header">
        <h1>Project Configuration</h1>
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

export default ProjectConfiguration;
