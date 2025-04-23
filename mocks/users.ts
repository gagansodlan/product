import { User, Address, PaymentMethod, Order } from '@/types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

export const addresses: Address[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    company: 'Acme Inc',
    address1: '123 Main St',
    address2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States',
    phone: '555-123-4567',
    email: 'john.doe@example.com',
    isDefault: true
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    address1: '456 Park Ave',
    city: 'Boston',
    state: 'MA',
    postalCode: '02108',
    country: 'United States',
    phone: '555-987-6543',
    email: 'john.doe@example.com',
    isDefault: false
  }
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'pm-1',
    type: 'card',
    details: {
      brand: 'Visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2025
    },
    isDefault: true
  },
  {
    id: 'pm-2',
    type: 'paypal',
    details: {
      email: 'john.doe@example.com'
    },
    isDefault: false
  }
];

export const orders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-1',
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        name: 'Premium Wireless Headphones',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        quantity: 1,
        subtotal: 249.99
      },
      {
        id: 'item-2',
        productId: 'prod-3',
        name: 'Wireless Earbuds',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        quantity: 1,
        subtotal: 129.99
      }
    ],
    subtotal: 379.98,
    tax: 30.40,
    shipping: 0,
    discount: 0,
    total: 410.38,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      company: 'Acme Inc',
      address1: '123 Main St',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
      phone: '555-123-4567',
      email: 'john.doe@example.com'
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      company: 'Acme Inc',
      address1: '123 Main St',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
      phone: '555-123-4567',
      email: 'john.doe@example.com'
    },
    paymentMethod: 'pm-1',
    status: 'delivered',
    trackingNumber: 'TRK123456789',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-18T14:20:00Z'
  },
  {
    id: 'order-2',
    userId: 'user-1',
    items: [
      {
        id: 'item-3',
        productId: 'prod-5',
        name: 'Smart Home Speaker',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        quantity: 1,
        subtotal: 99.99
      }
    ],
    subtotal: 99.99,
    tax: 8.00,
    shipping: 5.99,
    discount: 0,
    total: 113.98,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '456 Park Ave',
      city: 'Boston',
      state: 'MA',
      postalCode: '02108',
      country: 'United States',
      phone: '555-987-6543',
      email: 'john.doe@example.com'
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '456 Park Ave',
      city: 'Boston',
      state: 'MA',
      postalCode: '02108',
      country: 'United States',
      phone: '555-987-6543',
      email: 'john.doe@example.com'
    },
    paymentMethod: 'pm-2',
    status: 'shipped',
    trackingNumber: 'TRK987654321',
    createdAt: '2023-07-10T15:45:00Z',
    updatedAt: '2023-07-11T09:30:00Z'
  }
];

export const getUserOrders = (userId: string) => {
  return orders.filter(order => order.userId === userId);
};

export const getOrderById = (orderId: string) => {
  return orders.find(order => order.id === orderId);
};