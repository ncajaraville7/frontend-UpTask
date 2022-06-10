import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

import clientAxios from '../config/clientAxios';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await clientAxios('/users/profile', config);
        setAuth(response.data);
        navigate('/projects');
      } catch (error) {
        setAuth({});
      }

      setLoading(false);
    };

    return () => {
      authenticateUser();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ setAuth, auth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
