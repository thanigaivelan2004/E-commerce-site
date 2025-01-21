import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import  Shopcontextprovider from './context/shopcontext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Shopcontextprovider>
  <App />
  </Shopcontextprovider>
    
  </BrowserRouter>,
)
