---

# ToDo Web Application with React

This project is a ToDo web application built with React that interacts with the Express.js API endpoint providing ToDo management capabilities. Users can register, log in, create, update, and delete tasks through this application.

## Prerequisites

Make sure you have Node.js and npm installed on your system.

- [Node.js](https://nodejs.org/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nwafor6/TodoAPPFE-ReactJs.git
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set API Base URL:

   In the `src/components/apiConfig.jsx` file, update the `BASE_URL` variable with the URL where your Express.js API endpoint is hosted:

   ```javascript
   const BASE_URL = 'http://localhost:YOUR_API_PORT';
   ```

   Replace `YOUR_API_PORT` with the port number where your Express.js API is running.

4. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:5173` by default.

## Usage

1. **Register/Login:**

   - Visit the home page.
   - Register a new account with your email and password.
   - Log in with your registered credentials.

2. **View Tasks:**

   - Once logged in, you will be redirected to the dashboard where you can view your tasks.

3. **Create Task:**

   - Click on the "New Task" button to create a new task.
   - Enter the task title.
   - Click "Save" to create the task.

4. **Update Task:**

   - Every task has a checkbox beside it. To mark a task complete. check the box..


5. **Delete Task:**

   - Click on the minus icon to delete a task.

Note: I you need acc to the backend enpoint which i also developed, you can clone the repo here
    - https://github.com/Nwafor6/TodoAPPBE-ExpressJS.git

## Technologies Used

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [axios](https://axios-http.com/) - Promise-based HTTP client for making API requests
- [React Router](https://reactrouter.com/) - Declarative routing for React.js applications

