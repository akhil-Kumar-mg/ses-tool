import cloneDeep from "lodash/cloneDeep";
import React, { useState, useEffect } from "react";
import useNotify from "../../../actions/Toast";
import Form from "./form";
import { saveTechParameters, getTechParameters } from "./service";
import "./style.scss";

function TechParameters(props) {
  const { notify } = useNotify();

  const initialState = {
    abr_video: "",
    abr_audio: "",
    vod_hit_rate: "",
    linear_hit_rate: "",
    catchup_hit_rate: "",
    geo_blocking: false,
    drm: false,
    ses_cj: false,
    download_to_go: false,
    download_to_on: false,
    tvod: false,
    npvr: false,
    qoe_analytics: false,
    apps_analytics: false,
    player_analytics: false,
    enhanced_trending: false,
    mfa_sms_count: "",
    avg_ads_per_linear_hour:"",
    avg_ads_per_vod_hour:"",
    advanced_recommendation_content: false,
    tv_box_app: false,
    operator_app: false,
    managed_stb: false,
    smart_tv_app: false,
    super_aggregator: false,
    ses_360_license: 0,
    linear_transcoding: "",
    forecast: props.match.params.forecastId,
    project: props.match.params.projectId,
  };

  const [formData, setFormData] = useState(cloneDeep(initialState));

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getTechParameters(props.match.params.forecastId, props.match.params.projectId)
      .then((res) => {
        if(res && res.length > 0) {
          setFormData(cloneDeep(res[0]));
        }
      })
      .catch((err) => notify("Oops! Failed to fetch tech parameter", "error"));
  };

  const onSave = () => {
    let _formData = cloneDeep(formData);
    _formData.forecast = props.match.params.forecastId;
    _formData.project = props.match.params.projectId;
    
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
