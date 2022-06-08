import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
        {/* El outlet injecta los elementos hijos del route que contiene este
      componente */}
        <div className="md:w-2/3 lg:w-1/3">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
