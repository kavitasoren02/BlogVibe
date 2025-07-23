📝 Blog Website
This is a full-stack Blog Website application that allows users to create, edit, delete, and read blog posts. It supports role-based access for users and authors, provides a responsive and user-friendly interface, and is built using the MERN (MongoDB, Express, React, Node.js) stack.

✨ Features
User Authentication: Signup, login, logout using JWT tokens.

Role-Based Access: Normal Users and Authors have different privileges.

Blog Management: Create, update, delete, and view blogs.

Commenting System: Readers can comment on blogs.

Likes and Reactions: Interactive engagement with content.

Categories: Blogs can be filtered by categories.

Responsive UI: Mobile-first responsive design.

Secure API: Access control and validations at route-level.

🛠️ Tech Stack
Frontend
React (with Vite)

Tailwind CSS

React Router

Axios for API requests

Backend
Node.js

Express.js

MongoDB with Mongoose

JSON Web Tokens (JWT)

bcrypt for password hashing

express-validator for validations

dotenv for environment variable management

⚙️ Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/blog-website.git
🔧 Backend Setup
bash
Copy
Edit
cd backend
npm install
npm run dev
.env file:

ini
Copy
Edit
NODE_ENV=development
PORT=5000
DB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
🎨 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
.env file:

bash
Copy
Edit
VITE_API_BASE_URL=http://localhost:5000/api
🚀 Deployment
Frontend: Netlify

Backend: Render

