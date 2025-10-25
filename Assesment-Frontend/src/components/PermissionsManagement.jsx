import React, { useState, useEffect } from "react";
import { Check, X, Save, Shield, User } from "lucide-react";
import { userAPI } from "../services/api";
import Button from "./Button";

const PermissionsManagement = ({ user, onUpdate, onCancel }) => {
  const [permissions, setPermissions] = useState({
    attendance: false,
    cashbook: false,
    supplier: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.permissions) {
      setPermissions({ ...user.permissions });
    }
  }, [user]);

  const handlePermissionChange = (permission, value) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: value,
    }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setError(null);

    try {
      const updatedUser = await userAPI.updateUser(user.id, {
        permissions: permissions,
      });

      onUpdate(updatedUser);
    } catch (err) {
      setError("Failed to update permissions: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const PermissionItem = ({ permission, label, description }) => {
    const isEnabled = permissions[permission];

    return (
      <div
        className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
          isEnabled
            ? "border-green-300 bg-green-50 shadow-sm"
            : "border-gray-200 bg-gray-50 shadow-sm"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900">{label}</h4>
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          </div>
          <div className="ml-4">
            <button
              onClick={() => handlePermissionChange(permission, !isEnabled)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${
                isEnabled ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-all duration-200 ${
                  isEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          {isEnabled ? (
            <div className="flex items-center text-green-700 font-semibold">
              <Check size={18} className="mr-2" />
              <span className="text-sm">Enabled</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-600 font-semibold">
              <X size={18} className="mr-2" />
              <span className="text-sm">Disabled</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-md">
            <User size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">
              Managing Permissions For
            </h3>
            <p className="text-blue-700 font-medium">
              {user?.name} • {user?.email}
            </p>
            <p className="text-sm text-blue-600 mt-1">Role: {user?.role}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Shield size={24} className="text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              System Permissions
            </h3>
          </div>

          <div className="space-y-4">
            <PermissionItem
              permission="attendance"
              label="Attendance Management"
              description="Allows user to view and manage attendance records, track employee hours, and generate attendance reports."
            />

            <PermissionItem
              permission="cashbook"
              label="Cashbook Management"
              description="Grants access to financial records, cash flow management, and accounting functions."
            />

            <PermissionItem
              permission="supplier"
              label="Supplier Management"
              description="Enables user to manage supplier information, track orders, and handle vendor relationships."
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Permission Summary
          </h3>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-semibold text-gray-700">
                  Attendance Management:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    permissions.attendance
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  {permissions.attendance ? "Enabled" : "Disabled"}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-semibold text-gray-700">
                  Cashbook Management:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    permissions.cashbook
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  {permissions.cashbook ? "Enabled" : "Disabled"}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-semibold text-gray-700">
                  Supplier Management:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    permissions.supplier
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  {permissions.supplier ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-gray-900">
                  Total Enabled:
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {Object.values(permissions).filter(Boolean).length} / 3
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      (Object.values(permissions).filter(Boolean).length / 3) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
        <Button
          onClick={onCancel}
          variant="outline"
          disabled={loading}
          className="w-full sm:w-auto bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 transition-all duration-200 shadow-sm h-12 px-6"
        >
          <X size={18} className="mr-2" />
          Cancel
        </Button>
        <Button
          onClick={handleSaveChanges}
          variant="primary"
          disabled={loading}
          className="w-full sm:w-auto bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200 hover:border-blue-300 transition-all duration-200 font-semibold shadow-sm h-12 px-6"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
              Saving...
            </div>
          ) : (
            <>
              <Save size={18} className="mr-2" />
              Save Permissions
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PermissionsManagement;