import { useEffect, useState } from "react";
import { _get } from "../../Service/ApiService";
import { GET_COUNTS, GET_OWN_BLOGS } from "../../Service/useApiService";
import { useAuth } from "../../ProtectedRoute/AuthProvider";
import bgadmin from "../../assets/bgadmin.jpeg";
import { FaUsers, FaComments, FaFileAlt, FaCheckCircle } from "react-icons/fa";

const StatCard = ({ icon: Icon, title, value, label }) => (
  <div className="relative flex items-center p-6 bg-white rounded-lg shadow-md h-50 w-full">
    <Icon className="absolute top-6 right-6 text-4xl text-blue-600   " />
    <div className="mt-6">
      <p className="text-m font-semibold text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  </div>
);

const AuthorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeBlogCount: 0,
    activeCommentCount: 0,
    publishedBlogCount: 0,
    draftBlog: 0,
  });

  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await _get(GET_COUNTS);
        setStats(data);

        const { data: blogs } = await _get(GET_OWN_BLOGS(user._id));
        console.log(blogs?.ownBlogs);

        setRecentBlogs(blogs?.ownBlogs);
      } catch (err) {
        console.error("Failed to load admin stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgadmin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-semibold text-white">
          Welcome back, {user?.firstName || "Kavi"}!
        </h1>

        {/* stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols- lg:grid-cols-4 gap-10">
          <StatCard
            icon={FaUsers}
            title="All Blogs"
            value={stats?.activeBlogCount || 0}
            label="Number of Blogs"
          />
          <StatCard
            icon={FaComments}
            title="Active Comment"
            value={stats?.activeCommentCount || 0}
            label="Number of Comments"
          />
          <StatCard
            icon={FaCheckCircle}
            title="Published Blogs"
            value={stats?.publishedBlogCount || 0}
            label="Number of PublishedBlogs"
          />
          <StatCard
            icon={FaFileAlt}
            title="Draft Blogs"
            value={stats?.draftBlog || 0}
            label=" Number of  DraftBlogs"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x mx-8">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left bg-blue-600">
              <th className="px-6 py-3 font-semibold">Title</th>
              <th className="px-6 py-3 font-semibold">Description</th>
              <th className="px-6 py-3 font-semibold">Created By</th>
              <th className="px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentBlogs.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No recent blogs found
                </td>
              </tr>
            ) : (
              recentBlogs.map((blog) => (
                <tr key={blog._id} className="border-t">
                  <td className="px-6 py-4 font-medium">{blog.title}</td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    {blog.description?.length > 40
                      ? `${blog.description.slice(0, 40)}...`
                      : blog.description}
                  </td>
                  <td className="px-6 py-4">{blog.author?.firstName || "-"}</td>
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthorDashboard;
