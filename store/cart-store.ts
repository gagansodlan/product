import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Product, ProductVariant } from '@/types';
import { getProductById } from '@/mocks/products';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variantId?: string, attributes?: {[key: string]: string}) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1, variantId, attributes) => {
        const { items } = get();
        
        // Determine which price to use (variant or product)
        let price = product.price;
        let variantName = '';
        
        if (variantId) {
          const variant = product.variants?.find(v => v.id === variantId);
          if (variant) {
            price = variant.price;
            variantName = variant.name;
          }
        }
        
        // Check if item already exists in cart
        const existingItemIndex = items.findIndex(
          item => item.productId === product.id && 
                 item.variantId === variantId &&
                 JSON.stringify(item.attributes) === JSON.stringify(attributes)
        );
        
        if (existingItemIndex >= 0) {
          // Update quantity if item exists
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${variantId || 'default'}-${Date.now()}`,
            productId: product.id,
            variantId,
            name: product.name + (variantName ? ` - ${variantName}` : ''),
            price,
            image: product.images[0].url,
            quantity,
            attributes
          };
          
          set({ items: [...items, newItem] });
        }
      },
      
      removeItem: (itemId) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== itemId) });
      },
      
      updateQuantity: (itemId, quantity) => {
        const { items } = get();
        
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          set({ items: items.filter(item => item.id !== itemId) });
        } else {
          // Update quantity
          const updatedItems = items.map(item => 
            item.id === itemId ? { ...item, quantity } : item
          );
          set({ items: updatedItems });
        }
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getCartCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);