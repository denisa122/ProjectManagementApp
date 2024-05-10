import React from 'react';

import "./Navigation.css";

import NotificationIcon from "../../assets/notification.svg";
import ProfileIcon from "../../assets/avatar.svg";

const Navigation = () => {
    return (
        <nav className='navbar'>
            <div className='leftSide'>
                <span>Projects</span>
            </div>
            <div className='rightSide'>
                <input type='text' placeholder='Search...' className='searchbar'></input>
                <img src={NotificationIcon} alt='notification icon' className='icon'></img>
                <img src={ProfileIcon} alt='profile icon' className='avatar'></img>
            </div>
        </nav>
    )
}

export default Navigation;