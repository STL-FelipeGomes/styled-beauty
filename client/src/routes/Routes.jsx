import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import RegisterUser from '../pages/RegisterUser/RegisterUser';

const Routers = () => {
  return (
    <Routes>
      <Route element={<Login />} path="/" exact />
      <Route element={<RegisterUser />} path="/cadastror-se" />
    </Routes>
  );
};

export default Routers;
