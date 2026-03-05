import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css"
import App from "./App.tsx"
import Home from "@/pages/index.tsx"
import NewCharacter from "@/pages/new-character.tsx"

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="new-character" element={<NewCharacter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
