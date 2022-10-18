import React from "react";
import ReactDOM from "react-dom/client";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from "./App";
import { LoginProvider } from "./context/loginProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <LoginProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </LoginProvider>
  </BrowserRouter>
  </React.StrictMode>
);
