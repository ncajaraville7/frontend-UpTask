import FormProjects from '../components/FormProjects';

const NewProjects = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear Proyecto</h1>
      <div className="mt-10 flex justify-center">
        <FormProjects />
      </div>
    </>
  );
};

export default NewProjects;
