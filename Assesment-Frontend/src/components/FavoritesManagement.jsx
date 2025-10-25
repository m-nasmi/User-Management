import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, X, Heart, Package } from "lucide-react";
import { userAPI } from "../services/api";
import Button from "./Button";
import Input from "./Input";

const FavoritesManagement = ({ user, onUpdate, onCancel }) => {
  const [favorites, setFavorites] = useState([]);
  const [newFavorite, setNewFavorite] = useState({
    productName: "",
    productValue: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.favorites) {
      setFavorites([...user.favorites]);
    }
  }, [user]);

  const handleAddFavorite = () => {
    if (newFavorite.productName.trim()) {
      const favorite = {
        id: Date.now(),
        productName: newFavorite.productName.trim(),
        productValue: newFavorite.productValue.trim() || null,
      };
      setFavorites([...favorites, favorite]);
      setNewFavorite({ productName: "", productValue: "" });
    }
  };

  const handleEditFavorite = (id) => {
    setEditingId(id);
  };

  const handleSaveEdit = (id, updatedData) => {
    setFavorites(
      favorites.map((fav) => (fav.id === id ? { ...fav, ...updatedData } : fav))
    );
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDeleteFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setError(null);

    try {
      const favoriteData =
        favorites.length > 0
          ? {
              name: favorites[0].productName,
              value: favorites[0].productValue,
            }
          : null;

      const updatedUser = await userAPI.updateUserFavorites(
        user.id,
        favoriteData
      );

      onUpdate(updatedUser);
    } catch (err) {
      setError("Failed to update favorites: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const FavoriteItem = ({ favorite }) => {
    const isEditing = editingId === favorite.id;

    if (isEditing) {
      return (
        <EditFavoriteItem
          favorite={favorite}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      );
    }

    return (
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center space-x-3 flex-1">
          <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
            <Package size={18} className="text-pink-600" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">
              {favorite.productName}
            </div>
            {favorite.productValue && (
              <div className="text-sm text-gray-600 mt-1">
                Value: {favorite.productValue}
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => handleEditFavorite(favorite.id)}
            variant="outline"
            size="sm"
            className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-300"
          >
            <Edit2 size={16} />
          </Button>
          <Button
            onClick={() => handleDeleteFavorite(favorite.id)}
            variant="danger"
            size="sm"
            className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    );
  };

  const EditFavoriteItem = ({ favorite, onSave, onCancel }) => {
    const [editData, setEditData] = useState({
      productName: favorite.productName,
      productValue: favorite.productValue || "",
    });

    const handleSave = () => {
      onSave(favorite.id, editData);
    };

    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
        <div className="space-y-4">
          <Input
            label="Product Name"
            value={editData.productName}
            onChange={(e) =>
              setEditData({ ...editData, productName: e.target.value })
            }
            placeholder="Enter product name"
            className="bg-white border-blue-200"
          />
          <Input
            label="Product Value"
            value={editData.productValue}
            onChange={(e) =>
              setEditData({ ...editData, productValue: e.target.value })
            }
            placeholder="Enter product value (optional)"
            className="bg-white border-blue-200"
          />
          <div className="flex justify-end space-x-2">
            <Button 
              onClick={onCancel} 
              variant="outline" 
              size="sm"
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <X size={16} className="mr-1" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              variant="primary" 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 border-0 text-white"
            >
              <Save size={16} className="mr-1" />
              Save
            </Button>
          </div>
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

      <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white shadow-md">
            <Heart size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-pink-900">
              Managing Favorites For
            </h3>
            <p className="text-pink-700 font-medium">
              {user?.name} • {user?.email}
            </p>
            <p className="text-sm text-pink-600 mt-1">Role: {user?.role}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Plus size={20} className="text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Add New Favorite
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Product Name"
            value={newFavorite.productName}
            onChange={(e) =>
              setNewFavorite({ ...newFavorite, productName: e.target.value })
            }
            placeholder="Enter product name"
            className="bg-gray-50 border-gray-200 focus:bg-white"
          />
          <Input
            label="Product Value"
            value={newFavorite.productValue}
            onChange={(e) =>
              setNewFavorite({ ...newFavorite, productValue: e.target.value })
            }
            placeholder="Enter product value (optional)"
            className="bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
        <div className="mt-4">
          <Button 
            onClick={handleAddFavorite} 
            variant="primary"
            className="bg-blue-600 hover:bg-blue-700 border-0 text-white shadow-md hover:shadow-lg"
          >
            <Plus size={20} className="mr-2" />
            Add Favorite
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Current Favorites
            </h3>
          </div>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
            {favorites.length} items
          </span>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No favorites added yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Add some favorites using the form above
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((favorite) => (
              <FavoriteItem key={favorite.id} favorite={favorite} />
            ))}
          </div>
        )}
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
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FavoritesManagement;