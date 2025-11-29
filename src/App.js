import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ListPage from "./components/Pages/ListPage";
import DetailPage from "./components/Pages/DetailPage";
import UpdatePage from "./components/Pages/UpdatePage";

export default function App() {
  return (
    <Routes>
      {/* / 로 들어오면 /list 로 이동 */}
      <Route path="/" element={<Navigate to="/list" replace />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/update" element={<UpdatePage />} />
    </Routes>
  );
}
