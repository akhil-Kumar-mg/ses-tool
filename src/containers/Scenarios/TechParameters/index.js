import cloneDeep from "lodash/cloneDeep";
import React, { useState } from "react";
import useNotify from "../../../actions/Toast";
import Form from "./form";
import { saveTechParameters } from "./service";
import "./style.scss";

function TechParameters(props) {
  const { notify } = useNotify();

  const initialState = {
    abr_video: "",
    abr_audio: "",
    abr_bit_rate: "",
    vod_storage: "",
    vod_hit_rate: "",
    linear_hit_rate: "",
    catchup_hit_rate: "",
    geo_blocking: true,
    drm: true,
    ses_cj: true,
    download_to_go: true,
    download_to_on: true,
    tvod: true,
    npvr: true,
    qoe_analytics: true,
    apps_analytics: true,
    player_analytics: true,
    enhanced_trending: true,
    advanced_recommendation_content: true,
    tv_box_app: true,
    operator_app: true,
    managed_stb: true,
    smart_tv_app: true,
    super_aggregator: true,
    ses_360_license: 0,
    linear_transcoding: "",
    forecast: props.match.params.forecastId,
    project: props.match.params.projectId,
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
