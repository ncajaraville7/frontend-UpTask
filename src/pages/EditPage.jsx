import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import useProjects from '../hooks/useProjects';

import FormProjects from '../components/FormProjects';

const EditPage = () => {
  const { id } = useParams();
  const { showProject, project, loading } = useProjects();

  useEffect(() => {
    showProject(id);
  }, []);

  if (loading) return 'Cargando...';
  return (
    <>
      <h1 className="font-black text-4xl">Editar Proyecto: {project.name}</h1>
      <div className="mt-10 flex justify-center">
        <FormProjects />
      </div>
    </>
  );
};

export default EditPage;
