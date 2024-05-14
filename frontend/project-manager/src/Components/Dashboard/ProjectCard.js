import React from "react";
import { useState, useEffect } from "react";

import "./Dashboard.css";

import Clock from "../../assets/clock.svg";
import Project from "../../assets/project.png";

const ProjectCard = ({  _id, name, projectStatus, startDate, endDate }) => {

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
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

            setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        };

        calculateTimeLeft();
    }, [startDate, endDate]);

    return (
        <div className="projectCard">
            <img src={Project} alt="project-thumbnail" className="projectImg"></img>
            <h3 className="projectTitle">{name}</h3>
            <div className="projectDetailsRow">
                <p className="projectStatus">{projectStatus}</p>
                <div className="timeLeft">
                    <img src={Clock} alt="clock" className="clockImg"></img>
                    <p>{timeLeft}</p>
                </div> 
            </div>
        </div>
    )
};

export default ProjectCard;