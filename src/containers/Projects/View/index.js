import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useNotify from "../../../actions/Toast";
import FaIcons from "../../../components/fa-icons";
import Grid from "../../../components/Grid";
import { getForecasts } from "../service";
import schemaJSON from "./metadata/schema.json";
import { getPL } from "./service";
import { cloneDeep } from "lodash";
import "./style.scss";

const VIEW_TYPE = {
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
};
function ProjectsPL(props) {
  const history = useHistory();
  const { notify } = useNotify();
  const [forecast, setForecast] = useState([]); //monthlyData
  const [data, setData] = useState([]); //Grid binded data
  const [monthyData, setMonthlyData] = useState({}); // yearlyData
  const [yearlyData, setYearlyData] = useState({});
  const [schema, setSchema] = useState(cloneDeep(schemaJSON));
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewType, setViewType] = useState(VIEW_TYPE.YEARLY);

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      renderGridInfo(viewType);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (monthyData.id) {
      loadPL(props.match.params.projectId, monthyData.id);
      renderGridInfo(viewType);
    }
  }, [monthyData]);

  useEffect(() => {
    renderGridInfo(viewType);
  }, [yearlyData]);

  useEffect(() => {
    renderGridInfo(viewType);
  }, [viewType]);

  const onLoad = () => {
    getForecasts(props.match.params.projectId)
      .then((res) => {
        setForecast(res);
        setMonthlyData(res[0]);
      })
      .catch((err) => notify("Oops! Failed to fetch forecasts.", "error"));
  };

  const loadPL = (projectId, forecastId) => {
    getPL(projectId, forecastId)
      .then((res) => {
        setYearlyData(res);
        setIsLoaded(true);
      })
      .catch((err) => notify("Oops! Failed to fetch P/L's.", "error"));
  };

  const onScenarioChange = (id) => {
    setMonthlyData(
      cloneDeep(forecast.find((item) => item.id.toString() === id))
    );
  };

  const getYearlyColumns = () => {
    const _schema = cloneDeep(schemaJSON);

    _schema.columns.push({
      name: "P/L PARAMETERS",
      field: "item_type",
    });
    for (let i = 1; i <= yearlyData.year_count; i++) {
      _schema.columns.push({
        name: `YEAR ${i}`,
        field: i,
      });
    }

    return _schema;
  };

  const getMonthlyColumns = () => {
    const _schema = cloneDeep(schemaJSON);
    _schema.width = "100vw";
    _schema.columns.push({
      name: "PARAMETERS",
      field: "parameter",
    });
    for (let i = 1; i <= monthyData.number_of_months; i++) {
      _schema.columns.push({
        name: `MONTH ${i}`,
        field: i,
      });
    }

    return _schema;
  };

  const renderGridInfo = (view) => {
    getSchema(view);
    getData(view);
  };

  const getSchema = (view) => {
    switch (view) {
      case VIEW_TYPE.MONTHLY:
        setSchema(getMonthlyColumns());

        break;
      case VIEW_TYPE.YEARLY:
        setSchema(getYearlyColumns());
        break;
    }
  };

  const getData = (view) => {
    switch (view) {
      case VIEW_TYPE.MONTHLY:
        setData(getMonthlyData());
        break;
      case VIEW_TYPE.YEARLY:
        setData(getYearlyData());
        break;
    }
  };

  const getMonthlyData = () => {
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
      for (let i = 1; i <= monthyData.number_of_months; i++) {
        row[i] = monthyData[parameters[j]][i];
      }
      rows.push(row);
    }
    return rows;
  };

  const getYearlyData = () => {
    let rows = [];
    if(yearlyData.items) {
      for (let i = 0; i < yearlyData.items.length; i++) {
        let row = {};
        row["item_type"] = yearlyData.items[i].item_type;
        for (let j = 1; j <= yearlyData.year_count; j++) {
          row[j] = yearlyData.items[i].yearly_mapping[j];
        }
        rows.push(row);
      }
    }
    return rows;
  };

  const onViewClick = (view) => {
    setViewType(view);
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
            <div className="form-group">
              <label>P/L Scenarios</label>
              <select
                className="form-control"
                value={forecast.id}
                onChange={(e) => {
                  onScenarioChange(e.target.value);
                }}
              >
                {forecast &&
                  forecast.length &&
                  forecast.map((item, index) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
        <div
          className={`sub-container ${
            viewType === VIEW_TYPE.MONTHLY ? "monthly-grid-container" : ""
          }`}
        >
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn  ${
                viewType === VIEW_TYPE.MONTHLY ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => onViewClick(VIEW_TYPE.MONTHLY)}
            >
              PROJECT PARAMETERS
            </button>
            <button
              type="button"
              className={`btn  ${
                viewType === VIEW_TYPE.YEARLY ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => onViewClick(VIEW_TYPE.YEARLY)}
            >
              P/L
            </button>
          </div>
          {isLoaded && <Grid data={data} schema={schema} />}
        </div>
      </div>
    </>
  );
}

export default ProjectsPL;
