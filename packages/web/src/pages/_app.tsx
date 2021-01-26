import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import axios from 'axios';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/csrf-token', {
        withCredentials: true
      })
      .then(res => {
        axios.defaults.headers['CSRF-Token'] = res.data.csrf;
        axios.defaults.withCredentials = true;
      });
  }, []);

  return <Component {...pageProps} />;
};

export default App;
