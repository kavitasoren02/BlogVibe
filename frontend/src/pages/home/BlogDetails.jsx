import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { _get, _post } from "../../Service/ApiService";
import {
  GET_BLOG_BYID,
  CREATE_COMMENTS,
  GET_BLOG_COMMENTS,
  CREATE_LIKES,
} from "../../Service/useApiService";
import { FaUserEdit, FaCalendarAlt, FaComment, FaHeart } from "react-icons/fa";
import { useAuth } from "../../ProtectedRoute/AuthProvider";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [updateBlog, setUpdateBlog] = useState(0);

  const commentRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchBlog = async (id) => {
    try {
      const { data } = await _get(GET_BLOG_BYID(id));
      setBlog(data);

      const { data: getComment } = await _get(GET_BLOG_COMMENTS(id));
      // console.log(getComment.getCommentById);
      setComments(getComment.getCommentById);
    } catch (err) {
      console.log("Failed to fetch", err);
      toast.error("Failed to fetched");
    }
  };
  useEffect(() => {
    fetchBlog(id);
  }, [id, updateBlog]);

  const handlePostComment = async () => {
    if (!commentText.trim()) {
      toast.warn("Please fill out all details");
      return;
    }
    try {
      await _post(CREATE_COMMENTS, {
        commentText,
        blogId: id,
      });
      toast.success("Comment posted!");
      setUpdateBlog((prev) => prev + 1);
      setCommentText("");
      fetchBlog(id);
    } catch (err) {
      console.error("Failed to post comment:", err);
      if (err.status === 401) {
        toast.error("Please login your account!");
        navigate("/auth/login");
        return;
      }
      const message = err.response.data.message;
      toast.warn(message || "Something went wrong");
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await _post(CREATE_LIKES, {
        blogId: id,
      });
      console.log(data.message);
      toast.success("Liked  successfully!");
      setUpdateBlog((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to post comment:", err);
      if (err.status === 401) {
        toast.error("Please login your account!");
        navigate("/auth/login");
        return;
      }
      const message = err.response.data.message;
      toast.warn(message || "Something went wrong");
    }
  };

  const isLiked = () => {
    return blog?.likes.some((like) => like.user === user?._id);
  };

  return (
    <>
      <div className="w-full bg-white pt-4 min-h-screen">
        <div className="max-w-[1000px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-4xl font-bold text-center md:text-left">
            {blog?.title}
          </h1>
        </div>

        <div className="max-w-[1000px] mx-auto mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-gray-600 text-sm md:text-base px-2 md:px-0">
          <p className="flex items-center gap-2 font-bold text-xl">
            <FaUserEdit className="text-blue-600" />
            Author: {blog?.author.firstName} {blog?.author.lastName}
          </p>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <p className="flex items-center gap-2 italic font-bold">
              <FaCalendarAlt className="text-green-600" />
              Published on: {new Date(blog?.publishedAt).toLocaleDateString()}
            </p>
            <button
              onClick={handleLike}
              className="flex items-center text-m cursor-pointer"
            >
              <FaHeart
                className={`${
                  isLiked() ? "text-red-600" : " text-blue-600"
                } hover:text-red-600 `}
              />
              {blog?.likes.length}
            </button>
            <button
              onClick={() =>
                commentRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center text-m cursor-pointer hover:border-2 p-3"
            >
              <FaComment className="mr-1 text-blue-600" />
              Comment
            </button>
          </div>
        </div>

        <img className="h-[550px] w-full mt-5" src={blog?.images} />
        <div
          className="max-w-[1000px] mx-auto mt-5"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        ></div>
      </div>

      <div ref={commentRef} className="h-[full] bg-white">
        <div className="max-w-[1000px] mx-auto">
          <h1 className="text-4xl text-blue-900 font-semibold pt-10 ">
            Leave Your Comment
          </h1>
          <div className="w-[650px] h-[220px] border border-gray-400 rounded-lg shadow-sm p-4 mt-6">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment here..."
              className="w-full h-full resize-none p-4 text-blue-900 outline-none rounded-lg"
            ></textarea>
          </div>
        </div>
        <div className="max-w-[1000px] mx-auto mt-5">
          <button
            onClick={handlePostComment}
            className="text-white text-lg p-5 bg-blue-400 hover:bg-blue-900 h-[65px] w-[175px] rounded-3xl cursor-pointer font-bold"
          >
            Post Comment
          </button>
        </div>

        <div className=" max-w-[1000px] mx-auto mt-8">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center">No comments yet.</p>
          ) : (
            comments.map((c, i) => (
              <div
                key={i}
                className="flex gap-4 items-start border-b border-gray-400 py-4"
              >
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 text-blue-700 font-bold flex items-center justify-center text-lg">
                  {c.user.firstName?.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {c.user?.firstName} {c.user?.lastName}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                  <p className="text-gray-900 text-base font-medium">
                    {c.comment}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
