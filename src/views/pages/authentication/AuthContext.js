// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    const storedUsername = localStorage.getItem('authenticatedUsername');
    return storedUsername || '';
  });

  const setAuthenticatedUsername = (newUsername) => {
    localStorage.setItem('authenticatedUsername', newUsername);
    setUsername(newUsername);
  };

  return <AuthContext.Provider value={{ username, setAuthenticatedUsername }}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired // Prop validation for children
};
export const useAuth = () => {
  return useContext(AuthContext);
};
