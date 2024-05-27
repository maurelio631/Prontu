import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/styles/alerts.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Ficha } from "./pages/Ficha";
import { Pacientes } from "./pages/Pacientes";
import { Prontuario } from "./pages/Prontuario";
import { Login } from "./pages/Login";
import { Page404 } from "./pages/Page404";
import { Agenda } from "./pages/Agenda";
import { CadastroClinica } from "./pages/CadastroClinica";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route index path="/:nomeClinica" element={<Ficha />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroClinica />} />
          <Route path="/home/pacientes" element={<Pacientes/>} />
          <Route path="/home/prontuario" element={<Prontuario />} />
          <Route path="/home/agenda" element={<Agenda />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
