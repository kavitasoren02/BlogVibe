import { useState, useEffect } from "react";
import { useAuth } from "../../ProtectedRoute/AuthProvider";
import { _put, _post } from "../../Service/ApiService";
import { toast } from "react-toastify";
import { IMAGE_UPLOAD } from "../../Service/useApiService";
import adminprofile from "../../assets/adminprofile.jpg";

const AdminProfileForm = () => {
  const [userData, setUserData] = useState({
    images: {
      _id: "",
      url: "",
      public_id: "",
      type: "",
      size: "",
    },
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
  });

  const { user, setIsAuthenticated } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const initialAdminData = {
        images: user?.images,
        firstName: user?.firstName,
        lastName: user?.lastName,
        mobileNumber: user?.mobileNumber,
        email: user?.email,
      };
      setUserData(initialAdminData);
    }
  }, [user]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        setIsLoading(true);
        const { data } = await _post(IMAGE_UPLOAD, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setUserData((prev) => ({
          ...prev,
          images: data,
        }));
        toast.success("File Uploaded Successfully");
      } catch (error) {
        toast.warn(
          error.response?.data?.message ||
            "An error occured while uploading image "
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj;
    if (userData.images?._id) {
      obj = { ...userData, images: userData.images._id };
    } else {
      const { images, ...data } = userData;
      obj = data;
    }
    try {
      const { data } = await _put(`/user/${user._id}`, obj);
      console.log(data);
      alert("Profile updated successfully");
      toast.success("Profile updated successfully");
      setIsAuthenticated((prev) => prev + 1);
    } catch (error) {
      //   toast.warn(error.response.data.message);
      console.log(error);
    }
  };
  console.log({});

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={userData?.images?.url || adminprofile}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 cursor-pointer"
              onClick={() => document.getElementById("imageInput").click()}
            />
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold text-gray-800">
              {userData?.firstName} {userData?.lastName}
            </h2>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-600"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-600"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-600"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={userData.mobileNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Save Changes
          </button>
        </div>{" "}
      </form>
    </div>
  );
};

export default AdminProfileForm;
