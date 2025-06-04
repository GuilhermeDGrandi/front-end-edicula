import React from "react";
import { Routes, Route } from "react-router-dom";

import MyRoute from "./MyRoute";

import Home from "../pages/Home";
import Reserva from "../pages/Reserva";
import Login from "../pages/Login"

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<MyRoute element={<Home />} isClosed={false} />} />
      <Route path="/reserva" element={<MyRoute element={<Reserva />} isClosed={false} />} />
      <Route path="/login" element={<MyRoute element={<Login />} isClosed={false} />} />
    </Routes>
  );
}
