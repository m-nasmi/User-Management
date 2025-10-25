import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, UserPlus, Shield, X } from "lucide-react";
import { userAPI } from "../services/api";
import Input from "../components/Input";
import Button from "../components/Button";

const AddUserPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    favorites: [],
    permissions: {
      attendance: false,
      cashbook: false,
      supplier: false,
    },
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handlePermissionChange = (permission, value) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: value,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        role: formData.role,
        permissions: formData.permissions,
      };

      if (formData.favorites.length > 0) {
        userData.favorites = formData.favorites;
      }

      await userAPI.createUser(userData);

      navigate("/");
    } catch (error) {
      setErrors({ submit: "Failed to create user: " + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <UserPlus size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
                <p className="text-gray-600 mt-1">
                  Create a new user account with permissions and preferences
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <UserPlus size={20} className="mr-2 text-blue-600" />
                User Information
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                    <p className="text-red-800 font-medium">{errors.submit}</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    error={errors.name}
                    required
                    placeholder="Enter user's full name"
                    className="bg-gray-50 border-gray-200 focus:bg-white"
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={errors.email}
                    required
                    placeholder="Enter user's email"
                    className="bg-gray-50 border-gray-200 focus:bg-white"
                  />

                  <Input
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    error={errors.password}
                    required
                    placeholder="Enter secure password"
                    className="bg-gray-50 border-gray-200 focus:bg-white"
                  />

                  <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="w-full px-3 py-2 border bg-gray-50 border-gray-200 focus:bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Shield size={20} className="text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Permissions
                  </h3>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 cursor-pointer shadow-sm">
                      <input
                        type="checkbox"
                        checked={formData.permissions.attendance}
                        onChange={(e) =>
                          handlePermissionChange("attendance", e.target.checked)
                        }
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div>
                        <span className="text-sm font-semibold text-gray-900">
                          Attendance
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          Manage attendance records
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 cursor-pointer shadow-sm">
                      <input
                        type="checkbox"
                        checked={formData.permissions.cashbook}
                        onChange={(e) =>
                          handlePermissionChange("cashbook", e.target.checked)
                        }
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div>
                        <span className="text-sm font-semibold text-gray-900">
                          Cashbook
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          Manage financial records
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 cursor-pointer shadow-sm">
                      <input
                        type="checkbox"
                        checked={formData.permissions.supplier}
                        onChange={(e) =>
                          handlePermissionChange("supplier", e.target.checked)
                        }
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div>
                        <span className="text-sm font-semibold text-gray-900">
                          Supplier
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          Manage supplier information
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  onClick={() => navigate("/")}
                  variant="outline"
                  disabled={loading}
                  className="w-full sm:w-auto bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 transition-all duration-200 shadow-sm h-12 px-6"
                >
                  <X size={18} className="mr-2" />
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={loading}
                  className="w-full sm:w-auto bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200 hover:border-blue-300 transition-all duration-200 font-semibold shadow-sm h-12 px-6"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Create User
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;