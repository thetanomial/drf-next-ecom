import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  loading: true, // <--- NEW

  login: (accessToken, refreshToken) => {
    set({
      isAuthenticated: true,
      accessToken,
      refreshToken,
      loading: false,
    });
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  logout: () => {
    set({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      user: null,
      loading: false,
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  initializeAuthState: async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      return set({ isAuthenticated: false, user: null, loading: false });
    }

    try {
      const res = await axios.get('http://localhost:8000/api/auth/user/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      set({
        isAuthenticated: true,
        accessToken,
        refreshToken,
        user: res.data,
        loading: false,
      });
    } catch (error) {
      console.error('Token invalid or expired:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        user: null,
        loading: false,
      });
    }
  },
}));

export default useAuthStore;
