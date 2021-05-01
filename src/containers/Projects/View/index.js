import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";
import Grid from "../../../components/Grid";
import schema from "./metadata/schema.json";
import data from "./metadata/data.json";
import useNotify from "../../../actions/Toast";
import { getForecasts } from "../service";
import { getPL } from "./service";

function ProjectsPL(props) {
  const history = useHistory();
  const { notify } = useNotify();
  const [forecast, setForecast] = useState([]);
  const [pl, setPL] = useState([]);

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

  const onLoad = () => {
    getForecasts(props.match.params.projectId)
      .then((res) => {
        setForecast(res);
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

  const onScenarioChange = (forecastId) => {
    loadPL(props.match.params.projectId, forecastId);
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
            {/* <button
              type="button"
              className="btn btn-primary"
              // onClick={handleShow}
            >
              VIEW MONTHLY
            </button> */}
            <div className="form-group">
              <label>P/L Scenarios</label>
              <select
                className="form-control"
                value={forecast.name}
                onChange={(e) => onScenarioChange(e.target.value)}
              >
                {forecast &&
                  forecast.length &&
                  forecast.map((item) => {
                    return (
                      <option key={item} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
        <div className="sub-container">
          <Grid data={pl} schema={schema} onChange={onGridChange} />
        </div>
      </div>
    </>
  );
}

export default ProjectsPL;
