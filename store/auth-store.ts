import { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';
import { setAuthToken } from '@/api/config';
import { Client } from '@/api/client'; 

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AxiosResponse<any>>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
     
        try {
          const res = await Client.login({ username: email, password }); 
          console.log("res",res.data.data)
          const { token, user_id } = res.data.data; 
      
          const user: User = {
            id: String(user_id),
            name: email,   
            email,
          };
      
          setAuthToken(token);
          set({ user, isAuthenticated: true, isLoading: false });
          return res; // ✅ return response
        } catch (error: any) {
          const message = error?.response?.data?.message || 'Login failed';
          set({ error: message, isLoading: false });
          throw error; // so the UI knows it failed
        }
      },
      

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
      
        try {
          const res = await Client.register({ name, email, password });
          console.log("✅ Registration Success:", res.data);
      
          await useAuthStore.getState().login(email, password);
        } catch (error: any) {
          console.log("❌ Registration Failed:", error?.response?.data || error.message);
          const message = error?.response?.data?.message || 'Registration failed';
          set({ error: message, isLoading: false });
        }
      }
,      

      logout: () => {
        setAuthToken(null);
        set({ user: null, isAuthenticated: false });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
