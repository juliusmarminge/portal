import React from "react";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <div className="mx-9 mt-5 flex flex-row items-center justify-between dark:text-white md:mx-10 md:mt-8">
      <div className="flex flex-row items-center justify-between">
        <a className="mr-5" href="#">
          <img
            className="inline-block h-10 w-12 md:h-16 md:w-20"
            src="logo.svg"
          />
        </a>
        <div className="hidden font-montserrat md:inline-block">
          <h1 className="text-2xl">
            <strong>Delta</strong>Hacks <strong>IX</strong>
          </h1>
          <p className="text-xs">January 13-15 | McMaster University</p>
        </div>
        <div className="ml-24 ml-5 hidden font-inter md:flex">
          <a className="mx-2 text-base font-bold" href="#">
            Dashboard
          </a>
          <a className="mx-2 text-base font-bold" href="#">
            Calendar
          </a>
        </div>
      </div>
      <div className="hidden items-center md:flex">
        <ThemeToggle />
        <a className="mx-2 mr-8 font-inter text-sm md:hidden" href="#">
          <strong className="font-bold"> Home</strong>
        </a>
        <a className="mx-2 hidden font-inter text-sm lg:inline-block">
          Logged in as <strong className="font-bold"> Username</strong>
        </a>
        <button className="mx-2 rounded bg-primary py-2.5 px-5 font-inter text-sm font-bold text-white md:px-7">
          Sign out
        </button>
      </div>
      {/* Hamburger Button */}
      <div className="md:hidden">
        <label htmlFor="my-drawer-3" className="btn btn-ghost btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
    </div>
  );
};

export default NavBar;
