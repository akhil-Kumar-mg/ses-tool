
import React, { useState } from 'react'
import './style.scss';
import FaIcons from "../../../components/fa-icons";
import Grid from '../../../components/Grid';
import schema from './metadata/schema.json'
import data from './metadata/data.json'
function MasterSolution() {



  return (
<>
      <div className="header">
        <h1>Master Solution</h1>
        <button type="button" className="btn btn-primary">
          ADD SOLUTION <FaIcons icon="plus" />
        </button>
      </div>
    <div className="sub-container">
      <Grid data={data} schema={schema}/>
    </div>
      
    </>
  );
}

export default MasterSolution;
