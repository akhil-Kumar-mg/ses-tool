
import React, { useContext, useEffect, useState } from 'react'
import './style.scss';
import { IntlProvider } from 'react-intl';
import messages from '../../constants/messages';
import { Context as AppContext } from "../../context/AppContext";
import Layout from '../Layout';

function App() {
  const [locale, setLocale] = useState('en');
  const appContext = useContext(AppContext);
  useEffect(()=>{
    appContext.fetchConfigs();
  }, [])

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Layout setLocale={setLocale} />
    </IntlProvider>
  );
}

export default App;
