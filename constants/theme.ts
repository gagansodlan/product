// Dynamic theme configuration
export const lightTheme = {
    primary: '#4A6FFF',
    secondary: '#FF6B6B',
    background: '#FFFFFF',
    card: '#F8F9FA',
    text: '#1A1A1A',
    secondaryText: '#717171',
    border: '#E1E1E1',
    notification: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    shadow: 'rgba(0, 0, 0, 0.05)',
  };
  
  export const darkTheme = {
    primary: '#5B7FFF',
    secondary: '#FF7B7B',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    secondaryText: '#ABABAB',
    border: '#2C2C2C',
    notification: '#FF453A',
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
    shadow: 'rgba(0, 0, 0, 0.2)',
  };
  
  export type ThemeType = typeof lightTheme;