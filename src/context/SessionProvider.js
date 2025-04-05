import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../components/firebase';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUserId(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      setUserId(user.uid);

      try {
        const idTokenResult = await user.getIdTokenResult();
        if (new Date(idTokenResult.expirationTime) <= new Date()) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error fetching token result:', error);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      setUserId(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <SessionContext.Provider value={{ isAuthenticated, userId, handleLogout }}>
      {!loading ? children : null}
    </SessionContext.Provider>
  );
};
