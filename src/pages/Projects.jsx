import PreviewProjects from '../components/PreviewProjects';
import useProjects from '../hooks/useProjects';

const Projects = () => {
  const { projects } = useProjects();

  return (
    <>
      <h1 className="font-black text-4xl">Proyectos</h1>
      <div className="bg-white shadow mt-10 rounded-lg">
        {projects.length === 0 ? (
          <p className="text-center text-gray-600 uppercase">
            No hay proyectos aún
          </p>
        ) : (
          projects.map((project) => (
            <PreviewProjects {...project} key={project._id} />
          ))
        )}
      </div>
    </>
  );
};

export default Projects;
