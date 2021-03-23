import React, { useState, useEffect } from "react";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";
import Grid from "../../../components/Grid";
import schema from "./metadata/schema.json";
import data from "./metadata/data.json";
import useNotify from "../../../actions/Toast";
import cloneDeep from "lodash/cloneDeep";

import Modal from "../../../components/Solution";
import { getSolutionOptionList, getSolutions } from "./service";

function MasterSolution() {
  const { notify } = useNotify();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("ADD");
  const [solutions, setSolutions] = useState([]);

  const initialState = {
    category: "",
    subcategory: "",
    vendor: "",
    cost_item: "",
    feature: "",
    sub_feature: "",
  };
  const [formData, setFormData] = useState(cloneDeep(initialState));

  const handleShow = () => {
    setMode("ADD");
    setShow(true);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getSolutions()
      .then((res) => {
        setSolutions(res);
      })
      .catch((err) =>
        notify("Oops! Failed to fetch solution presets.", "error")
      );
    // getSolutionOptionList()
    //   .then((res) => {
    //     setOptions(res);
    //   })
    //   .catch((err) =>
    //     notify("Oops! Failed to fetch solution presets.", "error")
    //   );
  };

  const onFormSubmit = () => {
    if (mode === "ADD") onSave();
    else onEdit();
  };

  const onSave = () => {
    // saveCategory(formData)
    //   .then((res) => {
    //     notify(
    //       `${formData.name} category has been added successfully.`,
    //       "success"
    //     );
    //     onFormCancel();
    //     onLoad();
    //   })
    //   .catch((err) =>
    //     notify(`Oops! Failed to add new category ${formData.name}.`, "error")
    //   );
  };

  const onEdit = () => {
    // editCategory(formData)
    //   .then((res) => {
    //     notify(
    //       `${formData.name} category has been saved successfully.`,
    //       "success"
    //     );
    //     onFormCancel();
    //     onLoad();
    //   })
    //   .catch((err) =>
    //     notify(`Oops! Failed to add save category ${formData.name}.`, "error")
    //   );
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
        <h1>Master Solution</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD SOLUTION <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container">
        <Grid data={data} schema={schema} />
      </div>
    </>
  );
}

export default MasterSolution;
