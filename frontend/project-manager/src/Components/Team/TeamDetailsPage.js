import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "./Team.css";

import Navigation from "../Navigation/Navigation";
import { useParams } from "react-router-dom";

const TeamDetailsPage = ({ userId }) => {
  const { teamId } = useParams();
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/teams/leader/${userId}`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        // Fetch details for each team
        const teamsWithDetails = await Promise.all(
          response.data.map(async (team) => {
            const teamDetails = await axios.get(
              `http://localhost:5000/api/teams/${team._id}`,
              {
                headers: {
                  "auth-token": localStorage.getItem("token"),
                },
              }
            );

            return teamDetails.data;
          })
        );

        setTeams(teamsWithDetails);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [userId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
        <Navigation />
        <div style={{ margin: "100px" }}>
            <h2>Your Teams</h2>
            {teams.map((team) => (
                <div key={team._id}>
                    <h3>{team.name}</h3>
                    <h4>Members:</h4>
                    <ul>
                        {team.members.map((member) => (
                            <li key={member._id}>
                                {member.firstName} {member.lastName}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
);
};

export default TeamDetailsPage;