import React, { useState, useEffect } from "react";
import { userAPI } from "../services/api";
import Input from "./Input";
import Button from "./Button";
import { Save, X, Shield, User, Mail, Key } from "lucide-react";

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    permissions: {
      attendance: false,
      cashbook: false,
      supplier: false,
    },
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        role: user.role || "user",
        permissions: user.permissions || {
          attendance: false,
          cashbook: false,
          supplier: false,
        },
      });
    }
  }, [user]);

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
        role: formData.role,
        permissions: formData.permissions,
      };

      if (formData.password.trim()) {
        userData.password = formData.password.trim();
      }

      const savedUser = await userAPI.updateUser(user.id, userData);
      onSave(savedUser);
    } catch (error) {
      setErrors({ submit: "Failed to update user: " + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          error={errors.name}
          required
          placeholder="Enter user's full name"
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          error={errors.email}
          required
          placeholder="Enter user's email"
        />

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          error={errors.password}
          placeholder="Leave blank to keep current password"
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Shield size={20} className="text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            System Permissions
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
          onClick={onCancel}
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
              Updating...
            </div>
          ) : (
            <>
              <Save size={18} className="mr-2" />
              Update User
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;