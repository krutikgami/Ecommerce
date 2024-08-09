import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { store, persistor } from './Redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SearchProvider } from './Redux/ContextApi/Cartcontext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(

  
  <PersistGate loading={null} persistor={persistor}>
  <Provider store={store}>
    <ThemeProvider>
 <SearchProvider>
      <App />
      </SearchProvider>
    </ThemeProvider>
    </Provider>
</PersistGate>

  
)
