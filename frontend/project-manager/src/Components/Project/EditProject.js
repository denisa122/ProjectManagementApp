import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    projectStatus: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/projects/${id}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        const formattedProject = {
            ...response.data,
            startDate: response.data.startDate.slice(0, 10),
            endDate: response.data.endDate.slice(0, 10), 
          };
          setProject(formattedProject);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Error fetching project data");
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/projects/${id}`,
        project,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      navigate(`/dashboard`);
    } catch (error) {
      console.error("Error updating project:", error);
      setError("Error updating project");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={project.startDate}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={project.endDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Project Status:
          <select
            name="projectStatus"
            value={project.projectStatus}
            onChange={handleChange}
          >
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Finished">Finished</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProject;
