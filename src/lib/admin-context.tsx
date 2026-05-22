import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { products as staticProducts } from "@/data/products";

export type AdminProduct = {
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  badges: string[];
};

export type Order = {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  customer: string;
  phone: string;
};

const LS_AUTH = "al_bio_admin";
const LS_PRODS = "al_bio_products";
const LS_ORDERS = "al_bio_orders";
const LS_PASS = "al_bio_admin_pass";

const DEFAULT_PASSWORD = "admin123";

type AdminContextType = {
  authed: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
  changePassword: (old: string, newp: string) => boolean;
  products: AdminProduct[];
  addProduct: (p: AdminProduct) => void;
  updateProduct: (slug: string, p: AdminProduct) => void;
  deleteProduct: (slug: string) => void;
  orders: Order[];
  addOrder: (o: Order) => void;
  deleteOrder: (id: string) => void;
};

const AdminContext = createContext<AdminContextType | null>(null);

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(LS_AUTH) === "1");
  const [products, setProducts] = useState<AdminProduct[]>(() => loadJSON(LS_PRODS, staticProducts));
  const [orders, setOrders] = useState<Order[]>(() => loadJSON(LS_ORDERS, []));

  useEffect(() => { localStorage.setItem(LS_PRODS, JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem(LS_ORDERS, JSON.stringify(orders)); }, [orders]);

  const login = useCallback((pass: string) => {
    const stored = localStorage.getItem(LS_PASS) || DEFAULT_PASSWORD;
    if (pass !== stored) return false;
    setAuthed(true);
    sessionStorage.setItem(LS_AUTH, "1");
    return true;
  }, []);

  const logout = useCallback(() => {
    setAuthed(false);
    sessionStorage.removeItem(LS_AUTH);
  }, []);

  const changePassword = useCallback((old: string, newp: string) => {
    const stored = localStorage.getItem(LS_PASS) || DEFAULT_PASSWORD;
    if (old !== stored) return false;
    localStorage.setItem(LS_PASS, newp);
    return true;
  }, []);

  const addProduct = useCallback((p: AdminProduct) => {
    setProducts((prev) => [...prev, p]);
  }, []);

  const updateProduct = useCallback((slug: string, p: AdminProduct) => {
    setProducts((prev) => prev.map((x) => (x.slug === slug ? p : x)));
  }, []);

  const deleteProduct = useCallback((slug: string) => {
    setProducts((prev) => prev.filter((x) => x.slug !== slug));
  }, []);

  const addOrder = useCallback((o: Order) => {
    setOrders((prev) => [o, ...prev]);
  }, []);

  const deleteOrder = useCallback((id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }, []);

  return (
    <AdminContext.Provider
      value={{ authed, login, logout, changePassword, products, addProduct, updateProduct, deleteProduct, orders, addOrder, deleteOrder }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
