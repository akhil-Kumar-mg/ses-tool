import cloneDeep from "lodash/cloneDeep";
import React, { useState, useEffect } from "react";
import FaIcons from "../../../components/fa-icons";
import Grid from "../../../components/Grid";
import Modal from "./Add";
import schema from "./metadata/schema.json";
import { deletePeriod, editPeriod, getPeriods, savePeriod } from "./service";
import "./style.scss";
import useNotify from "../../../actions/Toast";

function Periods(props) {
  const { notify } = useNotify();

  const initialState = {
    period_name: "",
    start_month: "",
    end_month: "",
    periods: [],
    project: props.match.params.projectId,
    forecast: props.match.params.forecastId,
  };

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("ADD");
  const [periods, setPeriods] = useState([]);
  const [formData, setFormData] = useState(cloneDeep(initialState));

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getPeriods(props.match.params.forecastId)
      .then((res) => {
        setPeriods(res);
      })
      .catch((err) => notify("Oops! Failed to fetch periods", "error"));
  };

  const handleShow = () => {
    setMode("ADD");
    setShow(true);
  };

  const onFormSubmit = () => {
    if (mode === "ADD") onSave();
    else onEdit();
  };

  const onEdit = () => {
    editPeriod(formData)
      .then((res) => {
        notify(
          `${formData.period_name} period has been added successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(
          `Oops! Failed to add save period ${formData.period_name}.`,
          "error"
        )
      );
  };

  const onSave = () => {
    savePeriod(formData)
      .then((res) => {
        notify(
          `${formData.period_name} period has been added successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(
          `Oops! Failed to add new period ${formData.period_name}.`,
          "error"
        )
      );
  };

  const onDelete = (data) => {
    const r = window.confirm(
      `Do you wish to remove '${data.period_name}' period?`
    );
    if (r === true) {
      deletePeriod(data.id)
        .then((res) => {
          notify(
            `'${data.period_name}' period has been removed successfully.`,
            "success"
          );
          onLoad();
        })
        .catch((err) =>
          notify(`Oops! Failed to remove ${data.period_name} period.`, "error")
        );
    } else {
    }
  };

  const onFormCancel = () => {
    setShow(false);
    setFormData(cloneDeep(initialState));
  };

  const onGridChange = (event, item) => {
    switch (event) {
      case "edit":
        setShow(true);
        setMode("EDIT");
        setFormData(cloneDeep(item));
        break;

      case "delete":
        onDelete(item);
        break;
    }
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
        <h1>Periods</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          SET PERIODS <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container">
        <Grid data={periods} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}

export default Periods;
