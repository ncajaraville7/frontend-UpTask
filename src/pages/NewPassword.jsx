import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import clientAxios from '../config/clientAxios';

import Alert from '../components/Alert';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const { token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('validando');
    if (password.length < 6) {
      setAlert({
        message: 'La contraseña debe tener al menos 6 digitos',
        error: true,
      });
      return;
    }

    clientAxios
      .post(`/users/new-password/${token}`, {
        password,
      })
      .then((response) => {
        setAlert({ message: response.data.msg, error: false });
        setPassword('');
        setTimeout(() => {
          navigate('../', { replace: true });
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        const { data } = await clientAxios(`/users/recover-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({ message: error.response.data.msg, error: true });
      }
    };
    return () => {
      validateToken();
    };
  }, []);

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablece tu password y no pierdas acceso a tus{' '}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {alert.message && <Alert alert={alert} />}
      {validToken && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5 ">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nuevo Password
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
            value="Recuperar password"
            className="w-full mb-5 bg-sky-700 py-3 text-white uppercase font-bold rounded-xl cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
    </>
  );
};

export default NewPassword;
