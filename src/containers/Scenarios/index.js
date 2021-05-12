import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./style.scss";

import Sidebar from "../../components/Sidebar";

import NotFound from "../NotFound";
import Periods from "./Periods";
import Subscribers from "./Subscribers";
import Channels from "./Channels";
import VODContent from "./VODContent";
import TechParameters from './TechParameters';
import ChannelRampUp from './ChannelRampUp';
import SubscriberRampUp from './SubscriberRampUp';
import CommercialAddons from "./CommercialAddons";

function Scenarios() {
  return <></>;
}

function ScenariosContainer(props) {
  const links = [
    "Periods",
    "Subscribers",
    "Channels",
    "Tech Parameters",
    "VOD Content",
    "Subscriber Ramp Up",
    "Channel Ramp Up",
    "Commercial Add Ons"
  ];
  return (
    <>
      <Sidebar title="Projects" sublink={`/${props.match.params.projectId}/Setup/Scenarios/${props.match.params.forecastId}`} links={links} />
      <div className="right-container">
        <Switch>
          <Route
            exact
            path="/App/Projects/:projectId/Setup/Scenarios/:forecastId/Periods"
            component={Periods}
          />
          <Route
            exact
            path="/App/Projects/:projectId/Setup/Scenarios/:forecastId/Subscribers"
            component={Subscribers}
          />
          <Route
            exact
            path="/App/Projects/:projectId/Setup/Scenarios/:forecastId/Channels"
            component={Channels}
          />
          <Route
            exact
            path="/App/Projects/:projectId/Setup/Scenarios/:forecastId/VODContent"
            component={VODContent}
          />
           <Route
            exact
            path="/App/Projects/:projectId/Setup/Scenarios/:forecastId/TechParameters"
            component={TechParameters}
          />
          <Route
            exact
            path="/App/Projects/:projectId/Setup/Scenarios/:forecastId/SubscriberRampUp"
            component={SubscriberRampUp}
          />
          <Route
            exact
            path="/App/Projects/:projectId/Setup/Scenarios/:forecastId/ChannelRampUp"
            component={ChannelRampUp}
          />
           <Route
            exact
            path="/App/Projects/:projectId/Setup/Scenarios/:forecastId/CommercialAddOns"
            component={CommercialAddons}
          />
          <Route exact path="/App/Projects/:projectId/Setup/Scenarios/:forecastId" component={Scenarios} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

export default withRouter(ScenariosContainer);
