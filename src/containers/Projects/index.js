import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./style.scss";

import Sidebar from "../../components/Sidebar";

import PNL from './PNL';
import Scenarios from './Scenarios';
import SolutionSheet from './SolutionSheet';
import Pricing from './Pricing';

import NotFound from '../NotFound';

function Projects(){
  return <></>
}

function ProjectsContainer() {
  const links = ["Scenarios", "Solution Sheet", "Pricing"]
  return (
    <>
      <Sidebar title="Projects" links={links}/>
      <div className="right-container">
        <Switch>
          {/* <Route exact path="/App/Projects/PNL" component={PNL} /> */}
          <Route exact path="/App/Projects/Scenarios" component={Scenarios} />
          <Route exact path="/App/Projects/SolutionSheet" component={SolutionSheet} />
          <Route exact path="/App/Projects/Pricing" component={Pricing} />
          <Route exact path="/App/Projects" component={Projects} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

export default ProjectsContainer;
