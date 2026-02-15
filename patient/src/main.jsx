import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import { DoctorContextProvider } from './contexts/DoctorContext.jsx';
import { GlobalContextProvider } from './contexts/GlobalContext.jsx';
import { UserContextProvider } from './contexts/UserContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <UserContextProvider>
          <DoctorContextProvider>
          <App />
        </DoctorContextProvider>
        </UserContextProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  </StrictMode>
)
