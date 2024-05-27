import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Navigation from "../Navigation/Navigation";
import avatar from "../../assets/person.png";

const TeamDetailsPage = ({ userId }) => {

  console.log("userId in TeamDetailsPage:", userId);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found.");
        }

        if (!userId) {
          window.location.reload(); 
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

        // Fetch details for each team
        const teamsWithDetails = await Promise.all(
          response.data.map(async (team) => {
            const teamDetails = await axios.get(
              `${process.env.REACT_APP_API_URL}/api/teams/${team._id}`,
              {
                headers: {
                  "auth-token": token,
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
      <div style={{ margin: "40px" }}>
        <div className="text-3xl md:text-5xl font-semibold">
          <h2>Your Teams</h2>
        </div>

        {teams.map((team) => (
          <div key={team._id} className="mt-10">
            <h3 className="text-2xl mb-2 font-semibold">{team.name}</h3>
            <h4 className="text-xl mb-5 font-medium">Members:</h4>
            <ul className="flex flex-row">
              {team.members.map((member) => (
                <li key={member._id}>
                  <div className="block max-w-[18rem] bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                    <div className="relative overflow-hidden bg-cover bg-no-repeat">
                      <img
                        className="w-32 rounded-full object-cover h-36 w-36 mr-5"
                        src={avatar}
                        alt="profile picture avatar"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-base">
                        {member.firstName} {member.lastName}
                      </p>
                    </div>
                  </div>
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
