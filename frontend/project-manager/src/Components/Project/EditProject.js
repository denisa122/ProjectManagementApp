import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const EditProject = ( {userId} ) => {
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
  const [teams, setTeams] = useState([]);


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
    fetchTeams();
  }, [id]);

  const fetchTeams = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/teams/leader/${userId}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams: ", error);
    }
  };

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
      <Navigation />
      <section
        className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700 editProject"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        <div className="max-w-7xl h-full p-10" style={{ minWidth: "800px" }}>
          <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
            <div>
              <div className="md:mx-6 md:p-12">
                {/* <!--Logo--> */}
                <div className="text-center">
                  <h4 className="mb-2 mt-8 pb-1 text-xl font-semibold">
                    Edit project details
                  </h4>
                </div>

                <form onSubmit={handleSubmit}>
                  <div
                    className="relative mb-4 text-left"
                    data-twe-input-wrapper-init
                  >
                    <label htmlFor="name" className="ml-3">
                      Project Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={project.name}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    />
                  </div>

                  <div
                    className="relative mb-4 text-left"
                    data-twe-input-wrapper-init
                  >
                    <label htmlFor="description" className="ml-3">
                      Project Description
                    </label>
                    <textarea
                      name="description"
                      value={project.description}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    />
                  </div>

                  <div
                    className="relative mb-4 text-left"
                    data-twe-input-wrapper-init
                  >
                    <label htmlFor="startDate" className="ml-3">
                      Start date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={project.startDate}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    />
                  </div>

                  <div
                    className="relative mb-4 text-left"
                    data-twe-input-wrapper-init
                  >
                    <label htmlFor="endDate" className="ml-3">
                      End date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={project.endDate}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    />
                  </div>

                  <div className="relative mb-4" data-twe-input-wrapper-init>
                    <select
                      name="team"
                      value={project.team}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    >
                      <option value="">Select Team</option>
                      {teams.map((team) => (
                        <option key={team._id} value={team._id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative mb-4" data-twe-input-wrapper-init>
                    <select
                      name="projectStatus"
                      value={project.projectStatus}
                      onChange={handleChange}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    >
                      <option value="">Select Project Status</option>
                      <option value="Not started">Not started</option>
                      <option value="In progress">In progress</option>
                      <option value="Finished">Finished</option>
                    </select>
                  </div>

                  {/* <!--Submit button--> */}
                  <div className="mb-12 pb-1 pt-1 text-center">
                    <button
                      className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                      type="submit"
                      data-twe-ripple-init
                      data-twe-ripple-color="light"
                      style={{
                        background:
                          "linear-gradient(to right, #1e3c72, #2a5298, #1abc9c)",
                      }}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="pt-12">
        <Footer />
      </div>
    </div>
  );
};

export default EditProject;
