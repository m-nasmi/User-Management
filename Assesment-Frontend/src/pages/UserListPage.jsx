import React, { useState, useEffect } from "react";
import { Edit, Trash2, Heart, Settings, Search, Filter, Plus, Mail, User, Shield } from "lucide-react";
import { userAPI } from "../services/api";
import Button from "../components/Button";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import FavoritesManagement from "../components/FavoritesManagement";
import PermissionsManagement from "../components/PermissionsManagement";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userAPI.getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleManageFavorites = (user) => {
    setSelectedUser(user);
    setShowFavoritesModal(true);
  };

  const handleManagePermissions = (user) => {
    setSelectedUser(user);
    setShowPermissionsModal(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await userAPI.deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      setDeleteConfirm(null);
    } catch (err) {
      setError("Failed to delete user: " + err.message);
    }
  };

  const handleUserSaved = (savedUser) => {
    setUsers(
      users.map((user) => (user.id === savedUser.id ? savedUser : user))
    );
    setShowEditModal(false);
  };

  const handleFavoritesUpdated = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setShowFavoritesModal(false);
  };

  const handlePermissionsUpdated = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setShowPermissionsModal(false);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-red-500 rounded-full"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Users</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={fetchUsers} className="w-full">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Manage your team members and their permissions</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-md">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800 shadow-sm' 
                      : user.role === 'manager'
                      ? 'bg-orange-100 text-orange-800 shadow-sm'
                      : 'bg-blue-100 text-blue-800 shadow-sm'
                  }`}>
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm font-medium">Favorites</span>
                  </div>
                  <span className="text-sm text-gray-900 font-semibold">
                    {user.favorites?.length || 0} items
                  </span>
                </div>

                <div>
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">Permissions</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {user.permissions ? (
                      <>
                        {user.permissions.attendance && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-lg bg-green-50 text-green-700 border border-green-200 shadow-sm">
                            Attendance
                          </span>
                        )}
                        {user.permissions.cashbook && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
                            Cashbook
                          </span>
                        )}
                        {user.permissions.supplier && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-lg bg-orange-50 text-orange-700 border border-orange-200 shadow-sm">
                            Supplier
                          </span>
                        )}
                        {!user.permissions.attendance && !user.permissions.cashbook && !user.permissions.supplier && (
                          <span className="text-xs text-gray-400">No permissions</span>
                        )}
                      </>
                    ) : (
                      <span className="text-xs text-gray-400">No permissions</span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 border-t border-gray-100">
                  <Button
                    onClick={() => handleManageFavorites(user)}
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-pink-50 border-pink-200 text-pink-600 hover:bg-pink-100 hover:border-pink-300 hover:shadow-md transition-all duration-200 shadow-sm"
                  >
                    <Heart size={16} />
                  </Button>
                  <Button
                    onClick={() => handleManagePermissions(user)}
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 shadow-sm"
                  >
                    <Settings size={16} />
                  </Button>
                  <Button
                    onClick={() => handleEditUser(user)}
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-200 shadow-sm"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    onClick={() => setDeleteConfirm(user.id)}
                    variant="danger"
                    size="sm"
                    className="flex-1 bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 hover:shadow-md transition-all duration-200 shadow-sm"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || roleFilter !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "Get started by adding your first user"}
            </p>
            {!searchTerm && roleFilter === "all" && (
              <Button className="bg-blue-500 hover:bg-blue-600 border-0 text-white shadow-md hover:shadow-lg transition-all duration-200">
                <Plus size={20} className="mr-2" />
                Add First User
              </Button>
            )}
          </div>
        )}

        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit User"
          size="lg"
        >
          <UserForm
            user={selectedUser}
            onSave={handleUserSaved}
            onCancel={() => setShowEditModal(false)}
          />
        </Modal>

        <Modal
          isOpen={showFavoritesModal}
          onClose={() => setShowFavoritesModal(false)}
          title={`Manage Favorites - ${selectedUser?.name}`}
          size="lg"
        >
          <FavoritesManagement
            user={selectedUser}
            onUpdate={handleFavoritesUpdated}
            onCancel={() => setShowFavoritesModal(false)}
          />
        </Modal>

        <Modal
          isOpen={showPermissionsModal}
          onClose={() => setShowPermissionsModal(false)}
          title={`Manage Permissions - ${selectedUser?.name}`}
          size="xl"
        >
          <PermissionsManagement
            user={selectedUser}
            onUpdate={handlePermissionsUpdated}
            onCancel={() => setShowPermissionsModal(false)}
          />
        </Modal>

        <Modal
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          title="Confirm Delete"
          size="sm"
        >
          <div className="space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-gray-600 text-center">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                onClick={() => setDeleteConfirm(null)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteUser(deleteConfirm)}
                variant="danger"
              >
                Delete User
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserListPage;