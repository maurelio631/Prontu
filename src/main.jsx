import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/styles/alerts.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./pages/App";
import { Pacientes } from "./pages/Pacientes";
import { Prontuario } from "./pages/Prontuario";
import { Login } from "./pages/Login";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route index path="/:nomeClinica" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/pacientes" element={<Pacientes/>} />
          <Route path="/login/prontuario" element={<Prontuario />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
