import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./authentication.css";

import Logo from "../../assets/logo.JPG";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        {
          email,
          password,
        }
      );

      const token = response.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        setError("Token not received from server");
      }
    } catch (error) {
      console.error("Error caught in handleSubmit:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div>
      <section
        className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        <div className="max-w-7xl h-full p-10" style={{ minWidth: "800px" }}>
          <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
            <div>
              <div className="md:mx-6 md:p-12">
                {/* <!--Logo--> */}
                <div className="text-center">
                  <img className="mx-auto w-32" src={Logo} alt="logo" />
                  <h4 className="mb-2 mt-8 pb-1 text-xl font-semibold">
                    Log in
                  </h4>
                  {error && <p>{error}</p>}
                </div>

                <form id="loginForm" onSubmit={handleSubmit}>
                  <h3 className="mb-10 text-lg">
                    Log in to your account to get started.
                  </h3>

                  <div className="relative mb-4" data-twe-input-wrapper-init>
                    <input
                      type="email"
                      placeholder="Work email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    />
                    <label
                      htmlFor="email"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >
                      Work email
                    </label>
                  </div>

                  <div className="relative mb-4" data-twe-input-wrapper-init>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    />
                    <label
                      htmlFor="password"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >
                      Password
                    </label>
                  </div>

                  {/* <!--Submit button--> */}
                  <div className="mb-12 pb-1 pt-1 text-center">
                    <button
                      className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                      type="submit"
                      data-twe-ripple-init
                      data-twe-ripple-color="light"
                      style={{
                        background:
                          "linear-gradient(to right, #1e3c72, #2a5298, #1abc9c)",
                      }}
                    >
                      Login
                    </button>

                    {/* Forgot password link */}
                    <a href="#!">Your team is waiting!</a>
                  </div>

                  {/* <!--Register button--> */}
                  <div className="flex items-center justify-between pb-6">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <Link to="/register">
                      <button
                        type="button"
                        className="inline-block rounded border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                        style={{borderColor: "#2a5298", color: "#2a5298"}}
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                      >
                        Register
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
