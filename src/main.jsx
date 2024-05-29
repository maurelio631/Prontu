import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/styles/alerts.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SelfEvaluation } from "./pages/SelfEvaluation";
import { Patients } from "./pages/Patients";
import { MedicalRecord } from "./pages/MedicalRecord";
import { Login } from "./pages/Login";
import { Page404 } from "./pages/Page404";
import { Calendar } from "./pages/Calendar";
import { ClinicRegistration } from "./pages/ClinicRegistration";
import { PanelConfig } from "./pages/PanelConfig";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route index path="/:nomeClinica" element={<SelfEvaluation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<ClinicRegistration />} />
          <Route path="/home/pacientes" element={<Patients />} />
          <Route path="/home/prontuario" element={<MedicalRecord />} />
          <Route path="/home/agenda" element={<Calendar />} />
          <Route path="/home/ajustes" element={<PanelConfig />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
