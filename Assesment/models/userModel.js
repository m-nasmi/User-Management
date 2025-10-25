const User = {
  createdAt: new Date().toISOString(),
  email: "",
  name: "",
  password: "",
  role: "user",
  favorites: [],
  permissions: {
    attendance: false,
    cashbook: false,
    supplier: false
  }
};

module.exports = User;
