import React from "react";
import { useState, useEffect } from "react";

import "./Dashboard.css";

import Clock from "../../assets/clock.svg";
import Project from "../../assets/project.png";

const ProjectCard = ({ _id, name, projectStatus, startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const difference = end - start;

      if (difference < 0) {
        setTimeLeft("Project has ended");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setTimeLeft(`${days}d ${hours}h`);
    };

    calculateTimeLeft();
  }, [startDate, endDate]);

  return (
    <div className="mx-3 mt-6 flex flex-col self-start rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white sm:shrink-0 sm:grow sm:basis-0">
      <a>
        <img className="rounded-t-lg" src={Project} alt="project"></img>
      </a>
      <div className="p-6 flex flex-row justify-between items-baseline">
        <div>
          <h5 className="mb-2 text-xl font-medium leading-tight">{name}</h5>
          <p className="mb-4 text-base">{projectStatus}</p>
        </div>
        <div className="timeLeft text-sm">
          <img src={Clock} alt="clock" className="clockImg"></img>
          <p>{timeLeft}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
