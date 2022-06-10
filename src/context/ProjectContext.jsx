import { createContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import clientAxios from '../config/clientAxios';

export const ProjectContext = createContext();

const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitProject = (project) => {
    if (project.id) {
      editProject(project);
    } else {
      newProject(project);
    }
    return;
  };

  const editProject = async (project) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await clientAxios.put(
        `/projects/${project.id}`,
        project,
        config
      );
      const projectUpdate = projects.map((project) =>
        project._id === response.data._id ? response.data : project
      );
      setProjects(projectUpdate);
      navigate('/projects');
    } catch (error) {
      console.log(error);
    }
  };

  const newProject = async (project) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await clientAxios.post('/projects', project, config);
      setProjects([...projects, response.data]);
      navigate('/projects');
    } catch (error) {
      console.log(error);
    }
  };

  const getProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await clientAxios('/projects', config);
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await clientAxios(`/projects/${id}`, config);
      setProject(response.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getProjects();
  }, []);
  return (
    <ProjectContext.Provider
      value={{ projects, submitProject, showProject, project, loading }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
