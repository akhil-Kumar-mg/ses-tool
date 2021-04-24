import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import { useHistory, withRouter } from "react-router-dom";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";
import useNotify from "../../../actions/Toast";

import Grid from "../../../components/Grid";
import schema from "./metadata/schema.json";

import { getForecasts, saveForecast } from "../service";

import Modal from "./Add";

function Scenarios(props) {
  const history = useHistory();
  const { notify } = useNotify();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("SETUP");
  const [forecast, setForecast] = useState([]);
  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getForecasts(props.match.params.projectId)
      .then((res) => {
        setForecast(res);
      })
      .catch((err) => notify("Oops! Failed to fetch forecasts.", "error"));
  };

  const initialState = {
    project: props.match.params.projectId,
    name: "",
    expected_start_date: "",
    number_of_months: "",
  };
  const [formData, setFormData] = useState(cloneDeep(initialState));

  const handleShow = () => {
    setMode("SETUP");
    setShow(true);
  };

  const onGridChange = (event, forecast) => {
    switch (event) {
      case "onSetup":
        history.push(
          `/App/Projects/${props.match.params.projectId}/Setup/Scenarios/${forecast.id}/Periods`
        );

        break;
    }
  };

  const onFormSubmit = () => {
    if (mode === "SETUP") onSave();
    else onEdit();
  };

  const onEdit = () => {};

  const onSave = () => {
    saveForecast(formData)
      .then((res) => {
        notify(
          `${formData.name} forecast has been added successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to add new forecast ${formData.name}.`, "error")
      );
  };
  const onFormCancel = () => {
    setShow(false);
    setFormData(cloneDeep(initialState));
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
        <h1>Scenarios</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD FORECAST <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container">
        <Grid data={forecast} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}

export default withRouter(Scenarios);
