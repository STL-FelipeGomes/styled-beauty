import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import RegisterUser from '../pages/RegisterUser/RegisterUser';
import Home from '../pages/Home/Home';

const Routers = () => {
  return (
    <Routes>
      <Route element={<Login />} path="/" exact />
      <Route element={<RegisterUser />} path="/cadastrar-se" />
      <Route element={<Home />} path="/home" />
    </Routes>
  );
};

export default Routers;
