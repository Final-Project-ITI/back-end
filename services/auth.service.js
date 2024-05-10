class AuthService {
  constructor() { }

  users = [
    {
      _id: 1,
      email: "waleed.almenawy@outlook.com",
      password: "123123123",
      role: "restaurant:admin"
    },
    {
      _id: 2,
      email: "kemo.almenawy@outlook.com",
      password: "123123123",
      role: "restaurant:admin"
    },
    {
      _id: 3,
      email: "mohsen.almenawy@outlook.com",
      password: "123123123",
      role: "restaurant:admin"
    },
  ]

  getUser({ _id }) {
    const user = this.users.find((user) => user._id == _id);

    if (user) return user;

    return null;
  }
}
module.exports = AuthService;
