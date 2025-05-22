import { api } from "./config";

export const Client = {
  // ✅ AUTH
  register: (params: { name: string; email: string; password: string }) =>
    api.post("auth/signup", {
      username: params.name,
      email: params.email,
      password: params.password,
    }),

  login: (params: { username: string; password: string }) =>
    api.post("auth/signin", params),

  getProfile: () => api.get("/wp-json/wp/v2/users/me"),

  // ✅ PRODUCTS
  getAllProducts: () => api.get("/wp-json/wc/v3/products"),

  getProductDetail: (id: number) =>
    api.get(`/wp-json/wc/v3/products/${id}`),

  getProductsByCategory: (id: number) =>
    api.get(`/wp-json/wc/v3/products?category=${id}`),

  getFeaturedProducts: () =>
    api.get("/wp-json/wc/v3/products?featured=true"),

  getSaleProducts: () =>
    api.get("/wp-json/wc/v3/products?on_sale=true"),

  searchProducts: (query: string) =>
    api.get(`/wp-json/wc/v3/products?search=${query}`),

  // ✅ CATEGORIES
  getCategories: () => api.get("/wp-json/wc/v3/products/categories"),

  // ✅ ORDERS
  createOrder: (orderData: any) =>
    api.post("/wp-json/wc/v3/orders", orderData),

  getMyOrders: (userId: number) =>
    api.get(`/wp-json/wc/v3/orders?customer=${userId}`),

  getOrderDetail: (id: number) =>
    api.get(`/wp-json/wc/v3/orders/${id}`),

  // ✅ REVIEWS
  getProductReviews: (productId: number) =>
    api.get(`/wp-json/wc/v3/products/reviews?product=${productId}`),

  // ✅ PROFILE
  updateProfile: (profileData: any) =>
    api.post("/wp-json/wp/v2/users/me", profileData),
};