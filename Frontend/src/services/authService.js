// /src/services/authService.js

let currentUser = null;

export const login = (username, password) => {
  // Mock login - check if username and password match
  if (username === 'user' && password === 'password') {
    currentUser = { username, name: 'John Doe', email: 'john.doe@example.com' }; // Mock user data
    return true;
  }
  return false;
};

export const getCurrentUser = () => currentUser;

export const logout = () => {
  currentUser = null;
};
