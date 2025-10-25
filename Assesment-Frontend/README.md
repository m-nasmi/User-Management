# User Management System - Frontend

A modern, responsive React frontend for managing users, their favorites, and permissions. Built with Vite, React, and Tailwind CSS.

## Features

### 🎯 Core Functionality

- **User Management**: Complete CRUD operations for users
- **Favorites Management**: Add, edit, and delete user favorites
- **Permissions Management**: Toggle user permissions (Attendance, Cashbook, Supplier)
- **Real-time Updates**: Live data synchronization with backend

### 🎨 User Interface

- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Components**: Modals, forms, tables, and buttons
- **Loading States**: Visual feedback during API operations
- **Error Handling**: User-friendly error messages

### 🔧 Technical Features

- **Component Architecture**: Modular, reusable React components
- **API Integration**: Axios-based service layer for backend communication
- **State Management**: React hooks for local state management
- **Form Validation**: Client-side validation with error handling
- **TypeScript Ready**: Structured for easy TypeScript migration

## Project Structure

```
src/
├── pages/              # Page components (routing)
│   ├── UserListPage.jsx    # Main dashboard with user table
│   └── AddUserPage.jsx     # Dedicated page for adding users
├── components/         # Reusable UI components
│   ├── Button.jsx     # Custom button component
│   ├── Input.jsx      # Form input component
│   ├── Modal.jsx      # Modal dialog component
│   ├── Navigation.jsx # Navigation bar component
│   ├── UserForm.jsx   # Edit user form (modal only)
│   ├── FavoritesManagement.jsx  # Manage user favorites
│   └── PermissionsManagement.jsx  # Manage user permissions
├── services/          # API service layer
│   └── api.js        # Backend API integration
├── App.jsx           # Main application with routing
├── main.jsx         # Application entry point
└── index.css        # Global styles and Tailwind imports
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 3000

### Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

## API Integration

The frontend communicates with the backend through the following endpoints:

### User Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Data Structure

#### User Object

```javascript
{
  id: number,
  name: string,
  email: string,
  role: 'user' | 'admin' | 'manager',
  favorites: Favorite[],
  permissions: Permission
}
```

#### Favorite Object

```javascript
{
  id: number,
  productName: string,
  productValue: string | null
}
```

#### Permission Object

```javascript
{
  attendance: boolean,
  cashbook: boolean,
  supplier: boolean
}
```

## Component Documentation

### UserList

Main component displaying all users in a responsive table format.

- **Features**: View, edit, delete users
- **Actions**: Add new user, manage favorites, manage permissions
- **Responsive**: Mobile-friendly table layout

### UserForm

Form component for creating and editing users.

- **Fields**: Name, email, password, role, permissions
- **Validation**: Client-side validation with error messages
- **Modes**: Create new user or edit existing user

### FavoritesManagement

Component for managing user favorites.

- **Features**: Add, edit, delete favorites
- **Inline Editing**: Edit favorites directly in the list
- **Validation**: Required product name validation

### PermissionsManagement

Component for managing user permissions.

- **Permissions**: Attendance, Cashbook, Supplier management
- **Toggle Interface**: Easy-to-use toggle switches
- **Visual Feedback**: Clear enabled/disabled states

## Styling

The application uses Tailwind CSS for styling with custom enhancements:

- **Color Scheme**: Professional blue and gray palette
- **Typography**: Inter font family for modern appearance
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach
- **Accessibility**: Focus states and keyboard navigation

## Error Handling

The application includes comprehensive error handling:

- **API Errors**: Network and server error handling
- **Validation Errors**: Form validation with user feedback
- **Loading States**: Visual indicators during operations
- **User Feedback**: Success and error messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- **ESLint**: Configured for React best practices
- **Prettier**: Code formatting (if configured)
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the User Management System assessment.
