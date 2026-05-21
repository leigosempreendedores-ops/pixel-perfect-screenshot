import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  sheetOpen: boolean;
};

type CartAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; slug: string }
  | { type: "UPDATE_QTY"; slug: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "SHEET"; open: boolean };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find((i) => i.product.slug === action.product.slug);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.slug === action.product.slug
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: 1 }] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.product.slug !== action.slug) };
    case "UPDATE_QTY": {
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.product.slug !== action.slug) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.slug === action.slug ? { ...i, quantity: action.quantity } : i,
        ),
      };
    }
    case "CLEAR":
      return { ...state, items: [] };
    case "SHEET":
      return { ...state, sheetOpen: action.open };
  }
}

type CartContextType = {
  items: CartItem[];
  sheetOpen: boolean;
  openCartSheet: () => void;
  closeCartSheet: () => void;
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], sheetOpen: false });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        sheetOpen: state.sheetOpen,
        openCartSheet: () => dispatch({ type: "SHEET", open: true }),
        closeCartSheet: () => dispatch({ type: "SHEET", open: false }),
        addItem: (product) => dispatch({ type: "ADD", product }),
        removeItem: (slug) => dispatch({ type: "REMOVE", slug }),
        updateQuantity: (slug, quantity) => dispatch({ type: "UPDATE_QTY", slug, quantity }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
