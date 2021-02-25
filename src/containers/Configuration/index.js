import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./style.scss";

import Sidebar from "../../components/Sidebar";

import Categories from './Categories';
import Vendors from './Vendors';
import MasterPricing from './MasterPricing';
import MasterSolution from './MasterSolution';

import NotFound from '../NotFound';

function Configuration(){
  return <></>
}

function ConfigurationContainer() {
  const links = ["Categories", "Vendors", "Master Solution", "Master Pricing"]
  return (
    <>
      <Sidebar title="Configuration" links={links}/>
      <div className="right-container">
        <Switch>
          <Route exact path="/App/Configuration/Categories" component={Categories} />
          <Route exact path="/App/Configuration/Vendors" component={Vendors} />
          <Route exact path="/App/Configuration/MasterPricing" component={MasterPricing} />
          <Route exact path="/App/Configuration/MasterSolution" component={MasterSolution} />
          <Route exact path="/App/Configuration" component={Configuration} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

export default ConfigurationContainer;
