const API_URL = import.meta.env.VITE_API_URL || 'https://react-fast-pizza-api.jonas.io/api';

// Type definitions
export interface MenuItem {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}

export interface CartItem {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderItem {
  quantity: number;
  name: string;
  totalPrice: number;
}

export interface Order {
  id: string;
  status: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: OrderItem[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
}

export interface NewOrder {
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: CartItem[];
  position?: string;
}

export interface UpdateOrder {
  priority?: boolean;
}

// API Response types
interface ApiResponse<T> {
  status: string;
  data: T;
}

// API Functions
export async function getMenu(): Promise<MenuItem[]> {
  const res = await fetch(`${API_URL}/menu`);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong),
  if (!res.ok) throw Error("Failed getting menu");
  const { data }: ApiResponse<MenuItem[]> = await res.json();
  return data;
}

export async function getOrder(id: string): Promise<Order> {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);
  const { data }: ApiResponse<Order> = await res.json();
  return data;
}

export async function createOrder(newOrder: NewOrder): Promise<Order> {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error();
    const { data }: ApiResponse<Order> = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id: string, updateObj: UpdateOrder): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch {
    throw Error("Failed updating your order");
  }
}