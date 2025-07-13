import { useEffect, useState } from "react";
import { _get, _put } from "../../Service/ApiService";
import {
  GET_OWN_BLOGS,
  DELETE_BLOGS,
} from "../../Service/useApiService";

import { useAuth } from "../../ProtectedRoute/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import bgadmin from "../../assets/bgadmin.jpeg";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyBlogs = () => {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await _get(GET_OWN_BLOGS(user._id));
        setRecentBlogs(data?.ownBlogs || []);
      } catch (err) {
        console.error("Failed to load blogs", err);
        toast.error("Could not load your blogs");
      }
    };
    if (user?._id) fetchBlogs();
  }, [user?._id]);

  const handleEdit = (blog) => {
    navigate("/create-blog", { state: { blog } });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this blog?");
    if (!ok) return;

    try {
      const {data}=await _put(DELETE_BLOGS(id));
      console.log(data.blog);
      setRecentBlogs((prev) => prev.filter((b) => b._id !== id));
      toast.success("Blog deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  /* ─────────────────────────── UI ─────────────────────────────── */
  return (
    <div
      className="w-full min-h-screen bg-cover"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,.8)), url(${bgadmin})`,
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-10 pt-10">
        <h1 className="text-3xl font-bold text-white">Latest Articles</h1>
        <button
          onClick={() => navigate("/create-blog")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
        >
          Create Blog
        </button>
      </div>

      <div className="flex items-center p-10">
        <div className="bg-white rounded-lg shadow-md overflow-x-auto w-full max-w-6xl mx-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="px-6 py-3 font-semibold">Title</th>
                <th className="px-6 py-3 font-semibold">Description</th>
                <th className="px-6 py-3 font-semibold">Created By</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {recentBlogs.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No blogs found
                  </td>
                </tr>
              ) : (
                recentBlogs.map((blog) => (
                  <tr key={blog._id} className="border-t">
                    {/* Title */}
                    <td className="px-6 py-4 font-medium">{blog.title}</td>

                    <td className="px-6 py-4 max-w-xs truncate">
                      {blog.description?.length > 40
                        ? `${blog.description.slice(0, 40)}…`
                        : blog.description}
                    </td>

                    {/* Author */}
                    <td className="px-6 py-4">
                      {blog.author?.firstName || "-"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {blog.isPublished === "published" ? (
                        <span className="px-2 py-1 text-green-700 bg-green-100 rounded-full">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-yellow-700 bg-yellow-100 rounded-full">
                          Draft
                        </span>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="px-6 py-4 space-x-2">
                      <button
                        className="p-2 text-blue-600 hover:text-blue-800"
                        aria-label="Edit"
                        onClick={() => handleEdit(blog)}
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:text-red-800"
                        aria-label="Delete"
                        onClick={() => handleDelete(blog._id)}
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
