import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSignOutAlt, 
  FaUserCircle,
  FaPlus, 
  FaHome, 
} from "react-icons/fa";

import { useAuth } from "../ProtectedRoute/AuthProvider";

const TopNav = () => {
  const { user, handleLogout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="bg-gray-900 text-white shadow-md">
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link className="text-2xl font-bold" to="/">
            MyBlog
          </Link>
        </div>

        {/* hamburger button — hidden on large screen*/} 
        <div className="md:hidden flex items-center">
          {/*  Toggles */}
          <button onClick={toggleMenu} className="text-white text-xl cursor-pointer ">
            ☰
          </button>
        </div>

        {/*  Desktop menu — hidden on small */}
        <div className="hidden md:flex space-x-6 items-center">
          
          {/* Home link */}
          <Link to="/" className="hover:text-gray-300 flex items-center">
            <FaHome className="mr-2" /> Home
          </Link>

          {user && (
            <>
              {/* “New Post” link */}
              <Link
                to="/create"
                className="hover:text-gray-300 flex items-center"
              >
                <FaPlus className="mr-2" /> New Post
              </Link>
              {/* “Profile” link */}
              <Link
                to="/profile"
                className="hover:text-gray-300 flex items-center"
              >
                <FaUserCircle className="mr-2" /> Profile
              </Link>
            </>
          )}

          {/* If logged in, show Logout button otherwise logout button*/}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700                    
                         text-white py-2 px-4 rounded-md              
                         flex items-center" 
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          ) : (
            <Link
              to="/auth/login"
              className="bg-blue-700 hover:bg-blue-800               
                         text-white py-2 px-4 rounded-md              
                         flex items-center" 
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu panel — only renders if isMenuOpen === true */}
      {isMenuOpen && (
        <div
          className="md:hidden                                    
                        flex flex-col                                 
                        bg-gray-800 text-white                        
                        py-4 px-6 space-y-4"
        >
          {/* Mobile “Home” link */}
          <Link to="/" className="hover:text-gray-300 flex items-center">
            <FaHome className="mr-2" /> Home
          </Link>

          {/* Mobile “New Post” & “Profile” */}
          {user && (
            <>
              <Link
                to="/create"
                className="hover:text-gray-300 flex items-center"
              >
                <FaPlus className="mr-2" /> New Post
              </Link>
              <Link
                to="/profile"
                className="hover:text-gray-300 flex items-center"
              >
                <FaUserCircle className="mr-2" /> Profile
              </Link>
            </>
          )}
          {/* Mobile Login/Logout button*/}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          ) : (
            <Link
              to="/auth/login"
              className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md flex items-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default TopNav;
