import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import "./style.scss";


import Sidebar from "../../components/Sidebar";



import NotFound from '../NotFound';
import Periods from './Periods';
import Subscribers from './Subscribers';


function Scenarios() {
  

  return (
    <>
      
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
          <Route exact path="/App/Projects/Scenarios/Subscribers" component={Subscribers} />
          {/* <Route exact path="/App/Projects/Scenarios/Pricing" component={Pricing} /> */}
          <Route exact path="/App/Projects/Scenarios" component={Scenarios} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

export default ScenariosContainer;
