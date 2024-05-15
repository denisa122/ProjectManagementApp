import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const ProjectDetails = ( {  userId  }) => {
    const navigate = useNavigate();

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

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`http://localhost:5000/api/teams/leader/${userId}`, {
                    headers: {
                        "auth-token": token
                    }
                });

                setTeams(response.data);
            } catch (error) {
                console.error("Error fetching teams: ", error);
            }
        };

        fetchTeams();
    }, [userId, navigate]);

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


            const response = await axios.post("http://localhost:5000/api/projects/", formData, {
                headers: {
                    "auth-token": token,
                    "Content-Type": "application/json"
                }
            });
            navigate('/dashboard');
        } catch (error) {
            console.error("Error creating project: ", error);
        }
        setLoading(false);
    };

    return (
        <div>
            <Navigation />
            <div style={{margin: "100px"}}>
            <h1>Enter Project Details</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Project Name" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Project Description" required />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                <select name="team" value={formData.team} onChange={handleChange}>
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                        <option key={team._id} value={team._id}>{team.name}</option>
                    ))}
                </select>
                <button type="submit" disabled={loading}>Save</button>
            </form>
            </div>
            <Footer />
        </div>
    )
}

export default ProjectDetails;