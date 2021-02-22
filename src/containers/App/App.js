
import React, { useState } from 'react'
import './App.scss';
import { IntlProvider } from 'react-intl';
import messages from '../../constants/messages';
import Layout from '../Layout/Layout';

function App() {
  const [locale, setLocale] = useState('en');

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Layout setLocale={setLocale} />
    </IntlProvider>
  );
}

export default App;
