import { create } from 'zustand';
import { CartStore } from '../utils/type';
const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],

  addToCart: (product) => set((state) => {
    const existingItem = state.cartItems.find(item => item._id === product._id);

    if (existingItem) {

      return {
        cartItems: state.cartItems.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    } else {

      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }
  }),

  clearCart: () => set({ cartItems: [] }),

  removeItem: (id) => set((state) => ({
    cartItems: state.cartItems.filter(item => item._id !== id),
  })),

  updateQty: (id, newQty) => {
    if (newQty <= 0) {
      get().removeItem(id)
    } else {
      set((state) => {
        return {
          cartItems: state.cartItems.map((item) =>
            item._id === id ? { ...item, quantity: Math.max(0, newQty) } : item
          ),
        };
      })
    }
  },

}));

export default useCartStore;
