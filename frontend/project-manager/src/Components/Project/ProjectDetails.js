import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectDetails = ( {  userId  }) => {
    const navigate = useNavigate();
    console.log(userId);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        projectStatus: "",
        team: [],
        teamLeader: userId,
        tasks: []
    });

    console.log("Form data: ", formData.teamLeader);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }


            await axios.post("http://localhost:5000/api/projects/", formData, {
                headers: {
                    "auth-token": token,
                    "Content-Type": "application/json"
                }
            });
            navigate("/dashboard");
        } catch (error) {
            console.error("Error creating project: ", error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Enter Project Details</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Project Name" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Project Description" required />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                {/* Add team selection dropdown */}
                <button type="submit" disabled={loading}>Save Project</button>
            </form>
        </div>
    )
}

export default ProjectDetails;