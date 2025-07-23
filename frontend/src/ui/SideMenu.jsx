import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaSignOutAlt,
  FaPenNib,
  FaCommentDots,
  FaUsers,
  FaFileImage,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../ProtectedRoute/AuthProvider";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { handleLogout, user } = useAuth();
  const { pathname } = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const isAdmin = user?.role === "admin";

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out`}
    >
      {/* Header */}
      <div
        className={`flex items-center ${
          !isSidebarOpen ? "justify-center" : "justify-between"
        } p-4 border-b border-gray-700`}
      >
        <h1
          className={`text-xl font-bold transition-all duration-300 ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          {isAdmin ? "Admin" : "Blogger"} Panel
        </h1>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <span className="text-2xl">&#9776;</span>
        </button>
      </div>

      {/* Sidebar menu */}
      <div className="mt-6">
        <ul className="list-none">
          {isAdmin ? (
            <>
              <li>
                <Link
                  to="/admin"
                  className={`flex items-center ${
                    !isSidebarOpen && "justify-center"
                  } px-4 py-2 hover:bg-gray-700 transition-colors ${
                    pathname === "/admin" && "bg-gray-600"
                  }`}
                >
                  <FaTachometerAlt className="mr-4 text-xl" />
                  <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Dashboard
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/user"
                  className={`flex items-center ${
                    !isSidebarOpen && "justify-center"
                  } px-4 py-2 hover:bg-gray-700 transition-colors ${
                    pathname === "/admin/user" && "bg-gray-600"
                  }`}
                >
                  <FaUsers className="mr-4 text-xl" />
                  <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Users
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/bloggers"
                  className={`flex items-center ${
                    !isSidebarOpen && "justify-center"
                  } px-4 py-2 hover:bg-gray-700 transition-colors ${
                    pathname === "/bloggers" && "bg-gray-600"
                  }`}
                >
                  <FaUsers className="mr-4 text-xl" />
                  <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Bloggers
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/my-profile"
                  className={`flex items-center ${
                    !isSidebarOpen && "justify-center"
                  } px-4 py-2 hover:bg-gray-700 transition-colors ${
                    pathname === "/my-profile" && "bg-gray-600"
                  }`}
                >
                  <CgProfile className="mr-4 text-xl" />
                  <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Profile
                  </span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/blogger"
                  className={`flex items-center ${
                    !isSidebarOpen && "justify-center"
                  } px-4 py-2 hover:bg-gray-700 transition-colors ${
                    pathname === "/dashboard" && "bg-gray-600"
                  }`}
                >
                  <FaTachometerAlt className="mr-4 text-xl" />
                  <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Dashboard
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/posts"
                  className={`flex items-center ${
                    !isSidebarOpen && "justify-center"
                  } px-4 py-2 hover:bg-gray-700 transition-colors ${
                    pathname === "/posts" && "bg-gray-600"
                  }`}
                >
                  <FaPenNib className="mr-4 text-xl" />
                  <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    My Posts
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/comments"
                  className={`flex items-center ${
                    !isSidebarOpen && "justify-center"
                  } px-4 py-2 hover:bg-gray-700 transition-colors ${
                    pathname === "/comments" && "bg-gray-600"
                  }`}
                >
                  <FaCommentDots className="mr-4 text-xl" />
                  <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Comments
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/my-files"
                  className={`flex items-center ${
                    !isSidebarOpen && "justify-center"
                  } px-4 py-2 hover:bg-gray-700 transition-colors ${
                    pathname === "/files" && "bg-gray-600"
                  }`}
                >
                  <FaFileImage className="mr-4 text-xl" />
                  <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Media
                  </span>
                </Link>
                <Link
                  to="/my-profile"
                  className={`flex items-center ${
                    !isSidebarOpen && "justify-center"
                  } px-4 py-2 hover:bg-gray-700 transition-colors ${
                    pathname === "/profile" && "bg-gray-600"
                  }`}
                >
                  <CgProfile className="mr-4 text-xl" />
                  <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Profile
                  </span>
                </Link>
              </li>
            </>
          )}

          {/* Common Logout */}
          <li>
            <p
              onClick={handleLogout}
              className={`flex items-center ${
                !isSidebarOpen && "justify-center"
              } px-4 py-2 hover:bg-gray-700 transition-colors cursor-pointer`}
            >
              <FaSignOutAlt className="mr-4 text-xl" />
              <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                Logout
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
