import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./style.scss";

import Sidebar from "../../components/Sidebar";

import Categories from './Categories';
import Vendors from './Vendors';
import MasterPricing from './MasterPricing';
import MasterSolution from './MasterSolution';

import NotFound from '../NotFound';

function Configuration() {
  const links = ["Categories", "Vendors", "Master Solution", "Master Pricing"]
  return (
    <>
      <Sidebar title="Configuration" links={links}/>
      <div className="right-container">
        <Switch>
          <Route path="/App/Configuration/Categories" component={Categories} />
          <Route path="/App/Configuration/Vendors" component={Vendors} />
          <Route path="/App/Configuration/MasterPricing" component={MasterPricing} />
          <Route path="/App/Configuration/MasterSolution" component={MasterSolution} />
          <Redirect from="/" to="/App/Configuration" />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

export default Configuration;
