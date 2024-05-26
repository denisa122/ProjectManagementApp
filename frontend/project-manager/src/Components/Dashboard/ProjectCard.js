import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Dashboard.css";

import Clock from "../../assets/clock.svg";
import Project from "../../assets/project.png";
import Delete from "../../assets/delete.png";

const ProjectCard = ({ project, isTeamLeader, onEdit, onDelete }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const start = new Date(project.startDate);
      const end = new Date(project.endDate);

      const difference = end - start;

      if (difference < 0) {
        setTimeLeft("Project has ended");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      setTimeLeft(`${days}d`);
    };

    calculateTimeLeft();
  }, [project.startDate, project.endDate]);

  return (
    <div className="mx-3 mt-6 flex flex-col self-start rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white sm:shrink-0 sm:grow sm:basis-0 projectCard">
      <a>
        <img className="rounded-t-lg" src={Project} alt="project"></img>
      </a>
      <div className="p-6 flex flex-row justify-between items-baseline">
        <div>
          <h5 className="mb-2 text-xl font-medium leading-tight">
            {project.name}
          </h5>
          <p className="mb-4 text-base">{project.projectStatus}</p>
        </div>
        <div className="timeLeft text-sm">
          <img src={Clock} alt="clock" className="clockImg"></img>
          <p>{timeLeft}</p>
        </div>
      </div>
      <div className="flex space-x-3 items-center justify-end mr-3.5 mb-8">
        <Link to={`/projects/${project._id}`} className="detailsButton">
          <button
            type="button"
            className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-danger-3 transition duration-150 ease-in-out hover:bg-danger-accent-300 hover:shadow-danger-2 focus:bg-danger-accent-300 focus:shadow-danger-2 focus:outline-none focus:ring-0 active:bg-danger-600 active:shadow-danger-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            style={{
              background: "#2a5298",
            }}
          >
            See details
          </button>
        </Link>
        {isTeamLeader && (
          <>
            <button
              type="button"
              className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-danger-3 transition duration-150 ease-in-out hover:bg-danger-accent-300 hover:shadow-danger-2 focus:bg-danger-accent-300 focus:shadow-danger-2 focus:outline-none focus:ring-0 active:bg-danger-600 active:shadow-danger-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              style={{
                background: "#2a5298",
              }}
              onClick={() => onEdit(project._id)}
            >
              Edit
            </button>
            <button
              className="deleteButton"
              onClick={() => onDelete(project._id)}
            >
              <img src={Delete} alt="" className="w-4"></img>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
