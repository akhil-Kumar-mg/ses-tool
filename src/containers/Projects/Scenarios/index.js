
import React, { useState } from 'react'
import './style.scss';
import FaIcons from "../../../components/fa-icons";

function Scenarios() {


  return (
<>
      <div className="header">
        <h1>Scenarios</h1>
        <button type="button" className="btn btn-primary">
          ADD SCENARIOS <FaIcons icon="plus" />
        </button>
      </div>

      <hr />
    </>
  );
}

export default Scenarios;
