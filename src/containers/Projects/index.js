import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./style.scss";

import Sidebar from "../../components/Sidebar";

import PNL from './PNL';
import Scenarios from './Scenarios';
import SolutionSheet from './SolutionSheet';
import Pricing from './Pricing';

import NotFound from '../NotFound';

function Projects() {
  const links = ["PNL", "Scenarios", "Solution Sheet", "Pricing"]
  return (
    <>
      <Sidebar title="Projects" links={links}/>
      <div className="right-container">
        <Switch>
          <Route path="/App/Projects/PNL" component={PNL} />
          <Route path="/App/Projects/Scenarios" component={Scenarios} />
          <Route path="/App/Projects/SolutionSheet" component={SolutionSheet} />
          <Route path="/App/Projects/Pricing" component={Pricing} />
          <Redirect from="/" to="/App/Projects" />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

export default Projects;
