import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import "./style.scss";
import FaIcons from "../../components/fa-icons";

import Sidebar from "../../components/Sidebar";

import Grid from "../../components/Grid";
import schema from "./metadata/schema.json";
import data from "./metadata/data.json";

import NotFound from '../NotFound';
import Periods from '../Periods';

import Modal from "./Add";

function Scenarios() {
  const initialState = {
    name: "",
    sub_categories: [],
  };
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("SETUP");
  const handleShow = () => {
    setMode("SETUP");
    setShow(true);
  };

  const [formData, setFormData] = useState(cloneDeep(initialState));

  const onGridChange = (event, item) => {
    switch (event) {
      case "onSetup":
        // handlePricing()
        break;
    }
  };

  const onFormSubmit = () => {
    if (mode === "SETUP") onSave();
    else onEdit();
  };

  const onEdit = () => {};

  const onSave = () => {};
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
        <h1>Scenarios</h1>
        <button type="button" className="btn btn-primary" onClick={handleShow}>
          ADD FORECAST <FaIcons icon="plus" />
        </button>
      </div>
      <div className="sub-container">
        <Grid data={data} schema={schema} onChange={onGridChange} />
      </div>
    </>
  );
}

function ScenariosContainer() {
  const links = ["Periods", "Subscribers", "Channel", "Tech Parameters", "VOD Content", "Subscriber Ramp Up", "Channel Ramp Up"]
  return (
    <>
      <Sidebar title="Projects" sublink="/Scenarios" links={links}/>
      <div className="right-container">
        <Switch>
          <Route exact path="/App/Projects/Scenarios/Periods" component={Periods} />
          {/* <Route exact path="/App/Projects/Setup/SolutionSheet" component={SolutionSheet} />
          <Route exact path="/App/Projects/Setup/Pricing" component={Pricing} /> */}
          <Route exact path="/App/Projects/Scenarios" component={Scenarios} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

export default ScenariosContainer;
