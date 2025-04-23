import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProductById } from '@/mocks/products';
import { Product } from '@/types';

interface WishlistState {
  productIds: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistProducts: () => Product[];
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      
      addToWishlist: (productId) => {
        const { productIds } = get();
        if (!productIds.includes(productId)) {
          set({ productIds: [...productIds, productId] });
        }
      },
      
      removeFromWishlist: (productId) => {
        const { productIds } = get();
        set({ productIds: productIds.filter(id => id !== productId) });
      },
      
      isInWishlist: (productId) => {
        const { productIds } = get();
        return productIds.includes(productId);
      },
      
      getWishlistProducts: () => {
        const { productIds } = get();
        return productIds
          .map(id => getProductById(id))
          .filter((product): product is Product => product !== undefined);
      },
      
      clearWishlist: () => {
        set({ productIds: [] });
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);