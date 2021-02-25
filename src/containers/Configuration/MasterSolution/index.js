
import React, { useState } from 'react'
import './style.scss';
import FaIcons from "../../../components/fa-icons";

function MasterSolution() {


  return (
<>
      <div className="header">
        <h1>Master Solution</h1>
        <button type="button" className="btn btn-primary">
          ADD SOLUTION <FaIcons icon="plus" />
        </button>
      </div>
    </>
  );
}

export default MasterSolution;
