import { createContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import clientAxios from '../config/clientAxios';

export const ProjectContext = createContext();

const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalFormTask, setModalFormTask] = useState(false);
  const [task, setTask] = useState({});

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

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await clientAxios.delete(`/projects/${id}`, config);
      const deleteProject = projects.filter((project) => project._id !== id);
      setProjects(deleteProject);
      navigate('/projects');
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setModalFormTask(!modalFormTask);
    setTask({});
  };

  const submitTask = async (task) => {
    if (task?.idTask) {
      await editTask(task);
    } else {
      await createTask(task);
    }
  };

  const createTask = async (task) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await clientAxios.post('/tasks', task, config);
      const projectUpdate = { ...project };
      projectUpdate.tasks = [...project.tasks, response.data];
      setProject(projectUpdate);

      setModalFormTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (task) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await clientAxios.put(`/tasks/${task.idTask}`, task, config);
      setModalFormTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditTask = (task) => {
    setTask(task);
    setModalFormTask(true);
  };

  useEffect(() => {
    getProjects();
  }, []);
  return (
    <ProjectContext.Provider
      value={{
        projects,
        submitProject,
        showProject,
        project,
        loading,
        deleteProject,
        modalFormTask,
        toggleModal,
        submitTask,
        handleModalEditTask,
        task,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
