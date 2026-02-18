import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./shared/contexts/GlobalContext.jsx";
import { DoctorContextProvider } from "./shared/contexts/DoctorContext.jsx";
import { UserContextProvider } from "./shared/contexts/UserContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <DoctorContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </DoctorContextProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
