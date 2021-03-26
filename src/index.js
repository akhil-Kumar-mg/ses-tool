import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.scss';
import "@fortawesome/fontawesome-free/css/all.min.css";

import App from './containers/App';
import { Provider as AppProvider } from "./context/AppContext";
import { ToastProvider } from "react-toast-notifications";
import reportWebVitals from './reportWebVitals';
import ServiceWorkerWrapper from "./serviceworker.main";

import NotFound from "./containers/NotFound";
if(module.hot){
  module.hot.accept()
}
ReactDOM.render(
  <React.StrictMode>
    <ServiceWorkerWrapper />
    <ToastProvider placement="top-center">
      <AppProvider>
      <BrowserRouter>
            <Switch>
              <Route path="/App" component={App} />
              <Redirect from="/" to="/App" />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>  
      </AppProvider>
    </ToastProvider>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
