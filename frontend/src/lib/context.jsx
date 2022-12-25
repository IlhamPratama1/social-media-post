import React, { useState } from 'react';
import { createContext } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext(null);

export default function ContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [snackbar, setSnackbarData] = useState({
    isOpen: false,
    isSuccess: false,
    message: '',
  });

  function setLoggedData(isLogged) {
    setIsLoggedIn(isLogged);
  }

  function openSnackbar(value) {
    setSnackbarData(value);
  }

  function closeSnackbar() {
    setSnackbarData({
      isOpen: false,
      isSuccess: false,
      message: '',
    });
  }

  return (
    <AppContext.Provider
      value={{ isLoggedIn, snackbar, setLoggedData, openSnackbar, closeSnackbar }}
    >
      {children}
    </AppContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.any,
};
