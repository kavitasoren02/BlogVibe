import { useState, useEffect, useCallback } from "react";
import { GET_BLOGGERS, UPDATE_BLOGGERS } from "../../Service/useApiService";
import { _get, _put } from "../../Service/ApiService";
import bgblogadmin from "../../assets/bgblogadmin.jpeg";

const ManageBloggers = () => {
  const [bloggers, setBloggers] = useState([]);
  const [toggle, setToggle] = useState(null);

  useEffect(() => {
    const fetchBloggers = async () => {
      try {
        const { data } = await _get(GET_BLOGGERS);
        setBloggers(data?.users);
        // console.log(data.users);

      } catch (error) {
        console.error("Failed to load bloggers", error);
      }
    };
    fetchBloggers();
  }, []);

  const handleApproval = useCallback(async (id, currentStatus) => {
    // update state locally
    setBloggers((prev) =>
      prev.map((b) => (b._id === id ? { ...b, approval: !currentStatus} : b))
    );
     setToggle(null);

    try {
        await _put(UPDATE_BLOGGERS(id), {
        approval: !currentStatus,
        isActive: !currentStatus,
      });
    } catch (err) {
      console.error("Could not update approval", err);
    }
  }, []);

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgblogadmin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-white mb-6">
          Bloggers List
        </h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-600 text-black">
              <tr>
                <th className="px-4 py-2 text-left">First Name</th>
                <th className="px-4 py-2 text-left">Last Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Mobile Number</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {bloggers.length ? (
                bloggers.map((blogger) => (
                  <tr
                    key={blogger._id}
                    className="not-last:border-b border-gray-300"
                  >
                    <td className="px-4 py-2">{blogger.firstName}</td>
                    <td className="px-4 py-2">{blogger.lastName}</td>
                    <td className="px-4 py-2">{blogger.email}</td>
                    <td className="px-4 py-2">{blogger.mobileNumber}</td>
                    <td className="px-4 py-2">
                      {blogger.approval === true ? (
                        <span className="px-2 py-1 text-green-700 bg-green-100 rounded-full">
                          Approved
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-yellow-700 bg-yellow-100 rounded-full">
                          Not Approved
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {toggle === blogger._id ? (
                        <button
                          onClick={() =>
                            handleApproval(blogger._id, blogger.approval)
                          }
                          className={`py-1 px-3 rounded-md font-medium text-sm
                            ${
                              blogger.approval
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-green-500 text-white hover:bg-green-600"
                            } transition-colors`}
                        >
                          {blogger.approval ? "Un‑approve" : "Approve"}
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            setToggle((prev) =>
                              prev === blogger._id ? null : blogger._id
                            )
                          } 
                          className="text-2xl px-3 cursor-pointer select-none"
                        >
                          …
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center">
                    No bloggers available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBloggers;
