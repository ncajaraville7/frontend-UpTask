import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccount from './pages/ConfirmAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AREA PUBLICA */}
        <Route path="/" element={<AuthLayout />}>
          {/* EL INDEX ES EL QUE SE VA A EJECUTAR CUANDO CARGUE LA PAGINA CON EL
          PATH='/' */}
          {/* PARA QUE LOS ELEMENTOS HIJOS DEL ROUTE FUNCIONEN HAY QUE
          DEFINIR EL OUTLET */}
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/forgotPassword/:token" element={<NewPassword />} />
          <Route path="/confirm/:id" element={<ConfirmAccount />} />
        </Route>
        {/* FIN AREA PUBLICA */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
