import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const NavBar = () => {
  const { user } = useUser();
  return (
    <nav className="py-10 px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="menu-left">
            <a href="#" className="text-xl">
              SocialVibe
            </a>
          </div>
          {user.isAuthenticated && (
            <div className="menu-center flex space-x-12">
              <Link to="/feed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </Link>

              <Link to="/search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  ></path>
                </svg>
              </Link>
            </div>
          )}

          <div className="menu-right">
            {user.isAuthenticated && user.id ? (
              <Link to={`/profile/${user.id}`}>
                <img
                  src={user.avatar}
                  className="w-12 h-12 rounded-full"
                  alt="User Avatar"
                />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mr-4 py-4 px-6 bg-gray-600 text-white rounded-lg"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="py-4 px-6 bg-purple-600 text-white rounded-lg"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
