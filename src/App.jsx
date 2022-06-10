import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './layouts/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccount from './pages/ConfirmAccount';
import Projects from './pages/Projects';
import NewProjects from './pages/NewProjects';

import AuthContextProvider from './context/AuthContext';
import ProjectContextProvider from './context/ProjectContext';
import Project from './pages/Project';
import EditPage from './pages/EditPage';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ProjectContextProvider>
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

            {/* AREA PRIVADA */}
            <Route path="/projects" element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<NewProjects />} />
              <Route path=":id" element={<Project />} />
              <Route path="edit/:id" element={<EditPage />} />
            </Route>
            {/* FIN AREA PRIVADA */}
          </Routes>
        </ProjectContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
