import { useEffect, useState } from "react";
import { _get } from "../../Service/ApiService";
import { GET_ALL_BLOGS } from "../../Service/useApiService";
import bgadmin from "../../assets/bgadmin.jpeg";
import Loader from "../../components/ui/Loader";
import { Link } from "react-router-dom";

const Home = () => {
  const [showBlogs, setShowBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _get(GET_ALL_BLOGS)
      .then(({ data }) => setShowBlogs(data.allBlogs.slice(0, 3)))
      .catch((err) => console.error("Failed to load blogs ", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className=" mt-20 max-w-4xl mx-auto px- py-4">
      {/* <h1 className="text-2xl font-bold mb-4">All Blogs</h1> */}
      {showBlogs.length == 0 ? (
        <p className="text-gray-600">No blogs found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showBlogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <img
                src={blog.images || bgadmin}
                alt={blog.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1 line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {blog.description?.replace(/<[^>]+>/g, "").slice(0, 50) +
                    "…"}
                  <Link
                    to={`/blog/${blog._id}`}
                    className="ml-1 text-blue-600 hover:underline font-medium"
                  >
                    Read more...
                  </Link>
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
