import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useNotify from "../../../actions/Toast";
import FaIcons from "../../../components/fa-icons";
import Grid from "../../../components/Grid";
import { getForecasts } from "../service";
import monthlySchema from "./metadata/schema-monthly-forecast.json";
import schema from "./metadata/schema.json";
import { getPL } from "./service";
import "./style.scss";

function ProjectsPL(props) {
  const history = useHistory();
  const { notify } = useNotify();
  const [forecast, setForecast] = useState([]);
  const [currentForecast, setCurrentForecast] = useState([]);
  const [pl, setPL] = useState([]);
  const [showMonthlyDetails, setShowMonthlyDetails] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    onLoad();
  }, []);

  const handleYearColums = (yearCount) => {
    schema.columns = [];
    schema.columns.push({
      name: "P/L PARAMETERS",
      field: "item_type",
    });
    for (let i = 1; i <= yearCount; i++) {
      schema.columns.push({
        name: "YEAR" + " " + i,
        field: "yearly_mapping_" + i,
      });
    }
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

  const handleMonthlyData = () => {
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
      for (let i = 1; i <= currentForecast.number_of_months; i++) {
        row[i] = currentForecast[parameters[j]][i];
      }
      rows.push(row);
    }
    setMonthlyData(rows);
  };

  const onLoad = () => {
    getForecasts(props.match.params.projectId)
      .then((res) => {
        setForecast(res);
        setCurrentForecast(res[0]);
        loadPL(props.match.params.projectId, res[0].id);
      })
      .catch((err) => notify("Oops! Failed to fetch forecasts.", "error"));
  };

  const onGridChange = (event, item) => {
    switch (event) {
      case "onSetup":
        break;
    }
  };

  const loadPL = (projectId, forecastId) => {
    getPL(projectId, forecastId)
      .then((res) => {
        handleYearColums(res.year_count);
        setPL(res.items);
      })
      .catch((err) => notify("Oops! Failed to fetch P/L's.", "error"));
  };

  const onScenarioChange = (index) => {
    setCurrentForecast(forecast[index]);
    loadPL(props.match.params.projectId, forecast[index].id);
  };

  const handleMonthlyDetails = () => {
    setShowMonthlyDetails(true);
    handleSchema();
    handleMonthlyData();
  };

  return (
    <>
      <div className="project-view-container">
        <div className="header">
          <h1>Projects</h1>
          <h3>
            <FaIcons
              icon="arrow-left"
              onClick={() => {
                history.goBack();
              }}
              style={{ marginRight: 20 }}
            />
            P/L - {props.location.state.projectName}
          </h3>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleMonthlyDetails}
            >
              VIEW MONTHLY
            </button>
            <div className="form-group">
              <label>P/L Scenarios</label>
              <select
                className="form-control"
                value={forecast.name}
                onChange={(e) => {
                  onScenarioChange(e.target.value);
                }}
              >
                {forecast &&
                  forecast.length &&
                  forecast.map((item, index) => {
                    return (
                      <option key={item} value={index}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
        <div className="sub-container">
          {showMonthlyDetails ? (
            <>
              <Grid
                data={monthlyData}
                schema={monthlySchema}
                onChange={onGridChange}
              />
            </>
          ) : (
            <>
              <Grid data={pl} schema={schema} onChange={onGridChange} />{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectsPL;
