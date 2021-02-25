
import React, { useState } from 'react'
import './style.scss';
import FaIcons from "../../../components/fa-icons";

function SolutionSheet() {


  return (
<>
      <div className="header">
        <h1>Solution Sheet</h1>
        <button type="button" className="btn btn-primary">
          ADD SOLUTION <FaIcons icon="plus" />
        </button>
      </div>

      <hr />
    </>
  );
}

export default SolutionSheet;
