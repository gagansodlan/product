import React from 'react';
import { Stack } from 'expo-router';
import { useThemeStore } from '@/store/theme-store';

export default function AuthLayout() {
  const colors = useThemeStore(state => state.colors);
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{ 
          title: "Sign In",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: "Create Account",
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="forgot-password" 
        options={{ 
          title: "Forgot Password",
          presentation: "card",
        }} 
      />
    </Stack>
  );
}