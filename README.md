# **Blog Website**

This full-stack **Blog Website** allows users to read, create, update, and delete blog posts. Built using modern technologies like **React (Vite)** for the frontend and **Express.js + MongoDB** for the backend, it provides a seamless and responsive blogging experience with role-based access and secure authentication.


## **Features**

- ✍️ **Create & Manage Blogs**: Authors can write, edit, and delete their blogs.
- 👤 **User Roles**: Normal Users can read blogs; Authors can create and manage content.
- 💬 **Comments**: Users can comment on blog posts.
- ❤️ **Likes & Reactions**: Like functionality for reader engagement.
- 📂 **Categories**: Blogs can be filtered by topics.
- 🔐 **JWT Authentication**: Secure login and signup.
- 📱 **Responsive UI**: Optimized for mobile, tablet, and desktop views.
- 🌐 **RESTful APIs**: Modular and scalable backend with clear routes and validations.


## **Tech Stack**

### **Frontend**
- React (Vite)
- HTML5 Tailwind CSS
- fetch for API requests
- React Router 

### **Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- express-validator for input validation
- dotenv for environment configuration


# **Installation**

- Install the required packages by running the following command in your terminal:

```bash
git clone https://github.com/kavitasoren02/blog-website.git
```

## Backend

```bash
cd backend
```

```bash
npm install
```

```bash
npm run dev
```

### **Setup Instructions for .env file**


PORT=
MONGO_URI=
JWT_SECRET_KEY = 

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=