const { User, Favorite, Permission } = require("../models");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Favorite,
          as: "favorites",
          attributes: ["id", "productName", "productValue"],
        },
        {
          model: Permission,
          as: "permissions",
          attributes: ["attendance", "cashbook", "supplier"],
        },
      ],
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    await Permission.create({
      userId: user.id,
      attendance: false,
      cashbook: false,
      supplier: false,
    });

    const completeUser = await User.findByPk(user.id, {
      include: [
        {
          model: Favorite,
          as: "favorites",
          attributes: ["id", "productName", "productValue"],
        },
        {
          model: Permission,
          as: "permissions",
          attributes: ["attendance", "cashbook", "supplier"],
        },
      ],
      attributes: { exclude: ["password"] },
    });

    res.status(201).json(completeUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.id;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (Object.keys(updateData).length > 0) {
      await User.update(updateData, { where: { id: userId } });
    }

    const updatedUser = await User.findByPk(userId, {
      include: [
        {
          model: Favorite,
          as: "favorites",
          attributes: ["id", "productName", "productValue"],
        },
        {
          model: Permission,
          as: "permissions",
          attributes: ["attendance", "cashbook", "supplier"],
        },
      ],
      attributes: { exclude: ["password"] },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.destroy({ where: { id: userId } });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserFavorites = async (req, res) => {
  try {
    const userId = req.params.id;
    const { favorite } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Favorite.destroy({ where: { userId } });

    if (favorite) {
      const favoriteData = {
        userId,
        productName:
          typeof favorite === "string"
            ? favorite
            : favorite.name || favorite.productName || favorite,
        productValue:
          typeof favorite === "object"
            ? favorite.value || favorite.productValue
            : null,
      };
      await Favorite.create(favoriteData);
    }

    const updatedUser = await User.findByPk(userId, {
      include: [
        {
          model: Favorite,
          as: "favorites",
          attributes: ["id", "productName", "productValue"],
        },
        {
          model: Permission,
          as: "permissions",
          attributes: ["attendance", "cashbook", "supplier"],
        },
      ],
      attributes: { exclude: ["password"] },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserFavorites,
};