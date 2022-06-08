import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import clientAxios from '../config/clientAxios';

import Alert from '../components/Alert';

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [accountConfirm, setAccountConfirm] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`;
        const { data } = await clientAxios(url);
        setAlert({ message: data.msg, error: false });
        setAccountConfirm(true);
      } catch (error) {
        setAlert({ message: error.response.data.msg, error: true });
      }
    };

    //Esto es para que no se renderice dos veces el componente
    return () => {
      confirmAccount();
    };
  }, []);

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y comienza a crear tus{' '}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {alert.message && <Alert alert={alert} />}
      {accountConfirm && (
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Inicia sesión
        </Link>
      )}
    </>
  );
};

export default ConfirmAccount;
