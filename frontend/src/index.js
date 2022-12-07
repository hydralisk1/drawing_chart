import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TickerProvider from './TickerContext';

const Root = () => {
  return (
    <TickerProvider>
      <App />
    </TickerProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
