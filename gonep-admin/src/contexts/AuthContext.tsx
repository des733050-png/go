import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, User, LoginCredentials } from '../types';
import { authAPI } from '../services/api';

// Action types
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: false,
  loading: true,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

// Context
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      console.log('🔍 Checking authentication, token exists:', !!token);
      
      if (token) {
        try {
          console.log('🔐 Token found, validating with backend...');
          // Try to get current user from backend
          const response = await authAPI.getCurrentUser();
          console.log('📡 Auth check response:', response);
          
          if (response.success) {
            console.log('✅ Auth check successful, user:', response.data);
            dispatch({ type: 'SET_USER', payload: response.data });
          } else {
            console.log('❌ Auth check failed, clearing token');
            localStorage.removeItem('authToken');
            dispatch({ type: 'LOGOUT' });
          }
        } catch (error) {
          console.error('💥 Auth check error:', error);
          localStorage.removeItem('authToken');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        console.log('🔍 No token found, user not authenticated');
        dispatch({ type: 'CLEAR_ERROR' });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    console.log('🔐 Login attempt with:', credentials.email);
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await authAPI.login(credentials);
      console.log('📡 Login API response:', response);
      
      if (response.success) {
        // Handle both 'token' and 'accessToken' field names
        const token = response.data.token || response.data.accessToken;
        console.log('✅ Login successful, storing token:', token);
        localStorage.setItem('authToken', token);
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: { 
            user: response.data.user, 
            token: token 
          } 
        });
        return true;
      } else {
        console.log('❌ Login failed:', response);
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' });
        return false;
      }
    } catch (error: any) {
      console.error('💥 Login error:', error);
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message || 'Login failed' });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    authAPI.logout();
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
