import { api } from "./api";

const STORAGE_KEY = "currentUser";

export const authService = {
  async login(email, password) {
    const users = await api.get("users");

    return users.find(
      (user) =>
        user.email?.toLowerCase() ===
          email.trim().toLowerCase() &&
        user.password === password
    );
  },

  async register(user) {
    const users = await api.get("users");

    const exists = users.some(
      (item) =>
        item.email?.toLowerCase() ===
        user.email.trim().toLowerCase()
    );

    if (exists) {
      throw new Error(
        "Email is already registered"
      );
    }

    return api.post("users", {
      name: user.name.trim(),
      email: user.email.trim().toLowerCase(),
      password: user.password
    });
  },

  setCurrentUser(user) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(user)
    );
  },

  getCurrentUser() {
    const user = localStorage.getItem(STORAGE_KEY);

    return user ? JSON.parse(user) : null;
  },

  logout() {
    localStorage.removeItem(STORAGE_KEY);
  },

  isAuthenticated() {
    return Boolean(
      localStorage.getItem(STORAGE_KEY)
    );
  }
};