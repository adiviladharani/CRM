import { useState } from "react";
import { authService } from "../services/authService";

export function useAuth() {
  const [user, setUser] = useState(
    authService.getCurrentUser()
  );

  const login = async (email, password) => {
    const loggedInUser =
      await authService.login(
        email,
        password
      );

    if (!loggedInUser) {
      throw new Error(
        "Invalid email or password"
      );
    }

    authService.setCurrentUser(loggedInUser);
    setUser(loggedInUser);

    return loggedInUser;
  };

  const register = async (data) => {
    return authService.register(data);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return {
    user,
    login,
    register,
    logout,
    isAuthenticated: Boolean(user)
  };
}