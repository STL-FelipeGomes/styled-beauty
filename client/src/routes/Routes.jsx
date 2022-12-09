import { React } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";

const Routers = () => {
  return (
    <Routes>
      <Route element={<Login />} path="/" exact />
    </Routes>
  );
};

export default Routers;
