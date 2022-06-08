import { useState } from 'react';
import { Link } from 'react-router-dom';

import clientAxios from '../config/clientAxios';

import Alert from '../components/Alert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setAlert({ message: 'El email ingresado no es valido', error: true });
      return;
    }

    clientAxios
      .post(`/users/recover-password`, {
        email,
      })
      .then((response) => {
        setAlert({ message: response.data.msg, error: false });
        setEmail('');
      })
      .catch((error) =>
        setAlert({ message: error.response.data.msg, error: true })
      );
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recuperá acceso y no pierdas tus{' '}
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
            className="w-full mt-3 p-3 border rouded-xl bg-gray-50"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Recuperar password"
          className="w-full mb-5 bg-sky-700 py-3 text-white uppercase font-bold rounded-xl cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <Link
          to="/register"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿No tienes una cuenta? Registrate
        </Link>
      </nav>
    </>
  );
};

export default ForgotPassword;
