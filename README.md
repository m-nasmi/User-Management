# User Management System

A full-stack application for managing users with favorites and permissions, built with Node.js, Express.js, MySQL, and React.

## Project Structure

```
Assesment/
├── Backend (Node.js + Express + MySQL)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
└── Assesment-Frontend/
    └── Frontend (React + Vite)
        ├── src/
        │   ├── components/
        │   ├── pages/
        │   └── services/
        └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Assesment
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd Assesment
```

Install dependencies:

```bash
npm install
```

### 3. Database Setup

1. Create a MySQL database named `User_s_Collection`
2. Update database credentials in `config.js`:

```javascript
database: {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'User_s_Collection'
}
```

### 4. Start Backend Server

```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### 5. Frontend Setup

Open a new terminal and navigate to frontend:

```bash
cd Assesment-Frontend
```

Install dependencies:

```bash
npm install
```

### 6. Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user details
- `DELETE /api/users/:id` - Delete user
- `PATCH /api/users/:id/favorites` - Update user favorites

## Features

- User Management (CRUD operations)
- Favorites Management
- Permissions Management
- Responsive Design
- MySQL Database Integration
- RESTful API

## Database Schema

### Users Table

- id (Primary Key)
- name
- email
- password
- role
- createdAt
- updatedAt

### Favorites Table

- id (Primary Key)
- userId (Foreign Key)
- productName
- productValue
- createdAt
- updatedAt

### Permissions Table

- id (Primary Key)
- userId (Foreign Key)
- attendance (Boolean)
- cashbook (Boolean)
- supplier (Boolean)
- createdAt
- updatedAt

## Testing

The application includes 5 test cases for POSTMAN testing:

1. GET /api/users - Returns all users
2. POST /api/users - Creates new user
3. PUT /api/users/:id - Updates user details
4. DELETE /api/users/:id - Deletes user
5. PATCH /api/users/:id/favorites - Updates user favorites

## Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Verify MySQL is running
   - Check database credentials in config.js
   - Ensure database `User_s_Collection` exists

2. **Port Already in Use**

   - Backend runs on port 3001
   - Frontend runs on port 5173
   - Change ports in config files if needed

3. **Dependencies Issues**
   - Delete node_modules and package-lock.json
   - Run `npm install` again

## Development

### Backend Development

- Uses Express.js framework
- Sequelize ORM for database operations
- CORS enabled for frontend communication

### Frontend Development

- Built with React and Vite
- Uses Axios for API calls
- Responsive design with Tailwind CSS

## License

This project is for assessment purposes.
