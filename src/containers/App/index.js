
import React, { useContext, useEffect, useState } from 'react'
import './style.scss';
import { IntlProvider } from 'react-intl';
import messages from '../../constants/messages';
import { Context as AppContext } from "../../context/AppContext";
import Layout from '../Layout';
import useNotify from "../../actions/Toast";

function App() {
  const { notify } = useNotify();
  const [locale, setLocale] = useState('en');
  const appContext = useContext(AppContext);
  const { error, initLoaded } = appContext.state;
  
  useEffect(()=>{
    appContext.fetchConfigs();
  }, [])

  useEffect(()=>{
    if(error && error.message){
      notify(
        `Failed to load application configurations. Please try again later`,
        "error"
      );
    }
  }, [error])

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {initLoaded && <Layout setLocale={setLocale} /> }
    </IntlProvider>
  );
}

export default App;
