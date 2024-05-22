import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/styles/alerts.css";

import App from "./pages/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pacientes } from "./pages/Pacientes";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route index path="/" element={<App />} />
          <Route  path="/Pacientes" element={<Pacientes/>} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
