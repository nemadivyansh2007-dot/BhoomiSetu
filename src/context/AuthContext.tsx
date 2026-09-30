import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type UserRole = 'citizen' | 'researcher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  savedItems: string[];
  toggleSave: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: User[] = [
  { id: 'u1', name: 'Priya Sharma', email: 'researcher@demo.in', role: 'researcher', institution: 'NIRD&PR Hyderabad' },
  { id: 'u2', name: 'Amit Kumar', email: 'admin@demo.in', role: 'admin', institution: 'Ministry of Rural Development' },
  { id: 'u3', name: 'Geeta Devi', email: 'citizen@demo.in', role: 'citizen' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('bhoomisetu_user');
    const storedSaved = localStorage.getItem('bhoomisetu_saved');
    if (stored) setUser(JSON.parse(stored));
    if (storedSaved) setSavedItems(JSON.parse(storedSaved));
    setLoading(false);
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    const found = DEMO_USERS.find(u => u.email === email);
    if (found) {
      setUser(found);
      localStorage.setItem('bhoomisetu_user', JSON.stringify(found));
      return true;
    }
    // Accept any email/password for demo
    const demoUser: User = {
      id: 'demo-' + Date.now(),
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email,
      role: 'citizen',
    };
    setUser(demoUser);
    localStorage.setItem('bhoomisetu_user', JSON.stringify(demoUser));
    return true;
  };

  const register = async (name: string, email: string, _password: string, role: UserRole): Promise<boolean> => {
    const newUser: User = { id: 'u-' + Date.now(), name, email, role };
    setUser(newUser);
    localStorage.setItem('bhoomisetu_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bhoomisetu_user');
  };

  const toggleSave = (id: string) => {
    setSavedItems(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('bhoomisetu_saved', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, savedItems, toggleSave }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
