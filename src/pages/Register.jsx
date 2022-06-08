import { useState } from 'react';
import { Link } from 'react-router-dom';

import clientAxios from '../config/clientAxios';

import Alert from '../components/Alert';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !repeatPassword) {
      setAlert({ message: 'Todos los campos son obligatorios', error: true });
      return;
    }

    if (password !== repeatPassword) {
      setAlert({ message: 'Los password no son iguales', error: true });
      return;
    }

    if (password.length < 6) {
      setAlert({
        message: 'El password es muy corto, agrega minimo 6 caracteres',
        error: true,
      });
      return;
    }

    setAlert({});

    clientAxios
      .post(`/users`, {
        name,
        email,
        password,
      })
      .then((response) => {
        setAlert({ message: response.data.msg, error: false });
        setName('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');
      })
      .catch((error) =>
        setAlert({ message: error.response.data.msg, error: true })
      );
  };
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus{' '}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {alert.message && <Alert alert={alert} />}
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10"
      >
        <div className="my-5 ">
          <label
            htmlFor="name"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            placeholder="Nombre de registro"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-3 p-3 border rouded-xl bg-gray-50"
          />
        </div>

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

        <div className="my-5 ">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repetir Password
          </label>
          <input
            type="password"
            id="password2"
            placeholder="Repetir password de registro"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="w-full mt-3 p-3 border rouded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Registrarse"
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
      </nav>
    </>
  );
};

export default Register;
