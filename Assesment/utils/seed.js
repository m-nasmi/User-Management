const { User, Favorite, Permission } = require("../models");

async function seedInitialData() {
  try {
    const existingUsers = await User.count();

    if (existingUsers > 0) {
      console.log("Database already has users, skipping seed");
      return { created: false, existed: true };
    }

    const users = [
      {
        email: "admin@example.com",
        name: "Admin",
        password: "admin123",
        role: "admin",
        favorites: [
          { name: "Product1", value: "new" },
          { name: "Product2", value: "new2" },
        ],
        permissions: {
          attendance: true,
          cashbook: true,
          supplier: true,
        },
      },
      {
        email: "user@example.com",
        name: "User",
        password: "user123",
        role: "user",
        favorites: [
          { name: "Product1", value: "new3" },
          { name: "Product2", value: "new4" },
        ],
        permissions: {
          attendance: false,
          cashbook: false,
          supplier: false,
        },
      },
      {
        email: "mohamedshinan87@gmail.com",
        name: "Shinan",
        password: "92bY0tsWtyMu8yBtstyKjRola982u2mHeB02RWQNSaVoEpC3wVEBcv",
        role: "user",
        favorites: [
          { name: "product1", value: null },
          { name: "product2", value: null },
          { name: "product3", value: null },
        ],
        permissions: {
          attendance: false,
          cashbook: true,
          supplier: true,
        },
      },
    ];

    for (const userData of users) {
      const { favorites, permissions, ...userInfo } = userData;

      const user = await User.create(userInfo);

      if (favorites && favorites.length > 0) {
        const favoriteData = favorites.map((fav) => ({
          userId: user.id,
          productName: fav.name,
          productValue: fav.value,
        }));
        await Favorite.bulkCreate(favoriteData);
      }
      
      await Permission.create({
        userId: user.id,
        ...permissions,
      });
    }

    console.log(`Database seeded with ${users.length} users`);
    return { created: true, existed: false };
  } catch (err) {
    console.error("Seed error:", err.message || err);
    return { created: false, existed: false, error: err };
  }
}

module.exports = { seedInitialData };
