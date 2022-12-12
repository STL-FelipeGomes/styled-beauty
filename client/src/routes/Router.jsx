import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Store from '../pages/StoreInfo';
import RegisterStore from '../pages/StoreRegisterForm';

const Router = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="entrar" element={<SignIn />} />
        <Route path="cadastrar" element={<SignUp />} />
        <Route path="lojas">
          <Route path="cadastrar" element={<RegisterStore />} />
          <Route path=":id" element={<Store />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
