import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./Navigation.css";

import NotificationIcon from "../../assets/notification.svg";
import ProfileIcon from "../../assets/avatar.svg";

const NavigationLeader = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        navigate('/');
    };

    return (
        <nav className='navbar'>
            <div className='leftSide'>
                <span style={{paddingRight: "20px"}}>Projects</span>
                <span>Team</span>
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

export default NavigationLeader;