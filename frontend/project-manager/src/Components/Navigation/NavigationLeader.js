import React from 'react';

import "./Navigation.css";

import NotificationIcon from "../../assets/notification.svg";
import ProfileIcon from "../../assets/avatar.svg";

const NavigationLeader = () => {
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
            </div>
        </nav>
    )
}

export default NavigationLeader;