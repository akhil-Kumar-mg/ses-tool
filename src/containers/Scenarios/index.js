import React from "react";
import { Route, Switch } from "react-router-dom";
import "./style.scss";

import Sidebar from "../../components/Sidebar";

import NotFound from "../NotFound";
import Periods from "./Periods";
import Subscribers from "./Subscribers";
import Channels from "./Channels";
import VODContent from "./VODContent";
function Scenarios() {
  return <></>;
}

function ScenariosContainer() {
  const links = [
    "Periods",
    "Subscribers",
    "Channels",
    "TechParameters",
    "VODContent",
    "SubscriberRampUp",
    "ChannelRampUp",
  ];
  return (
    <>
      <Sidebar title="Projects" sublink="/Scenarios" links={links} />
      <div className="right-container">
        <Switch>
          <Route
            exact
            path="/App/Projects/Scenarios/Periods"
            component={Periods}
          />
          <Route
            exact
            path="/App/Projects/Scenarios/Subscribers"
            component={Subscribers}
          />
          <Route
            exact
            path="/App/Projects/Scenarios/Channels"
            component={Channels}
          />
          <Route
            exact
            path="/App/Projects/Scenarios/VODContent"
            component={VODContent}
          />
          <Route exact path="/App/Projects/Scenarios" component={Scenarios} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

export default ScenariosContainer;
