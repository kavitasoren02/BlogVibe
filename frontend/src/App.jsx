import "./App.css";
import { Routes, Route } from "react-router-dom";
import NoAuthRoute from "./ProtectedRoute/NoAuth";
import FullScreenLayout from "./layout/FullScreenLayout";
import HomeFullScreenLayout from "./layout/HomeFullScreenLayout";
import HomePage from "./pages/home/Home";
import LoginForm from "./pages/login/Login";
import RegistrationForm from "./pages/signup/SignUp";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ManageBloggers from "./pages/admin/ManageBloggers";
import ManageUsers from "./pages/admin/ManageUsers";
import AdminProfile from "./pages/profile/AdminProfile";
import AuthorDashboard from "./pages/author/AuthorDashboard";
import Comments from "./pages/author/Comment";
import MyBlogs from "./pages/author/MyBlogs";
import TipTap from "./Editor1/TipTap";
import { EditorProvider } from "./Editor1/TiptapContext";
import { Bounce, ToastContainer } from "react-toastify";
import Media from "./pages/author/Media";
import BlogDetails from "./pages/home/BlogDetails";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <NoAuthRoute>
              <HomeFullScreenLayout>
                <HomePage />
              </HomeFullScreenLayout>
            </NoAuthRoute>
          }
        />

        {/* Register Page */}
        <Route
          path="/user/register"
          element={
            <NoAuthRoute>
              <FullScreenLayout>
                <RegistrationForm />
              </FullScreenLayout>
            </NoAuthRoute>
          }
        />
        {/* Login Page */}
        <Route
          path="/auth/login"
          element={
            <NoAuthRoute>
              <FullScreenLayout>
                <LoginForm />
              </FullScreenLayout>
            </NoAuthRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/bloggers"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <ManageBloggers />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <ManageUsers />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute allowedRoles={["admin", "blogger"]}>
              <AdminLayout>
                <AdminProfile />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/blogger"
          element={
            <ProtectedRoute allowedRoles={["blogger"]}>
              <AdminLayout>
                <AuthorDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/comments"
          element={
            <ProtectedRoute allowedRoles={["blogger"]}>
              <AdminLayout>
                <Comments />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="posts"
          element={
            <ProtectedRoute allowedRoles={["blogger"]}>
              <AdminLayout>
                {/* <Posts /> */}
                <MyBlogs />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-blog"
          element={
            <ProtectedRoute allowedRoles={["blogger"]}>
              <AdminLayout>
                <EditorProvider>
                  <TipTap />
                </EditorProvider>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-files"
          element={
            <ProtectedRoute allowedRoles={["blogger"]}>
              <AdminLayout>
                <Media />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/blog/:id"
          element={
            <HomeFullScreenLayout>
              <BlogDetails />
            </HomeFullScreenLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
