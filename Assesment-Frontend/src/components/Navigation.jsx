import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, UserPlus, Shield } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      label: "Users",
      icon: Users,
      isActive: location.pathname === "/",
    },
    {
      path: "/add-user",
      label: "Add User",
      icon: UserPlus,
      isActive: location.pathname === "/add-user",
    },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Shield size={32} className="text-blue-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">User Management</h1>
          </div>

          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 ${
                    item.isActive
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon size={20} className="mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
