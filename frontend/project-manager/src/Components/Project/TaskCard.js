import React from "react";

import "./Task.css";

const TaskCard = ({ name, number, description, startDate, taskStatus, assignedTeamMember, attachments }) => {

    return (
        <div className="taskCard">
            <h3 className="taskTitle">{name}</h3>
            {console.log("name:", name)}
            <p className="taskNumber">Task Number: {number}</p>
            {console.log("number:", number)}
            <p className="taskDescription">{description}</p> 
            {console.log("description:", description)}
            <p className="taskStatus">Status: {taskStatus}</p>
            {console.log("task status :", taskStatus)}
            <div className="taskAssignedMember">
            {console.log("Assigned Team Member:", assignedTeamMember)}
                <p>Assigned Team Member: {assignedTeamMember && assignedTeamMember.map(member => `${member.firstName} ${member.lastName}`).join(', ')}</p>
            </div>
            <p className="taskAttachments">Attachments: {attachments}</p>
            {console.log("attachments:", attachments)}
            <p>Start date: {startDate}</p>
            {console.log("start date:", startDate)}
        </div>
    )
};

export default TaskCard;