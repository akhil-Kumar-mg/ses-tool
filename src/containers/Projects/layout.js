import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./style.scss";

import Sidebar from "../../components/Sidebar";
import Scenarios from './Scenarios';
import SolutionSheet from '../SolutionSheet';
import Pricing from '../Pricing';

import NotFound from '../NotFound';

function Projects(){
  return <></>
}

function ProjectsContainer() {
  const links = ["Scenarios", "Solution Sheet", "Pricing"]
  return (
    <>
      <Sidebar title="Projects" sublink="/Setup" links={links}/>
      <div className="right-container">
        <Switch>
          <Route exact path="/App/Projects/Setup/Scenarios" component={Scenarios} />
          <Route exact path="/App/Projects/Setup/SolutionSheet" component={SolutionSheet} />
          <Route exact path="/App/Projects/Setup/Pricing" component={Pricing} />
          <Route exact path="/App/Projects/Setup" component={Projects} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}



export default ProjectsContainer;
