import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../components/firebase';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // State to store userId

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); // Set userId when user is authenticated
        user.getIdTokenResult().then((idTokenResult) => {
          const isTokenValid = idTokenResult.expirationTime > new Date().toISOString();
          if (isTokenValid) {
            setIsAuthenticated(true);
          } else {
            handleLogout();
          }
        });
      } else {
        setUserId(null); // Clear userId when user is not authenticated
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setIsAuthenticated(false);
      setUserId(null); // Clear userId on logout
    });
  };

  return (
    <SessionContext.Provider value={{ isAuthenticated, handleLogout, userId }}> // Provide userId in context
      {!loading && children}
    </SessionContext.Provider>
  );
};