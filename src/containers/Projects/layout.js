import React, { useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./style.scss";

import Sidebar from "../../components/Sidebar";
import Scenarios from './Scenarios';
import SolutionSheet from '../SolutionSheet';
import Pricing from '../Pricing';

import NotFound from '../NotFound';

function Projects(){
  return <></>
}

function ProjectsContainer(props) {
  const links = ["Scenarios", "Solution Sheet", "Pricing"]
  return (
    <>
      <Sidebar title="Projects" sublink={`/${props.match.params.projectId}/Setup`} links={links}/>
      <div className="right-container">
        <Switch>
          <Route exact path="/App/Projects/:projectId/Setup/Scenarios" component={Scenarios} />
          <Route exact path="/App/Projects/:projectId/Setup/SolutionSheet" component={SolutionSheet} />
          <Route exact path="/App/Projects/:projectId/Setup/Pricing" component={Pricing} />
          <Route exact path="/App/Projects/:projectId/Setup" component={Projects} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}



export default withRouter(ProjectsContainer);
