import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import './Task.css';

const CreateTasks = () => {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [taskStatus, setTaskStatus] = useState("");
    const [assignedTeamMember, setAssignedTeamMember] = useState("");
    const [attachments, setAttachments] = useState([]);

    const handleAddTask = () => {
        const newTask = {
            name, 
            number,
            description,
            startDate,
            taskStatus,
            assignedTeamMember,
            attachments
        };

        setTasks([...tasks, newTask]);
        setName("");
        setNumber(0);
        setDescription("");
        setStartDate("");
        setTaskStatus("To do");
        setAssignedTeamMember("");
        setAttachments([]);
    };

    const handleDone = () => {
        // Implement logic to save tasks

        navigate('/dashboard/leader');
    };

    return (
        <div>
      <h1>Create tasks for the project</h1>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Number:</label>
        <input type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>Task Status:</label>
        <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div>
        <label>Assigned Team Member:</label>
        <input type="text" value={assignedTeamMember} onChange={(e) => setAssignedTeamMember(e.target.value)} />
      </div>
      <div>
        <label>Attachments:</label>
        <input type="text" value={attachments} onChange={(e) => setAttachments(e.target.value)} />
      </div>
      <button onClick={handleAddTask}>Add Task</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>Task Status</th>
            <th>Assigned Team Member</th>
            <th>Attachments</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.name}</td>
              <td>{task.number}</td>
              <td>{task.description}</td>
              <td>{task.startDate}</td>
              <td>{task.taskStatus}</td>
              <td>{task.assignedTeamMember}</td>
              <td>{task.attachments}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDone}>Done</button>
    </div>
    )
}

export default CreateTasks;