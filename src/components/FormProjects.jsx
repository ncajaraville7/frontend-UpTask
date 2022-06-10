import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Alert from '../components/Alert';

import useProjects from '../hooks/useProjects';

const FormProjects = () => {
  const [ids, setIds] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [client, setClient] = useState('');
  const [alert, setAlert] = useState({});

  const { submitProject, project } = useProjects();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIds(project._id);
      setName(project.name);
      setDescription(project.description);
      setDeliveryDate(project.deliveryDate.split('T')[0]);
      setClient(project.client);
      return;
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !deliveryDate || !client) {
      setAlert({ message: 'Debes completar todos los campos', error: true });
      return;
    }

    submitProject({ name, description, deliveryDate, client, alert, id });
  };

  return (
    <form
      className="bg-white py-10 px-5 md:w-1-2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {alert.message && <Alert alert={alert} />}
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="name"
        >
          Nombre del proyecto
        </label>
        <input
          type="text"
          id="name"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del proyecto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="description"
        >
          Descripción del proyecto
        </label>
        <input
          type="text"
          id="description"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del proyecto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="date"
        >
          Fecha de entrega del proyecto
        </label>
        <input
          type="date"
          id="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Fecha de entrega del proyecto"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="client"
        >
          Cliente
        </label>
        <input
          type="text"
          id="client"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Cliente"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={ids ? 'Actualizar proyecto' : 'Crear Proyecto'}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormProjects;
