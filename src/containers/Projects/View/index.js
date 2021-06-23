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
  MONTHLY: "PROJECT PARAMETERS",
  YEARLY: "P/L",
  CATEGORY: "COST CATEGORY",
  REVENUE: "REVENUE CATEGORY",
  SOLUTION: "SOLUTION",
  PRICING: "PRICING",
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
  const [generatingPL, setGeneratingPL] = useState(false);
  const [forecastId, setForecastId] = useState(null);

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      renderGridInfo(viewType);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (monthyData && monthyData.id) {
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
        if (res.length) {
          setForecast(res);
          let index = 0;
          if (forecastId != null) {
            index = forecast.findIndex((elem) => elem.id == forecastId);
          }
          setForecastId(forecastId);
          setMonthlyData(res[index]);
        }
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
      static: true
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
      static: true
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
      static: true
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
      static: true
    });
    for (let i = 1; i <= yearlyData.year_count; i++) {
      _schema.columns.push({
        name: `YEAR ${i}`,
        field: i,
      });
    }
    return _schema;
  };

  const getPricingColumns = () => {
    const _schema = cloneDeep(schemaJSON);
    _schema.width = "100vw";
    _schema.columns.push({
      name: "NAME",
      field: "name",
      static: true
    });
    for (let i = 1; i <= monthyData.number_of_months; i++) {
      _schema.columns.push({
        name: `MONTH ${i}`,
        field: i,
      });
    }

    return _schema;
  };

  const getSolutionColumns = () => {
    const _schema = cloneDeep(schemaJSON);
    _schema.width = "100vw";
    _schema.columns.push({
      name: "NAME",
      field: "name",
      static: true
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
      case VIEW_TYPE.CATEGORY:
        setSchema(getCategoryColumns());
        break;
      case VIEW_TYPE.REVENUE:
        setSchema(getRevenueColumns());
        break;
      case VIEW_TYPE.PRICING:
        setSchema(getPricingColumns());
        break;
      case VIEW_TYPE.SOLUTION:
        setSchema(getSolutionColumns());
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
      case VIEW_TYPE.PRICING:
        setData(getPricingData());
        break;
      case VIEW_TYPE.SOLUTION:
        setData(getSolutionData());
        break;
    }
  };

  const getMonthlyData = () => {
    let rows = [];
    let parameters = Object.keys(monthyData).filter((data) =>
      data.includes("monthly")
    );
    for (let j = 0; j < parameters.length; j++) {
      let row = {};
      row["parameter"] = parameters[j];
      for (let i = 1; i <= monthyData.number_of_months; i++) {
        row[i] =
          monthyData[parameters[j]][i] != null
            ? monthyData[parameters[j]][i].toLocaleString()
            : null;
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
          let suffixString = "";
          if (row["item_type"].includes("MARGIN")) {
            suffixString = "%";
          }
          if (yearlyData.items[i].yearly_mapping[j] != null) {
            row[j] = `${yearlyData.items[i].yearly_mapping[
              j
            ].toLocaleString()} ${suffixString}`;
          }
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
        if (yearlyData.items[index].item_type === "OPERATING_EXPENSE") {
          categoryMapping = yearlyData.items[index].category_mapping;
          for (let i = 0; i < categoryMapping.length; i++) {
            let row = {};
            row["category"] = categoryMapping[i].category;
            for (const key in categoryMapping[i].yearly_mapping) {
              row[key] =
                categoryMapping[i].yearly_mapping[key].toLocaleString();
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
        if (yearlyData.items[index].item_type === "REVENUE") {
          categoryMapping = yearlyData.items[index].category_mapping;
          for (let i = 0; i < categoryMapping.length; i++) {
            let row = {};
            row["category"] = categoryMapping[i].category;
            for (const key in categoryMapping[i].yearly_mapping) {
              row[key] =
                categoryMapping[i].yearly_mapping[key].toLocaleString();
            }
            rows.push(row);
          }
        }
      }
    }

    return rows;
  };

  const getSolutionData = () => {
    let rows = [];
    if (yearlyData.solutions && yearlyData.solutions.length > 0) {
      for (let i = 0; i < yearlyData.solutions.length; i++) {
        let row = {};
        row["name"] = yearlyData.solutions[i].name;

        for (let j = 1; j <= monthyData.number_of_months; j++) {
          if (yearlyData.solutions[i].monthly_mapping[j] != null) {
            row[j] = `${yearlyData.solutions[i].monthly_mapping[
              j
            ].toLocaleString()}`;
          }
        }
        rows.push(row);
      }
    }
    return rows;
  };

  const getPricingData = () => {
    let rows = [];
    if (yearlyData.pricing && yearlyData.pricing.length > 0) {
      for (let i = 0; i < yearlyData.pricing.length; i++) {
        let row = {};
        row["name"] = yearlyData.pricing[i].name;

        for (let j = 1; j <= monthyData.number_of_months; j++) {
          if (yearlyData.pricing[i].monthly_mapping[j] != null) {
            row[j] = `${yearlyData.pricing[i].monthly_mapping[
              j
            ].toLocaleString()}`;
          }
        }
        rows.push(row);
      }
    }
    return rows;
  };

  const onViewClick = (view) => {
    setViewType(view);
  };

  const onGeneratePL = () => {
    setGeneratingPL(true);
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
        setGeneratingPL(false);
        onLoad();
      })
      .catch((err) => {
        setGeneratingPL(false);
        notify("Oops! Failed to generate P/L's.", "error");
      });
  };

  const enableFullWidth = () =>{
    return viewType === VIEW_TYPE.MONTHLY || viewType === VIEW_TYPE.SOLUTION || viewType === VIEW_TYPE.PRICING
  }

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
                value={forecastId}
                onChange={(e) => {
                  setForecastId(e.target.value);
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
        {!generatingPL ? (
          <div
            className={`sub-container ${
              enableFullWidth() ? "monthly-grid-container" : ""
            }`}
          >
            <div className="btn-group" role="group">
              {Object.keys(VIEW_TYPE).map((item, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className={`btn  ${
                      viewType === VIEW_TYPE[item] ? "btn-primary" : "btn-secondary"
                    }`}
                    onClick={() => onViewClick(VIEW_TYPE[item])}
                  >
                    {VIEW_TYPE[item]}
                  </button>
                );
              })}
            </div>
            {isLoaded && <Grid data={data} schema={schema} />}
          </div>
        ) : (
          <div className="spinner">
            <FaIcons
              icon={"spinner fa-spin"}
              style={{
                fontSize: 70,
                marginRight: 30,
              }}
            />
            <h1>Generating P/L !</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectsPL;
