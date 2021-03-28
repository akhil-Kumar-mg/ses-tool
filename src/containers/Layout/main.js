import React from "react";
import { useIntl } from "react-intl";
import { Route, Switch, Redirect } from "react-router-dom";
import FaIcons from "../../components/fa-icons";

import Configuration from "../Configuration";
import Projects from "../Projects";
import Scenarios from "../Scenarios";
import ProjectSetup from "../Projects/layout";
import ViewProject from '../Projects/View';
import Home from "../Home";
import NotFound from "../NotFound";

const Main = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
}) => {
  const intl = useIntl();
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaIcons icon="user" />
      </div>

      <div className="main-container">
        <Switch>
          <Route path="/App/Configuration" component={Configuration} />
          <Route path="/App/Projects/:projectId/Setup/Scenarios/:forecastId" component={Scenarios} />
          <Route path="/App/Projects/:projectId/Setup" component={ProjectSetup} />
          <Route path="/App/Projects/View" component={ViewProject} />
          <Route path="/App/Projects" exact component={Projects} />
          
          <Route path="/App" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
{/* 
      <footer>
        <small>© 2021 SES Master Tool</small>
        <br />
      </footer> */}
    </main>
  );
};

export default Main;
