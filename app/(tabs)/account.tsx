import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  Switch
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Package, 
  CreditCard, 
  MapPin, 
  Heart, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/Button';

export default function AccountScreen() {
  const router = useRouter();
  const colors = useThemeStore(state => state.colors);
  const { theme, setTheme } = useThemeStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  
  const handleLogin = () => {
    router.push('/(auth)/login');
  };
  
  const handleRegister = () => {
    router.push('/(auth)/register');
  };
  
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => logout()
        }
      ]
    );
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const renderMenuItem = (icon, title, onPress) => (
    <TouchableOpacity 
      style={[styles.menuItem, { borderColor: colors.border }]}
      onPress={onPress}
    >
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={[styles.menuItemText, { color: colors.text }]}>
          {title}
        </Text>
      </View>
      <ChevronRight size={20} color={colors.secondaryText} />
    </TouchableOpacity>
  );
  
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.guestContainer}>
          <User size={64} color={colors.secondaryText} />
          <Text style={[styles.guestTitle, { color: colors.text }]}>
            Welcome to ShopHub
          </Text>
          <Text style={[styles.guestSubtitle, { color: colors.secondaryText }]}>
            Sign in to view your profile, orders, and more.
          </Text>
          <View style={styles.authButtons}>
            <Button
              title="Sign In"
              onPress={handleLogin}
              style={styles.signInButton}
            />
            <Button
              title="Register"
              variant="outline"
              onPress={handleRegister}
              style={styles.registerButton}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>
              {user?.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={[styles.userName, { color: colors.text }]}>
              {user?.name}
            </Text>
            <Text style={[styles.userEmail, { color: colors.secondaryText }]}>
              {user?.email}
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            My Account
          </Text>
          
          {renderMenuItem(
            <Package size={20} color={colors.primary} style={styles.menuItemIcon} />,
            "My Orders",
            () => router.push('/account/orders')
          )}
          
          {renderMenuItem(
            <CreditCard size={20} color={colors.primary} style={styles.menuItemIcon} />,
            "Payment Methods",
            () => router.push('/account/payment-methods')
          )}
          
          {renderMenuItem(
            <MapPin size={20} color={colors.primary} style={styles.menuItemIcon} />,
            "Addresses",
            () => router.push('/account/addresses')
          )}
          
          {renderMenuItem(
            <Heart size={20} color={colors.primary} style={styles.menuItemIcon} />,
            "Wishlist",
            () => router.push('/wishlist')
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Preferences
          </Text>
          
          <View 
            style={[styles.menuItem, { borderColor: colors.border }]}
          >
            <View style={styles.menuItemLeft}>
              {theme === 'dark' ? (
                <Moon size={20} color={colors.primary} style={styles.menuItemIcon} />
              ) : (
                <Sun size={20} color={colors.primary} style={styles.menuItemIcon} />
              )}
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={theme === 'dark' ? colors.primary : '#f4f3f4'}
            />
          </View>
          
          {renderMenuItem(
            <Settings size={20} color={colors.primary} style={styles.menuItemIcon} />,
            "Settings",
            () => router.push('/account/settings')
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Support
          </Text>
          
          {renderMenuItem(
            <HelpCircle size={20} color={colors.primary} style={styles.menuItemIcon} />,
            "Help Center",
            () => router.push('/account/help')
          )}
        </View>
        
        <TouchableOpacity 
          style={[styles.logoutButton, { borderColor: colors.border }]}
          onPress={handleLogout}
        >
          <LogOut size={20} color={colors.error} style={styles.menuItemIcon} />
          <Text style={[styles.logoutText, { color: colors.error }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
  },
  guestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  guestTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  guestSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  authButtons: {
    width: '100%',
  },
  signInButton: {
    marginBottom: 12,
  },
  registerButton: {
  },
});