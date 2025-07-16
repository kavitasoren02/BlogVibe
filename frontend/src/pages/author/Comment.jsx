import { useEffect, useState } from "react";
import bgadmin from "../../assets/bgadmin.jpeg";
import { _get } from "../../Service/ApiService";
import { GET_OWN_BLOGS, GET_BLOG_COMMENTS } from "../../Service/useApiService";
import { useAuth } from "../../ProtectedRoute/AuthProvider";
import clsx from "clsx";

const Comment = () => {
  const { user } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [selectedBlogs, setSelectedBlogs] = useState(null);
  const [comments, setComments] = useState([]);

  /* ---------- fetch author’s blogs once ---------- */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await _get(GET_OWN_BLOGS(user._id));
        setBlogs(data?.ownBlogs || []);
      } catch (err) {
        console.error("Could not load blogs", err);
      }
    };
    fetchBlogs();
  }, [user._id]);

  /* ---------- fetch comments when a blog is selected ---------- */
  useEffect(() => {
    if (!selectedBlogs) return;
    const fetchComments = async () => {
      try {
        const { data } = await _get(GET_BLOG_COMMENTS(selectedBlogs._id)); // /comments/:blogId

        setComments(data?.getCommentById || []);
      } catch (error) {
        console.error("Could not load comments", error);
      }
    };
    fetchComments();
  }, [selectedBlogs]);

  return (
    <div
      className="w-full min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.8)), url(${bgadmin})`,
      }}
    >
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-semibold text-white">Comments Section</h1>
        <p className=" mt-0 text-xl font-light text-gray-50">
          Preview the comments!!!
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ---------- LEFT – blog cards ---------- */}
          <aside className="col-span-6 bg-white rounded-md p-6 ">
            <h2 className="text-xl font-semibold mb-4">Your Blogs</h2>

            <div className="grid grid-cols-1 gap-4">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  onClick={() => setSelectedBlogs(blog)} 
                  className={clsx(
                    "cursor-pointer bg-gray-100 shadow hover:shadow-lg overflow-hidden",
                    "border transition-colors",
                    selectedBlogs?._id === blog._id 
                      ? "border-blue-700 border-2 rounded-md" 
                      : "border-transparent hover:border-blue-700"
                  )}
                >
                  {/* cover image */}
                  <img
                    src={blog.images|| bgadmin}
                    alt={blog.title}
                    className="h-32 w-full object-cover"
                  />

                  {/* text body */}
                  <div className="p-3">
                    <h3 className="font-bold text-gray-800 line-clamp-1">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {blog.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </aside>

          {/* ---------- RIGHT ---------- */}
          <section className="col-span-6 space-y-6">
            {selectedBlogs ? (
              <>
                <h2 className="text-xl font-semibold text-white">
                  Comments on “{selectedBlogs.title}”
                </h2>

                {comments.length === 0 ? (
                  <p className="text-gray-200">No comments yet.</p>
                ) : (
                  comments.map((c) => (
                    <div
                      key={c._id}
                      className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow"
                    >
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-800">
                          {c.comment}
                        </span>
                        <span className="font-semibold text-gray-800">
                          {c.user.firstName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(c.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-700">{c.content}</p>
                    </div>
                  ))
                )}
              </>
            ) : (
              <p className="text-gray-200">
                ⬅ Select a blog on the left to view its comments
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Comment;
