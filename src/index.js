import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.scss';
import App from './App';
import { Provider as AppProvider } from "./context/AppContext";
import { ToastProvider } from "react-toast-notifications";
import reportWebVitals from './reportWebVitals';
import ServiceWorkerWrapper from "./serviceworker.main";

import NotFound from "./containers/NotFound/NotFound";

ReactDOM.render(
  <React.StrictMode>
    <ServiceWorkerWrapper />
    <ToastProvider placement="top-center">
      <AppProvider>
      <HashRouter>
            <Switch>
            <Route path="/app" component={App} />
            {/* <Redirect from="/" to="/app" /> */}
            <Route component={NotFound} />
            </Switch>
          </HashRouter>  
      </AppProvider>
    </ToastProvider>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
