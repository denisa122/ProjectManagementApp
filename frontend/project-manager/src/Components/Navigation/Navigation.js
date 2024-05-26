import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

import ProfileIcon from "../../assets/avatar.svg";
import menu from "../../assets/burgerNav.png";

import "./Nav.css";

const Navigation = () => {
  const navigate = useNavigate();

  const [isTeamLeader, setIsTeamLeader] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/login-status`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        setIsTeamLeader(response.data?.role === "team leader");
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/user/logout`);

      localStorage.removeItem("token");
      localStorage.removeItem("userRole");

      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <nav className="navbar py-2 px-12 xl:px-8 shadow-dark-mild">
      <div className="desktopMenu flex-grow basis-[100%] items-center lg:!flex lg:basis-auto justify-between">
        <div>
          <NavLink
            exact
            to="/dashboard"
            activeClass="active"
            className="desktopMenuListItem"
          >
            Dashboard
          </NavLink>
          {isTeamLeader && (
            <NavLink
              activeClass="active"
              className="desktopMenuListItem"
              to="/team-details"
            >
              Teams
            </NavLink>
          )}
        </div>

        <div className="relative flex items-center">
          <a className="me-4 text-neutral-600 dark:text-white" href="#">
            <span className="[&>svg]:w-5">
              <img
                src={ProfileIcon}
                style={{ height: "35px" }}
                alt="profile icon"
                loading="lazy"
              />
            </span>
          </a>

          <a
            className="me-4 flex items-center text-neutral-600 dark:text-white relative"
            href="#"
            id="dropdownMenuButton1"
            role="button"
            data-twe-dropdown-toggle-ref
            aria-expanded="false"
          >
            <span className="w-8 h-8">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span className="absolute -top-1 -right-1 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
              1
            </span>
          </a>

          <a className="me-4 flex items-center text-neutral-600 dark:text-white text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2">
            <button
              onClick={handleLogout}
              style={{ fontSize: "large", fontWeight: "400" }}
            >
              Log out
            </button>
          </a>
        </div>
      </div>

      <img
        src={menu}
        alt="burger navigation icon"
        className="mobileMenu"
        onClick={() => setShowMenu(!showMenu)}
      ></img>
      <div className="navMenu" style={{ display: showMenu ? "flex" : "none" }}>
        <NavLink
          exact
          activeClass="active"
          to="/dashboard"
          className="listItem"
          onClick={() => setShowMenu(false)}
        >
          Dashboard
        </NavLink>
        <NavLink
          activeClass="active"
          to="/team-details"
          className="listItem"
          onClick={() => setShowMenu(false)}
        >
          Teams
        </NavLink>
        <NavLink
          activeClass="active"
          to="/"
          className="listItem"
          onClick={() => setShowMenu(false)}
        >
          Profile
        </NavLink>
        <NavLink
          activeClass="active"
          to="/"
          className="listItem"
          onClick={() => setShowMenu(false)}
        >
          Notifications
        </NavLink>
        <a>
          <button
            onClick={handleLogout}
            className="listItem"
          >
            Log out
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
