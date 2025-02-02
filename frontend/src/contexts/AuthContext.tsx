import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextProps {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/me');
        setUser(response.data.user);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('/api/login', { email, password });
    setUser(response.data.user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const signup = async (email: string, password: string) => {
    const response = await axios.post('/api/signup', { email, password });
    setUser(response.data.user);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
