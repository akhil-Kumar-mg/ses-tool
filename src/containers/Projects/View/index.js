import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useNotify from "../../../actions/Toast";
import FaIcons from "../../../components/fa-icons";
import Grid from "../../../components/Grid";
import { getForecasts } from "../service";
import schemaJSON from "./metadata/schema.json";
import { generatePL, getPL } from "./service";
import { cloneDeep } from "lodash";
import "./style.scss";

const VIEW_TYPE = {
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
  CATEGORY: "CATEGORY P/L",
  REVENUE: "REVENUE",
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

  const getCategoryColumns = () => {
    const _schema = cloneDeep(schemaJSON);
    _schema.columns.push({
      name: "OP EX CATEGORY",
      field: "category",
    });
    for (let i = 1; i <= yearlyData.year_count; i++) {
      _schema.columns.push({
        name: `YEAR ${i}`,
        field: i,
      });
    }
    return _schema;
  };

  const getRevenueColumns = () => {
    const _schema = cloneDeep(schemaJSON);
    _schema.columns.push({
      name: "REVENUE CATEGORY",
      field: "category",
    });
    for (let i = 1; i <= yearlyData.year_count; i++) {
      _schema.columns.push({
        name: `YEAR ${i}`,
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
      case VIEW_TYPE.CATEGORY:
        setSchema(getCategoryColumns());
        break;
      case VIEW_TYPE.REVENUE:
        setSchema(getRevenueColumns());
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
      case VIEW_TYPE.CATEGORY:
        setData(getCategoryData());
        break;
      case VIEW_TYPE.REVENUE:
        setData(getRevenueData());
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
    if (yearlyData.items) {
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

  const getCategoryData = () => {
    let rows = [];
    if (yearlyData.items && yearlyData.items.length > 0) {
      let categoryMapping = [];
      for (let index in yearlyData.items) {
        if(yearlyData.items[index].item_type === "OPERATING_EXPENSE") {
          categoryMapping = yearlyData.items[index].category_mapping;
          for (let i = 0; i < categoryMapping.length; i++) {
            let row = {};
            row["category"] = categoryMapping[i].category;
            for (const key in categoryMapping[i].yearly_mapping) {
              row[key] = categoryMapping[i].yearly_mapping[key];
            }
            rows.push(row);
          }
        }
      }
    }
    return rows;
  };

  const getRevenueData = () => {
    let rows = [];
    if (yearlyData.items && yearlyData.items.length > 0) {
      let categoryMapping = [];
      for (let index in yearlyData.items) {
        if(yearlyData.items[index].item_type === "REVENUE") {
          categoryMapping = yearlyData.items[index].category_mapping;
          for (let i = 0; i < categoryMapping.length; i++) {
            let row = {};
            row["category"] = categoryMapping[i].category;
            for (const key in categoryMapping[i].yearly_mapping) {
              row[key] = categoryMapping[i].yearly_mapping[key];
            }
            rows.push(row);
          }
        }
      }
    }

    return rows;
  };

  const onViewClick = (view) => {
    setViewType(view);
  };

  const onGeneratePL = () => {
    let allPromises = [];
    for (let i = 0; i < forecast.length; i++) {
      let data = {
        forecast: forecast[i].id,
      };
      allPromises.push(generatePL(props.match.params.projectId, data));
    }

    Promise.all(allPromises)
      .then((res) => {
        notify("Successfully generated P/L's.", "success");
      })
      .catch((err) => {
        notify("Oops! Failed to generate P/L's.", "error");
      });
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
              <button
                type="button"
                className={`btn-primary`}
                onClick={() => onGeneratePL()}
              >
                GENERATE P/L
              </button>
            </div>
          </div>
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
            <button
              type="button"
              className={`btn  ${
                viewType === VIEW_TYPE.CATEGORY
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => onViewClick(VIEW_TYPE.CATEGORY)}
            >
              CATEGORY P/L
            </button>
            <button
              type="button"
              className={`btn  ${
                viewType === VIEW_TYPE.REVENUE ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => onViewClick(VIEW_TYPE.REVENUE)}
            >
              REVENUE
            </button>
          </div>
          {isLoaded && <Grid data={data} schema={schema} />}
        </div>
      </div>
    </>
  );
}

export default ProjectsPL;
