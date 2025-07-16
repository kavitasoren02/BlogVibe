import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { _post } from "../../Service/ApiService";
import { toast } from "react-toastify";
import InputWithLabel from "../../components/component/InputWithLabel";
import SelectWithLabel from "../../components/component/SelectWithLabel";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "First name must be at least 3 characters")
      .max(50, "First name cannot exceed 50 characters")
      .required("First name is required"),

    lastName: Yup.string()
      .min(3, "Last name must be at least 3 characters")
      .max(50, "Last name cannot exceed 50 characters")
      .required("Last name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),

    role: Yup.string()
      .oneOf(["blogger", "user"], "Invalid role")
      .required("Role is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { confirmPassword, ...obj } = values;
        const { data } = await _post("/user/register", obj);
        toast.success(data.message);
        navigate("/auth/login");
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 px-4">
      <div className="w-full max-w-md p-6 md:p-8 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Register
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <InputWithLabel
            label="First Name"
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
          />

          <InputWithLabel
            label="Last Name"
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && formik.errors.lastName}
          />

          <InputWithLabel
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />

          <InputWithLabel
            label="Mobile Number"
            type="tel"
            name="mobileNumber"
            value={formik.values.mobileNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobileNumber && formik.errors.mobileNumber}
          />

          <SelectWithLabel
            label="Select Role"
            name="role"
            options={[
              { label: "User", value: "user" },
              { label: "Blogger", value: "blogger" },
            ]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.role && formik.errors.role}
          />

          <InputWithLabel
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />

          <InputWithLabel
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-white">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              className="text-blue-400 hover:text-blue-600 underline"
            >
              Login
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
