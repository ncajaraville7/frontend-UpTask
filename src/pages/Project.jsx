import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useProjects from '../hooks/useProjects';

const Project = () => {
  const { id } = useParams();
  const { showProject, project, loading } = useProjects();

  useEffect(() => {
    showProject(id);
  }, []);

  return loading ? (
    'cargando...'
  ) : (
    <div className="flex justify-between">
      <h1 className="font-black text-4xl">{project.name}</h1>
      <div className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          />
        </svg>
        <Link to={`/projects/edit/${id}`} className="uppercase font-bold">
          Editar
        </Link>
      </div>
    </div>
  );
};

export default Project;
