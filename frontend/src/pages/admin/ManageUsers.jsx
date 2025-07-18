import  { useEffect, useState, useCallback } from "react";
import { GET_USER, UPDATE_USERS } from "../../Service/useApiService";
import { _get, _put } from "../../Service/ApiService";
import bguseradmin from "../../assets/bguseradmin.jpg";

const ManageUsers = () => {
  const [users, setUsers]   = useState([]);
  const [openRowId, setOpenRowId] = useState(null);   

  /* ───  fetch list once ─── */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await _get(GET_USER);
        setUsers(data?.users ?? []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    })();
  }, []);

  /* ───  approve / un‑approve ─── */
  const handleApproval = useCallback(async (id, currentStatus) => {

    setUsers(prev =>
      prev.map(u => (u._id === id ? { ...u, approval: !currentStatus } : u))
    );
    setOpenRowId(null);           

    try {
      await _put(UPDATE_USERS(id), {
        approval: !currentStatus,
        isActive: !currentStatus,
      });
    } catch (err) {
      setUsers(prev =>
        prev.map(u => (u._id === id ? { ...u, approval: currentStatus } : u))
      );
      console.error("Could not update approval", err);
    }
  }, []);

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,.8)),url(${bguseradmin})`,
      }}
    >
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-white mb-6">Users List</h1>

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
              {users.length ? (
                users.map(u => (
                  <tr key={u._id} className="border-b last:border-0">
                    <td className="px-4 py-2">{u.firstName}</td>
                    <td className="px-4 py-2">{u.lastName}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{u.mobileNumber}</td>
                    <td className="px-4 py-2">
                      {u.approval ? (
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
                      {openRowId === u._id ? (
                        <button
                          onClick={() => handleApproval(u._id, u.approval)}
                          className={`py-1 px-3 rounded-md font-medium text-sm
                            ${
                              u.approval
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-green-500 text-white hover:bg-green-600"
                            } transition-colors`}
                        >
                          {u.approval ? "Un‑approve" : "Approve"}
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            setOpenRowId(prev => (prev === u._id ? null : u._id))
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
                  <td colSpan="6" className="px-4 py-6 text-center">
                    No users available.
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

export default ManageUsers;
