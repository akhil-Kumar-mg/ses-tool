import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import { useHistory, withRouter } from "react-router-dom";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";
import useNotify from "../../../actions/Toast";

import Grid from "../../../components/Grid";
import schema from "./metadata/schema.json";
import monthlySchema from "./metadata/schema-monthly-forecast.json";

import { deleteForecast, getForecasts, saveForecast } from "../service";

import Modal from "./Add";

function Scenarios(props) {
  const history = useHistory();
  const { notify } = useNotify();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("SETUP");
  const [forecast, setForecast] = useState([]);
  const [showMonthlyDetails, setShowMonthlyDetails] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);

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

  const handleSchema = () => {
    monthlySchema.columns = [];
    monthlySchema.columns.push({
      name: "PARAMETERS",
      field: "parameter",
    });
    for (let i = 1; i <= 12; i++) {
      monthlySchema.columns.push({
        name: "MONTH" + " " + i,
        field: i,
      });
    }
  };

  const handleMonthlyData = (forecast) => {
    let rows = [];
    let parameters = [
      "monthly_catchup_hours",
      "monthly_channel_count",
      "monthly_channel_hours",
      "monthly_content_consumed_catchup_gb",
      "monthly_content_consumed_gb",
      "monthly_content_consumed_linear_gb",
      "monthly_content_consumed_vod_gb",
      "monthly_content_stored_origin_gb",
      "monthly_impression",
      "monthly_origin_hit_gb",
      "monthly_subscriber_count",
      "monthly_vod_hours",
    ];
    for (let j = 0; j < parameters.length; j++) {
      let row = {};
      row["parameter"] = parameters[j];
      for (let i = 1; i <= forecast.number_of_months; i++) {
        row[i] = forecast[parameters[j]][i];
      }
      rows.push(row);
    }
    setMonthlyData(rows);
  };

  const onGridChange = (event, forecast) => {
    switch (event) {
      case "onSetup":
        history.push(
          `/App/Projects/${props.match.params.projectId}/Setup/Scenarios/${forecast.id}/Periods`
        );
      case "view":
        setShowMonthlyDetails(true);
        handleSchema();
        handleMonthlyData(forecast);
        break;
      case "delete":
        onDelete(forecast);
        break;
    }
  };

  const onDelete = (data) => {
    const r = window.confirm(`Do you wish to remove '${data.name}' scenario?`);
    if (r === true) {
      deleteForecast(data.id)
        .then((res) => {
          notify(
            `'${data.name}' scenario has been removed successfully.`,
            "success"
          );
          onLoad();
        })
        .catch((err) =>
          notify(`Oops! Failed to remove ${data.name} scenario.`, "error")
        );
    } else {
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

  if (showMonthlyDetails) {
    return (
      <>
        <div className="header">
          <h3>
            <FaIcons
              icon="arrow-left"
              style={{ marginRight: "20px" }}
              onClick={() => {
                setShowMonthlyDetails(false);
              }}
            />
            Monthly Details
          </h3>
        </div>
        <div className="sub-container scenarios-monthly-grid-container">
          <Grid
            data={monthlyData}
            schema={monthlySchema}
            onChange={onGridChange}
          />
        </div>
      </>
    );
  } else {
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleShow}
          >
            ADD SCENARIO <FaIcons icon="plus" />
          </button>
        </div>
        <div className="sub-container">
          <Grid data={forecast} schema={schema} onChange={onGridChange} />
        </div>
      </>
    );
  }
}

export default withRouter(Scenarios);
