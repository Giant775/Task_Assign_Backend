# Task Management System - Backend

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [API Documentation](#api-documentation)
5. [Folder Structure](#folder-structure)
6. [Contributing](#contributing)
7. [License](#license)

---

## Features
- **RESTful API**: CRUD operations for tasks and users
- **Real-Time Updates**: Socket.io integration for live updates
- **Authentication**: JWT-based secure authentication
- **Database**: MongoDB for data storage
- **Validation**: Request validation and error handling
- **CORS**: Secure cross-origin resource sharing

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Giant775/Task_Assign_Backend.git
   cd Task_Assign_Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The server will run on [http://localhost:5000](http://localhost:5000).

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskmanagement
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

---

## API Documentation

**Base URL:** `http://localhost:5000/api`

### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

### Users
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

---

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Happy coding! 🚀

