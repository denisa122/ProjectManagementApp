import React from "react";

import "./Dashboard.css";

import Clock from "../../assets/clock.svg";
import Project from "../../assets/project.png";

const ProjectCard = ({  title, status, timeLeft }) => {
    return (
        <div className="projectCard">
            <img src={Project} alt="project-thumbnail" className="projectImg"></img>
            <h3 className="projectTitle">{title}</h3>
            <div className="projectDetailsRow">
                <p className="projectStatus">{status}</p>
                <div className="timeLeft">
                    <img src={Clock} alt="clock" className="clockImg"></img>
                    <p>{timeLeft}</p>
                </div>
            </div>
        </div>
    )
};

export default ProjectCard;