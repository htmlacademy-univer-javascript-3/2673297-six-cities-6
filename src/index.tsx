import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './reactComponents/app/app.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offerCardCount={5}/>
  </React.StrictMode>
);
