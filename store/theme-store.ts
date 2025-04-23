import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, ThemeType } from '@/constants/theme';
import { Platform } from 'react-native';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  colors: ThemeType;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  getColors: () => ThemeType;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      colors: lightTheme,
      setTheme: (theme) => {
        set({ theme });
        
        // Update colors based on theme
        if (theme === 'light') {
          set({ colors: lightTheme });
        } else if (theme === 'dark') {
          set({ colors: darkTheme });
        } else {
          // For 'system', we would ideally check the system theme
          // This is a simplified version
          const systemTheme = Platform.OS === 'web' 
            ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            : 'light'; // Default to light on native if we can't detect
            
          set({ colors: systemTheme === 'dark' ? darkTheme : lightTheme });
        }
      },
      getColors: () => get().colors,
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);