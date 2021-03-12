import React, { useState } from "react";
import "./style.scss";


import Grid from "../../components/Grid";
import schema from "./metadata/schema.json";
import data from "./metadata/data.json";

import Modal from "../../components/Solution";

function SolutionSheet() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const onGridChange = (event, item) => {
    switch (event) {
      case "onEdit":
        handleShow()
        break;
    }
  };
  return (
    <>
    <Modal show={show} setShow={setShow}/>
      <div className="header">
        <h1>Solution Sheet</h1>
        {/* <button type="button" className="btn btn-primary">
          ADD SOLUTION <FaIcons icon="plus" />
        </button> */}
      </div>
      <div className="sub-container">
        <Grid data={data} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}

export default SolutionSheet;
