import React, { useState, useEffect } from "react";
import "./style.scss";
import FaIcons from "../../../components/fa-icons";
import Grid from "../../../components/Grid";
import schema from "./metadata/schema.json";
import data from "./metadata/data.json";
import useNotify from "../../../actions/Toast";

import Modal from "../../../components/Solution";
import { getSolutionOptionList } from "./service";

function MasterSolution() {
  const { notify } = useNotify();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("ADD");
  const [options, setOptions] = useState([]);

  const handleShow = () => {
    setMode("ADD");
    setShow(true);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getSolutionOptionList()
      .then((res) => {
        setOptions(res);
      })
      .catch((err) =>
        notify("Oops! Failed to fetch solution presets.", "error")
      );
  };

  return (
    <>
      <Modal
        show={show}
        // onCancel={onFormCancel}
        // formData={formData}
        // onChange={setFormData}
        // onSubmit={onFormSubmit}
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
