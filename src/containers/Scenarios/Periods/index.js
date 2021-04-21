import { omit } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import React, { useEffect, useState } from "react";
import useNotify from "../../../actions/Toast";
import FaIcons from "../../../components/fa-icons";
import Grid from "../../../components/Grid";
import Modal from "./Add";
import schema from "./metadata/schema.json";
import { deletePeriod, editPeriod, getPeriods, savePeriod } from "./service";
import "./style.scss";

function Periods(props) {
  const { notify } = useNotify();

  const initialState = {
    periods: [
      {
        period_name: "",
        start_month: "",
        end_month: "",
      },
    ],
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
    getPeriods(props.match.params.forecastId, props.match.params.projectId)
      .then((res) => {
        res.forEach((period) => {
          period.total = period.end_month - period.start_month + 1;
        });
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
    let _formData = cloneDeep(
      omit(formData, ["end_month", "id", "period_name", "start_month", "total"])
    );
    editPeriod(_formData)
      .then((res) => {
        notify(
          `${_formData.period_name} period has been added successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(
          `Oops! Failed to add save period ${_formData.period_name}.`,
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
        let _formdata = cloneDeep(item);
        _formdata.periods = [
          {
            id: item.id,
            period_name: item.period_name,
            start_month: item.start_month,
            end_month: item.end_month,
          },
        ];
        setFormData(_formdata);
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
