import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/styles/alerts.css";
import "./assets/styles/toggle.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./utils/UserContext";
import { DarkModeProvider } from "./utils/DarkModeContext";
import { ClinicProvider } from "./utils/GetClinicContext";

import { SelfEvaluation } from "./pages/SelfEvaluation";
import { Patients } from "./pages/Patients";
import { MedicalRecord } from "./pages/MedicalRecord";
import { Login } from "./pages/Login";
import { Page404 } from "./pages/Page404";
import { Calendar } from "./pages/Calendar";
import { ClinicRegistration } from "./pages/ClinicRegistration";
import { PanelConfig } from "./pages/PanelConfig";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { Page403 } from "./pages/Page403";
import { PreRegistration } from "./pages/PreRegistration";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <DarkModeProvider>
        <BrowserRouter>
          <Routes>
              <Route index path="/:slug" element={
                <ClinicProvider>
                  <SelfEvaluation />
                </ClinicProvider>
              }/>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<ClinicRegistration />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/home/pacientes" element={<Patients />} />
              <Route path="/home/prontuario" element={<MedicalRecord />} />
              <Route path="/home/agenda" element={<Calendar />} />
              <Route path="/home/ajustes" element={<PanelConfig />} />
              <Route path="/home/preregistro" element={<PreRegistration />} />
            </Route>

            <Route path="/page403" element={<Page403 />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </UserProvider>
  </React.StrictMode>
);
