import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import categories from './data/categories.json';
import merchants from './data/merchants.json';
import transactions from './data/transactions.json';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <App
    categories={categories}
    merchants={merchants}
    transactions={transactions}
  />
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
