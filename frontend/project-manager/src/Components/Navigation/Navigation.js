import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import "./Navigation.css";

import NotificationIcon from "../../assets/notification.svg";
import ProfileIcon from "../../assets/avatar.svg";

const Navigation = () => {

    const navigate = useNavigate();

    const [isTeamLeader, setIsTeamLeader] = useState(false);

    useEffect(() => {
        const fetchUserRole = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) {
              return;
            }
    
            const response = await axios.get("http://localhost:5000/api/user/login-status", {
              headers: {
                'auth-token': token,
              },
            });
    
            setIsTeamLeader(response.data?.role === "team leader");
          } catch (error) {
            console.error("Error fetching user role:", error);
          }
        };
    
        fetchUserRole();
      }, []); 

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/user/logout');

            localStorage.removeItem('token');
            localStorage.removeItem('userRole');

            navigate('/');
        } catch (error) {
            console.error('Error logging out: ', error);
        }
    };

    return (
        <nav className='navbar'>
            <div className='leftSide'>
                <Link to='/dashboard'>
                Projects
                </Link>
                {isTeamLeader && <span style={{paddingLeft: "20px"}}>Team</span>}
            </div>
            <div className='rightSide'>
                <input type='text' placeholder='Search...' className='searchbar'></input>
                <img src={NotificationIcon} alt='notification icon' className='icon'></img>
                <img src={ProfileIcon} alt='profile icon' className='avatar'></img>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </nav>
    )
}

export default Navigation;