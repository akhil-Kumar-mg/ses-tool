import React from "react";
import { useIntl } from "react-intl";
import { Route, Switch, Redirect } from "react-router-dom";
import FaIcons from "../../components/fa-icons";

import Configuration from "../Configuration";
import Projects from "../Projects";
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
          <Route path="/App/Projects" component={Projects} />
          <Redirect from="/" to="/App/Configuration" />
          <Route component={NotFound} />
        </Switch>
      </div>

      <footer>
        <small>© 2021 SES Master Tool</small>
        <br />
      </footer>
    </main>
  );
};

export default Main;
