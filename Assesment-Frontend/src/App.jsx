import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import AddUserPage from "./pages/AddUserPage";
import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/add-user" element={<AddUserPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
