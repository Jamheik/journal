import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../../components/firebase';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          const isTokenValid = idTokenResult.expirationTime > new Date().toISOString();
          if (isTokenValid) {
            setIsAuthenticated(true);
          } else {
            handleLogout();
          }
        });
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setIsAuthenticated(false);
    });
  };

  return (
    <SessionContext.Provider value={{ isAuthenticated, handleLogout }}>
      {!loading && children}
    </SessionContext.Provider>
  );
};