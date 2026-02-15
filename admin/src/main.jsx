import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DoctorContextProvider } from "./contexts/DoctorContext.jsx";
import { GlobalContextProvider } from "./contexts/GlobalContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <DoctorContextProvider>
          <App />
        </DoctorContextProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
