import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { _get } from "../../Service/ApiService";
import { GET_BLOG_BYID } from "../../Service/useApiService";
import { FaUserEdit, FaCalendarAlt } from "react-icons/fa";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchBlog = async (id) => {
    try {
      const { data } = await _get(GET_BLOG_BYID(id));
      // console.log(data);

      setBlog(data);
    } catch (err) {
      console.log("Failed to fetch", err);
      toast.error("Failed to fetched");
    }
  };
  useEffect(() => {
    fetchBlog(id);
  }, [id]);

  return (
    <div className="w-full bg-white h-full overflow-auto">
      <div className="max-w-[1000px] mx-auto mt-5 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-center md:text-left">
          {blog?.title}
        </h1>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full md:w-[300px]"
          placeholder="Search blog by title..."
        />
      </div>

      <div className="max-w-[1000px] mx-auto mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-gray-600 text-sm md:text-base px-2 md:px-0">
        <p className="flex items-center gap-2 font-bold">
          <FaUserEdit className="text-blue-600" />
          Author: {blog?.author.firstName} {blog?.author.lastName}
        </p>
        <p className="flex items-center gap-2 italic font-bold">
          <FaCalendarAlt className="text-green-600" />
          Published on: {new Date(blog?.publishedAt).toLocaleDateString()};
        </p>
      </div>

      <img className="h-[550px] w-full mt-5" src={blog?.images} />
      <div
        className="max-w-[1000px] mx-auto mt-5"
        dangerouslySetInnerHTML={{ __html: blog?.content }}
      ></div>
    </div>
  );
};

export default BlogDetails;
