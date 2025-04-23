import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/store/theme-store';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  size?: 'small' | 'medium' | 'large';
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  size = 'medium' 
}) => {
  const router = useRouter();
  const colors = useThemeStore(state => state.colors);
  
  const handlePress = () => {
    router.push(`/category/${category.id}`);
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        styles[size],
        { borderColor: colors.border }
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <ImageBackground
        source={{ uri: category.image }}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
          <Text style={styles.name}>{category.name}</Text>
          {size !== 'small' && category.description && (
            <Text style={styles.description} numberOfLines={2}>
              {category.description}
            </Text>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 16,
  },
  small: {
    height: 100,
    width: '48%',
  },
  medium: {
    height: 140,
    width: '48%',
  },
  large: {
    height: 180,
    width: '100%',
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    borderRadius: 12,
  },
  overlay: {
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});