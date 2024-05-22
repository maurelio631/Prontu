import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/styles/alerts.css";

import App from "./pages/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pacientes } from "./pages/Pacientes";
import { Prontuario } from "./pages/Prontuario";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route index path="/" element={<App />} />
          <Route  path="/Pacientes" element={<Pacientes/>} />
          <Route path="/Prontuario" element={<Prontuario />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
