import { useState } from 'react';
import { Link } from 'react-router-dom';

import clientAxios from '../config/clientAxios';

import Alert from '../components/Alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !email) {
      setAlert({ message: 'Debes completar todos los campos', error: true });
      return;
    }

    if (password.length < 6) {
      setAlert({
        message: 'Contraseña invalida, debe tener minimo 6 digitos',
        error: true,
      });
      return;
    }

    clientAxios
      .post('/users/login', { email, password })
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
      })
      .catch((error) =>
        setAlert({ message: error.response.data.msg, error: true })
      );
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia sesión y administra tus{' '}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {alert.message && <Alert alert={alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5 ">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email de registro"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-3 p-3 border rouded-xl bg-gray-50"
          />
        </div>

        <div className="my-5 ">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password de registro"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-3 p-3 border rouded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="w-full mb-5 bg-sky-700 py-3 text-white uppercase font-bold rounded-xl cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/register"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>

        <Link
          to="/forgotPassword"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿Olvidaste tu contraseña? Recuperala
        </Link>
      </nav>
    </>
  );
};

export default Login;
